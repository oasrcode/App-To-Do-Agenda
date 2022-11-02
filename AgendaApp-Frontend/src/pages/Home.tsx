import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon,IonPage,IonRow, IonTitle, IonToolbar, useIonViewWillEnter} from "@ionic/react";
import {  useEffect, useState } from "react";

import { add, image} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"

import { getAllToDo } from "../Service/toDos/getAllToDo";
import { ToDoProps } from "../data/PropsContext";
import { useStorage } from "../Service/auth/useStorage";
import { Storage } from "@ionic/storage"



export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);
  
  const [change,setChange] = useState<boolean>();

 
  

    useEffect(()=>{
    
      const initStorage = async ()=>{
      const newStore = new Storage();
      const store = await newStore.create()
      await store.get("user").then(res=>{
        
        let user = JSON.parse(res);

        console.log(user)
        let token = user.access_token
        getAllToDo(token).then(res=>{
          console.log(res)
          setToDos(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      });
      }

      initStorage();

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
                      const prop :ToDoProps={element,setChange,change};
                      
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
