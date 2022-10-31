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



export function EditMyImages(){
 
  let {id}:{id:string} = useParams();
  const history = useHistory();
  const [image,setImage] = useState<MyImages>();
  const [webPath,setWebPath] = useState<any>();
  const [presentAlert] = useIonAlert();
  
  const titleInput = useRef<HTMLIonInputElement>(null);


    useEffect(()=>{

      getPhotoByID(id)
      .then(response =>{
        setImage(response.data);
      
      })
      .catch(err=>{
        console.log(err)
      })

      

      
    },[])

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
        header: 'Añadido a la galería personal',
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
      putPhoto(bodyFormData);
      AlertDone()


    }else{
    
    
    let blob=null;
    const response = await fetch(webPath);
    blob = await response.blob();

  

    bodyFormData.append('id',id);
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('updateImage','true')
    bodyFormData.append('file', blob); 
    putPhoto(bodyFormData);
    AlertDone()
    }
    
   }
  
      return( 
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" title="volver"><IonBackButton>volver</IonBackButton></IonButtons>
            </IonToolbar>
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