import {  IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton,  IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonToolbar, useIonAlert, useIonViewWillEnter } from "@ionic/react";
import { aperture, folder, send } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";
import { postPhoto } from "../Service/photos/postPhoto";

import { Storage } from "@ionic/storage"

import style from "./css/AddMyImages.module.css"

export function AddMyImages(){

  const [webPath,setWebPath] = useState<any>();
  const [presentAlert] = useIonAlert();
  const [token,setToken] = useState("");
  const history = useHistory();
  const titleInput = useRef<HTMLIonInputElement>(null);

  useIonViewWillEnter(()=>{
    setWebPath("https://ionicframework.com/docs/img/demos/thumbnail.svg")
    const initStorage = async ()=>{
      const newStore = new Storage();
      const store = await newStore.create()
      await store.get("user").then(res=>{    
        let user = JSON.parse(res);
        let token = user.access_token
        setToken(token)
      });
      }
      initStorage();
  })

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

async function onSubmit(event:any){  
    event.preventDefault();

    let title  = titleInput.current?.value as string;
    if(title===""){
      Alert("el título")
    }else if(webPath==null){
      Alert("la imagen")
    }else{
      let blob = null;
    const response = await fetch(webPath);
    blob = await response.blob();
    var bodyFormData = new FormData();
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('file', blob); 
      

    postPhoto(bodyFormData,token).catch(err=>{
      console.log(err)
    });
    AlertDone();
    
    
    }
 }


    return( 
        <IonPage>
          <IonHeader>
          <IonToolbar  color="tertiary">
              <IonButtons slot="start" color="tertiary">
                  <IonBackButton text="volver"  defaultHref="/" />
              </IonButtons>
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
              <IonImg className={style.image} src={webPath }></IonImg>      
              <IonItem className={style.titleContainer}>
              <IonLabel>Titulo</IonLabel>
              <IonInput type="text" ref={titleInput} value="" ></IonInput>
              </IonItem>
              <IonButton className={style.btnSummit} color={"tertiary"} shape="round" type="submit"><IonIcon icon={send}/></IonButton>
            </div>
          </form>      
        </IonContent>
        </IonPage>
    
    )
}