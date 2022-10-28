import {  IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonImg, IonInput, IonItem, IonLabel } from "@ionic/react";
import { aperture, ellipsisVerticalOutline, folder, send } from "ionicons/icons";
import { useRef, useState } from "react";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";
import { postPhoto } from "../Service/photos/postPhoto";

import style from "./css/PhotoForm.module.css"

export function AddPhotoForm(){
  
    const [webPath,setWebPath] = useState<any>(null);

    const titleInput = useRef<HTMLIonInputElement>(null);
    
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
    let blob = null;
    const response = await fetch(webPath);
    blob = await response.blob();
  
    console.log(blob);
  
    var bodyFormData = new FormData();
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('file', blob); 
  
    postPhoto(bodyFormData);
   }
  
  
      return( 
        
          <IonContent>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton >
              <IonIcon icon={ellipsisVerticalOutline} />
            </IonFabButton>
            <IonFabList side="end" className={style.FabList}>
              <IonFabButton onClick={getPhoto}><IonIcon icon={aperture} /></IonFabButton>
            </IonFabList>
            <IonFabList side="start">
              <IonFabButton onClick={getPicked}><IonIcon icon={folder} /></IonFabButton>
            </IonFabList>
            <IonFabList side="top">
              <IonFabButton onClick={onSubmit}><IonIcon icon={send} /></IonFabButton>
            </IonFabList>
          </IonFab>
            <form onSubmit={onSubmit}>
              <div className={style.form}>
                <IonItem>
                <IonImg className={style.image} src={webPath ? webPath : "https://ionicframework.com/docs/img/demos/thumbnail.svg"}></IonImg>
                </IonItem>
                
                <IonItem>
                <IonLabel>Titulo</IonLabel>
                <IonInput type="text" ref={titleInput}></IonInput>
                </IonItem>
              </div>
             
            </form>      
          </IonContent>
      
      )
  }