import {  IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonToolbar, useIonViewWillEnter } from "@ionic/react";
import { aperture, ellipsisVerticalOutline, folder, send } from "ionicons/icons";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";
import { postPhoto } from "../Service/photos/postPhoto";

import style from "../components/css/PhotoForm.module.css"
import { getPhotoByID } from "../Service/photos/getPhotoByID";
import { MyImages } from "../data/ImageContext";
import { putPhoto } from "../Service/photos/putPhoto";

export function EditMyImages(){
  let {id}:{id:string} = useParams();
  const [webPath,setWebPath] = useState<any>();
  const [image,setImage] = useState<MyImages>();

  const titleInput = useRef<HTMLIonInputElement>(null);

    
    useIonViewWillEnter(()=>{
      getPhotoByID(id)
      .then(response =>{
        console.log(response)
        setImage(response.data);
      })
      .catch(err=>{
        console.log(err)
      })
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
  
  async function onSubmit(){  
    let blob = null;
    const response = await fetch(webPath);

    blob = await response.blob();
  

  
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('file', blob); 

    console.log(blob)
  
   

    putPhoto(bodyFormData);
   }
  
  
      return( 
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" title="volver"><IonBackButton>volver</IonBackButton></IonButtons>
            </IonToolbar>
          </IonHeader>
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
                <IonImg className={style.image} src={webPath ? webPath : "http://localhost:8080/images/"+image?.filename}></IonImg>
               
                </IonItem>
                
                <IonItem>
                <IonLabel>Titulo</IonLabel>
                <IonInput type="text" ref={titleInput} value={image?.title}/>
                </IonItem>
              </div>
            </form>      
          </IonContent>
        </IonPage>
        
          
      
      )
}