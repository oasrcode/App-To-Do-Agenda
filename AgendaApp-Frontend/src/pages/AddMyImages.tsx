import {  IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonToolbar, useIonAlert } from "@ionic/react";
import { aperture, ellipsisVerticalOutline, folder, send } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";
import { postPhoto } from "../Service/photos/postPhoto";

import style from "./css/AddMyImages.module.css"
export function AddMyImages(){

  const [webPath,setWebPath] = useState<any>(null);
 
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const titleInput = useRef<HTMLIonInputElement>(null);

  function Alert(componente:string){
    return(presentAlert({
        header: 'Rellena '+ componente,
        buttons: ['OK'],
      }))
}

function AlertDone(){
  return(presentAlert({
      header: 'Añadido a la galería personal',
      buttons:  ["Ok"],
        
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

async function onSubmit(){  
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
  
    postPhoto(bodyFormData);
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
         
        <IonFab vertical="top" horizontal="start" slot="fixed" >
          <IonFabButton color={"tertiary"}>
            <IonIcon icon={ellipsisVerticalOutline} />
          </IonFabButton>
          <IonFabList side="end" className={style.FabList}>
            <IonFabButton onClick={getPhoto}><IonIcon icon={aperture} /></IonFabButton>
            <IonFabButton onClick={getPicked}><IonIcon icon={folder} /></IonFabButton>
            <IonFabButton onClick={onSubmit}><IonIcon icon={send} /></IonFabButton>
          </IonFabList>            
        </IonFab>
          <form onSubmit={onSubmit}>
            <div className={style.form}>          
              <IonImg className={style.image} src={webPath ? webPath : "https://ionicframework.com/docs/img/demos/thumbnail.svg"}></IonImg>      
              <IonItem className={style.titleContainer}>
              <IonLabel>Titulo</IonLabel>
              <IonInput type="text" ref={titleInput}></IonInput>
              </IonItem>
            </div>
          </form>      
        </IonContent>
        </IonPage>
    
    )
}