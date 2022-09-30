import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage,IonRefresher,IonRefresherContent,IonRow, IonSplitPane, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter} from "@ionic/react";
import {  useState } from "react";
import { getAllToDo } from "../Service/getAllToDo";
import { add, chevronDownCircleOutline,} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"






export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);

 //Llama a la api si usa el IonRefresher
  function doRefresh(event: CustomEvent<RefresherEventDetail>) { 
    getAllToDo().then(response=>response.json()).then((result)=>{setToDos(result)});
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  }

  //LLama a la api cuando se crea el componente
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

        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent className={style.RefresherContent} pullingIcon={chevronDownCircleOutline}
          pullingText="Desliza para cargar" color="black"
          refreshingSpinner="circles"
          refreshingText="cargando..."></IonRefresherContent>
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
