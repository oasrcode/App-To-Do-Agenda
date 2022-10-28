import { IonButton, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { PhotoModalProp } from "../data/PhotoModalContext";

import { AddPhotoForm} from "./AddPhotoForm";

export function AddPhotoModal({prop}:{prop:PhotoModalProp}){
    

    return(
    <IonModal isOpen={prop.modalState.valueOf()}>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Añadir</IonTitle>
            <IonButton slot="end" onClick={()=>prop.setModalState(false)}>cerrar</IonButton>
            </IonToolbar>   
        </IonHeader>
        <AddPhotoForm/>
    </IonModal>)
}