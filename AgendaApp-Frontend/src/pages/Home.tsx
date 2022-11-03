import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon,IonPage,IonRow, IonTitle, IonToolbar, useIonAlert, useIonViewWillEnter} from "@ionic/react";
import { useEffect, useState } from "react";
import { add, image, logOutOutline} from 'ionicons/icons';
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "../components/ToDoCard"
import  style  from "./css/Home.module.css"
import { getAllToDo } from "../Service/toDos/getAllToDo";
import { ToDoProps } from "../data/PropsContext";
import { Storage } from "@ionic/storage"
import { useHistory } from "react-router";




export  function Home() {

  const [toDos,setToDos] = useState<ToDo[]>([]);
  const [change,setChange] = useState("");
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const newStore = new Storage();
 
    

    useEffect(()=>{
      const initStorage = async ()=>{
        const store = await newStore.create()
        await store.get("user").then(res=>{    
          let user = JSON.parse(res);
          let token = user.access_token
          getAllToDo(token).then(res=>{  
          setToDos(res.data)
          })
          .catch(err=>{
            console.log(err)
          })
        });
        }
        initStorage();

    },[change])
   
    function AlertCloseSession(){
      return(presentAlert({
          header: '¿Desea cerrar la sesión?',
          buttons:  [
              {
                text: 'no'
                ,
              },
              {
                text: 'si',
                handler: async ()  => {
                  const store = await newStore.create()
                  store.clear()
                  history.push("login")
                  
                }
                ,
              },
            ],
        }))
  }


  

 
  return (
    <IonPage >
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonButton slot="start" fill="solid" color={"light"} onClick={AlertCloseSession}><IonIcon icon={logOutOutline}/></IonButton>
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
