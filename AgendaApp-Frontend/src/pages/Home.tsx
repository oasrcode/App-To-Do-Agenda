import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon,IonPage,IonRow, IonTitle, IonToolbar, useIonViewWillEnter} from "@ionic/react";
import {  useEffect, useState } from "react";

import { add, image} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"

import { getAllToDo } from "../Service/toDos/getAllToDo";
import { ToDoProps } from "../data/PropsContext";



export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);
  
  const [change,setChange] = useState<string>("");

 
    useIonViewWillEnter(()=>{ 
        getAllToDo().then(response => {
          setToDos(response.data)
        }).catch(e => {
          console.log(e)
        })
     
     })


    useEffect(()=>{
      getAllToDo().then(response => {
        setToDos(response.data)
      }).catch(e => {
        console.log(e)
      })
    },[change])
    


 
  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
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
            <IonGrid className={style.Main}>
                <IonRow text-center>
                  <IonCol  text-center size="auto">
                  {
                    toDos.map
                    ((e:ToDo,key:any)=>
                      {
                      let element = e;
                      const prop :ToDoProps={element,setChange};
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
