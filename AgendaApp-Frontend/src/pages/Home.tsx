import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage,IonRefresher,IonRefresherContent,IonRow, IonSplitPane, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter} from "@ionic/react";
import {  useState } from "react";
import { getAllToDo } from "../Service/getAllToDo";
import { add} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"






export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);

 

  
  useIonViewWillEnter(()=>{
    getAllToDo().then(response=>response.json()).then((result)=>{setToDos(result)});
  })

  

 
  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
          <IonTitle text-center >ToDoApp</IonTitle>
          </IonToolbar>       
        </IonHeader>
        <IonContent fullscreen={true} color="light">


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
                       return <ToDoCard ion-align-self-center  key={key} element={e}  />
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
