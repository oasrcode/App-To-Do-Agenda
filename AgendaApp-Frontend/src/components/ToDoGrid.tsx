import { IonCol, IonGrid,IonRow, useIonViewWillEnter} from "@ionic/react";
import { useEffect, useState } from "react";
import { ToDo } from "../data/ToDoContext";
import { ToDoCard } from "./ToDoCard"
import  style  from "./css/TodoGrid.module.css"
import { getAllToDo } from "../Service/toDos/getAllToDo";
import { ToDoProps } from "../data/PropsContext";
import { Storage } from "@ionic/storage"




export function ToDoGrid(){
  
    const [toDos,setToDos] = useState<ToDo[]>([]);
    const newStore = new Storage();
    const [refresh,setRefresh] = useState(true)

    const initStorageAndFetch = async ()=>{

      const store = await newStore.create()
      await store.get("user").then(res=>{   

        let user = JSON.parse(res);
        let token = user.access_token

        getAllToDo(token).then(res=>{  

        setToDos([]);
        setToDos(res.data)
        })

        .catch(err=>{

          console.log(err)
        })
      });
      }
    
  
      useEffect(()=>{
        initStorageAndFetch();
      },[refresh])

      useIonViewWillEnter(()=>{
        initStorageAndFetch();
       
      })
    
    return (
              <IonGrid className={style.Main}>
                  <IonRow text-center>
                    <IonCol  text-center size="auto">
                    {
                      toDos.map
                      ((e:ToDo,key:any)=>
                     
                        {
                          
                        let element = e;
                         const prop :ToDoProps={element,setRefresh,refresh};
                        

                        return <ToDoCard ion-align-self-center  key={e.id} props={prop} />
                        }
                      )
                    }
                  </IonCol> 
                </IonRow>
              </IonGrid> 

    )
  }
  