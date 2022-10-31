import {  IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonToolbar, useIonAlert, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { aperture, ellipsisVerticalOutline, folder, send } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { pickImage } from "../hooks/pickImage";
import { takeImage } from "../hooks/takeImage";

import style from "./css/EditMyImages.module.css"
import { getPhotoByID } from "../Service/photos/getPhotoByID";
import { MyImages } from "../data/ImageContext";
import { putPhoto } from "../Service/photos/putPhoto";
import { Camera } from "@capacitor/camera";
import axios from "axios";


export function EditMyImages(){
 
  let {id}:{id:string} = useParams();

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
        header: 'Editado!',
        buttons:  ["Ok"],
          
      }))
    
  }
  
  async function onSubmit(){ 

    let title  = titleInput.current?.value as string;
    if(title===""){
      Alert("el título")
    }else if(webPath==null){
      Alert("la imagen")
    }else{
    let blob=null;
    const response = await fetch(webPath);
    blob = await response.blob();

  

  
    axios({
      method: "get",
      withCredentials: false,
      url: "http://localhost:8080/images/"+image?.filename,
      headers: {"Access-Control-Allow-Origin": "*"},
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    

 
    var bodyFormData = new FormData();
    bodyFormData.append('id',id);
    bodyFormData.append('title', titleInput.current?.value as string);
    bodyFormData.append('file', blob); 
   // putPhoto(bodyFormData);
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
                <IonImg className={style.image}  src={webPath ? webPath : "https://ionicframework.com/docs/img/demos/thumbnail.svg"}></IonImg>
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