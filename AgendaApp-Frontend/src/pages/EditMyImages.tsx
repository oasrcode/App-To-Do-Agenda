import {  IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { aperture, folder, send } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";

import style from "./css/EditMyImages.module.css"
import { getPhotoByID } from "../Service/photos/getPhotoByID";
import { MyImages } from "../data/ImageContext";
import { putPhoto } from "../Service/photos/putPhoto";
import { Storage } from "@ionic/storage"


export function EditMyImages(){
 
  let {id}:{id:string} = useParams();
  const history = useHistory();
  const [image,setImage] = useState<MyImages>();
  const [webPath,setWebPath] = useState<any>();
  const [presentAlert] = useIonAlert();
  const [token,setToken] = useState("");
  
  const titleInput = useRef<HTMLIonInputElement>(null);


    // useEffect(()=>{

    //   getPhotoByID(id)
    //   .then(response =>{
    //     setImage(response.data);
      
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })

      

      
    // },[])

    // useIonViewWillEnter(()=>{
    //   const initStorage = async ()=>{
    //     const newStore = new Storage();
    //     const store = await newStore.create()
    //     await store.get("user").then(res=>{
          
    //       let user = JSON.parse(res);
    //       let token = user.access_token

    //       getPhotoByID(id,token)
    //       .then(response =>{
    //         setImage(response.data);
          
    //       })
    //       .catch(err=>{
    //         console.log(err)
    //       })
     

         
    //     }).catch(err=>{
    //         console.log(err)
    //         history.push("/login")
    //     })
    //     }
    //     initStorage();
    // })

    useIonViewWillEnter(()=>{
      const initStorage = async ()=>{
        const newStore = new Storage();
        const store = await newStore.create()
        await store.get("user").then(res=>{
          
          let user = JSON.parse(res);
          let token = user.access_token

          setToken(token);

         getPhotoByID(id,token).then(res=>{
            setImage(res.data)
         }).catch(err=>{
            console.log(err)
         })

         
        }).catch(err=>{
            console.log(err)
            history.push("/login")
        })
        }
        initStorage();
    })

    function getPhoto(){
      let response = takeImage();
      response.then((photo)=>{
        setWebPath(photo.webPath)
      })
    }
     
    function getPicked(){
      let response = pickImage();
      response.then((photo)=>{
        setWebPath(photo.photos[0].webPath)
      })
    }

    function Alert(componente:string){
      return(presentAlert({
          header: 'Rellena '+ componente,
          buttons: ['OK'],
        }))
  }
  
  function AlertDone(){
    return(presentAlert({
        header: 'Contenido editado',
        buttons:  [{
          text: 'volver',
          handler: () => {
            history.push("/myimages");
          },
        }],
      }))
    }
    
  
  async function onSubmit(event:any){ 

    event.preventDefault();
    let title  = titleInput.current?.value as string;
    if(title===""){
      Alert("el título")
    }

    var bodyFormData = new FormData();

    if(webPath==null){
 
      bodyFormData.append('id',id);
      bodyFormData.append('title', titleInput.current?.value as string);
      bodyFormData.append('updateImage','false') 
      putPhoto(bodyFormData,token).then(res=>{
          
      }).catch(err=>{
        console.log(err)
      })
      AlertDone()


    }else{
    
    let blob=null;
    const response = await fetch(webPath);
    blob = await response.blob();
    bodyFormData.append('id',id);
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('updateImage','true')
    bodyFormData.append('file', blob); 
    putPhoto(bodyFormData,token).then(res=>{
 
  }).catch(err=>{
    console.log(err)
  })
  AlertDone()
  
    }
    
   }
  
      return( 
        <IonPage>
          <IonHeader>
          <IonHeader>
          <IonToolbar  color="tertiary">
              <IonButtons slot="start" color="tertiary">
                  <IonBackButton text="volver"  defaultHref="/myimages" />
              </IonButtons>
          </IonToolbar>
        </IonHeader>
          </IonHeader>
            <IonContent>
         
          <IonFab vertical="bottom" horizontal="end">
            <IonFabButton color={"tertiary"} onClick={getPhoto}><IonIcon icon={aperture} /></IonFabButton>
          </IonFab>
          <IonFab vertical="bottom" horizontal="start">
            <IonFabButton color={"tertiary"} onClick={getPicked}><IonIcon icon={folder} /></IonFabButton>
          </IonFab>
            <form onSubmit={onSubmit}>
              <div className={style.form}>
                <IonItem>
                <IonImg className={style.image}  src={webPath ? webPath : "http://localhost:8080/images/"+image?.filename}></IonImg>
                </IonItem>
                <IonItem>
                <IonLabel>Titulo</IonLabel>
                <IonInput type="text" ref={titleInput} defaultValue="" value={image?.title}/>
                </IonItem>
                <IonButton className={style.btnSummit} color={"tertiary"} shape="round" type="submit"><IonIcon icon={send}/></IonButton>
              </div>
            </form>      
          </IonContent>
        </IonPage>
        
          
      
      )
}