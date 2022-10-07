import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage,IonRefresher,IonRefresherContent,IonRow, IonSplitPane, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter} from "@ionic/react";
import {  useEffect, useReducer, useState } from "react";
import { getAllToDo } from "../Service/getAllToDo";
import { add, today} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"
import { Props } from "../data/PropsContext";



export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);
  
  const [change,setChange] = useState<string>("");

 
    useIonViewWillEnter(()=>{   
    getAllToDo().then(response=>response.json()).then((result)=>{setToDos(result)});
    
    })


    useEffect(()=>{
      getAllToDo().then(response=>response.json()).then((result)=>{setToDos(result)});
     
    },[change])
    


 
  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
          <IonTitle text-center >ToDoApp</IonTitle>
          </IonToolbar>       
        </IonHeader>
        <IonContent fullscreen={true} color="light">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton routerLink="/add" routerDirection="forward" color="tertiary">
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
                      let element = e;
                      const prop :Props={element,setChange};
                      return <ToDoCard ion-align-self-center  key={key} props={prop} />
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
