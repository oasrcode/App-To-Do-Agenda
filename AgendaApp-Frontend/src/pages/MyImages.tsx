import {  IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { useState } from "react";
import { MyImagesGrid } from "../components/MyImagesGrid";
import { AddPhotoModal } from "../components/AddPhotoModal";

import { PhotoModalProp } from "../data/PhotoModalContext";


export function MyImages(){

    const [modalState, setModalState] = useState(false);


    let propModalState:PhotoModalProp={
    modalState:modalState,
    setModalState:setModalState};

  
    return(
    <IonPage>
        <IonHeader>
          <IonToolbar color={"tertiary"}>
            <IonButtons slot="start" color="tertiary">
              <IonBackButton text="volver"  defaultHref="/home" />
            </IonButtons>
            <IonButton fill="outline"  color={"light"} slot="end" onClick={()=>setModalState(true)}><IonIcon icon={cameraOutline}></IonIcon></IonButton>  
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen> 
          
        <MyImagesGrid/> 
        <AddPhotoModal prop={propModalState} />
        </IonContent>
      </IonPage>);
}