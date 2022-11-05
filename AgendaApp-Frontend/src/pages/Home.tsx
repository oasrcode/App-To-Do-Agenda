import { IonAlert, IonButton, IonContent, IonFab, IonFabButton,  IonHeader, IonIcon,IonPage, IonTitle, IonToolbar} from "@ionic/react";
import { add, image, logOutOutline} from 'ionicons/icons';
import { Storage } from "@ionic/storage"
import { useHistory } from "react-router";

import { useState } from "react";
import { ToDoGrid } from "../components/ToDoGrid";

export  function Home() {


  const history = useHistory();
  const newStore = new Storage();
  const [showAlert, setShowAlert] = useState(false);
  
  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButton slot="start" fill="solid" color={"light"} onClick={()=>setShowAlert(true)}><IonIcon icon={logOutOutline}/></IonButton>
          <IonTitle text-center >ToDoApp</IonTitle>
          <IonButton slot="end" fill="outline" color={"light"} routerLink="/myimages" routerDirection="forward"><IonIcon icon={image}></IonIcon></IonButton>
          </IonToolbar>       
        </IonHeader>
        <IonContent fullscreen={true} color="light">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton routerLink="/add" routerDirection="forward" color="tertiary">
                    <IonIcon icon={add} />
                  </IonFabButton>
          </IonFab>
            <ToDoGrid/>

            <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="¿Desea cerrar la sesión?"
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setShowAlert(false);
            },
          },
          {
            text: 'Si',
            role: 'confirm',
            handler: async () => {
              const store = await newStore.create()
              store.clear()
              history.push("login")
            },
          },
        ]}
        />
        </IonContent>
    </IonPage>

  )
}
