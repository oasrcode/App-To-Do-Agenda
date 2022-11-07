import {  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from "@ionic/react";
import { cameraOutline, home } from "ionicons/icons";

import { MyImagesGrid } from "../components/MyImagesGrid";



export function MyImages(){

    return(
    <IonPage >
        <IonHeader>
          <IonToolbar color={"tertiary"}>
            <IonButtons slot="start" color="tertiary">
              <IonButton  fill="clear"  routerLink="/home" routerDirection="back"><IonIcon icon={home}></IonIcon></IonButton>
              </IonButtons>
            <IonButton fill="outline"  color={"light"} slot="end" routerLink="/addimage"><IonIcon icon={cameraOutline}></IonIcon></IonButton>  
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen > 
        <MyImagesGrid/> 
        </IonContent>
      </IonPage>);
}