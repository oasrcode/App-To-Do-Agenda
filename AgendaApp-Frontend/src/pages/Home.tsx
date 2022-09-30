import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage,IonRefresher,IonRefresherContent,IonRow, IonSplitPane, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter} from "@ionic/react";
import {  useState } from "react";
import { getAllToDo } from "../Service/getAllToDo";
import { add, chevronDownCircleOutline,} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"






export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);

 
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    
    console.log('Begin async operation');
    
    getAllToDo().then(response=>response.json()).then((result)=>{setToDos(result)});
  
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 1000);
  }

  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
          <IonTitle text-center >ToDoApp</IonTitle>
          </IonToolbar>       
        </IonHeader>
        <IonContent fullscreen={true} color="light">

        
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent className={style.RefresherContent} pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."></IonRefresherContent>
        </IonRefresher>
          
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton routerLink="/addToDo" routerDirection="forward" color="tertiary">
                    <IonIcon icon={add} />
                  </IonFabButton>
          </IonFab>
            <IonGrid className={style.Main}>
                <IonRow text-center>
                  <IonCol  text-center size="auto">
                  {
                    toDos.map
                    ((e:ToDo,key:any)=>
                      {
                       return <ToDoCard ion-align-self-center  key={key} element={e} />
                      }
                    )
                  }
                </IonCol> 
              </IonRow>
            </IonGrid>
          
          
              
        </IonContent>
        
       
    </IonPage>

  )
}
