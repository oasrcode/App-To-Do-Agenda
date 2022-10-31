import {  IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { cameraOutline, home, refresh } from "ionicons/icons";
import { useState } from "react";
import { MyImagesGrid } from "../components/MyImagesGrid";
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
              <IonButton  fill="clear"  routerLink="/" routerDirection="back"><IonIcon icon={home}></IonIcon></IonButton>
              </IonButtons>
            <IonButton fill="outline"  color={"light"} slot="end" routerLink="/myimages/add"><IonIcon icon={cameraOutline}></IonIcon></IonButton>  
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen> 
        <MyImagesGrid/> 
        </IonContent>
      </IonPage>);
}