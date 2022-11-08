import { IonBackButton, IonButton, IonButtons,

    IonContent, IonDatetime, IonDatetimeButton,

    IonHeader, IonInput, IonItem, IonLabel, 

    IonList, 

    IonModal, IonPage, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonAlert, useIonViewWillEnter } 
    from "@ionic/react";


import { useRef, useState }  from "react";
import { useHistory, useParams } from "react-router";
import { ToDo, ToDoType } from "../data/ToDoContext";
import { getByIdToDo } from "../Service/toDos/getByIdToDo";
import { putToDo } from "../Service/toDos/putToDo";
import { Storage } from "@ionic/storage"
import style from "./css/EditToDo.module.css"



export  function EditToDo() {
    
    let {id}:{id:string} = useParams();
    const [toDos,setToDos] = useState<ToDo>(); 
    const [presentAlert] = useIonAlert(); 
    const history = useHistory();
    const [token,setToken] = useState("");
    
   
     //can use this way or Onchange with useState
    const typeInput = useRef<HTMLIonSelectElement>(null);
    const titleInput = useRef<HTMLIonInputElement>(null);
    const summInput = useRef<HTMLIonTextareaElement>(null);
    const dateTimePicker = useRef<HTMLIonDatetimeElement>(null);
  
    

    useIonViewWillEnter(()=>{
       
            const initStorage = async ()=>{
                const newStore = new Storage();
                const store = await newStore.create()
                await store.get("user").then(res=>{
                  
                  let user = JSON.parse(res);
                  let token = user.access_token

                  setToken(token);

                 getByIdToDo(id,token).then(res=>{
                    setToDos(res.data)
                 }).catch(err=>{
                    console.log(err)
                 })
    
                 
                }).catch(err=>{
                    console.log(err)
                    history.push("/login")
                })
                }
                initStorage();
        
    })
    
    function onSubmit(event:any){
        event.preventDefault();
              
        let title  = titleInput.current?.value as string;
        let summ = summInput.current?.value as string ;
        let date =  dateTimePicker.current?.value as string 
        let type = typeInput.current?.value as ToDoType

        if(type === undefined || type === null ){
            Alert("el tipo")
        }else if(title === ""){
            Alert("el título")
        }else if(summ === ""){
            Alert("la descripción")
        }else if(date === undefined || date === null){
            Alert("la fecha y la hora")
        }else{

        let element:ToDo={id:id,title:title,summ:summ,time:date,type:type}
        putToDo(element,token)
        AlertDone()

        }
    
    }
    
    function Alert(componente:string){
        return(presentAlert({
            header: 'Rellena '+ componente,
            buttons: ['OK'],
          }))
    }
    
    function AlertDone(){
        return(presentAlert({
            header: 'ToDo modificado',
            buttons: [{
                text: 'volver',
                handler: () => {
                  history.push("/home");
                },
              }],
          }))
          
    }

   
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar  color="tertiary">
                <IonButtons slot="start" color="tertiary">
                    <IonBackButton text="volver"  defaultHref="/home" />
                </IonButtons>
             </IonToolbar>
            </IonHeader>
            <IonContent>
                <form onSubmit={onSubmit}>
            <IonList>
                    <IonItem lines="none" >
                        <IonSelect value={toDos?.type} ref={typeInput} slot="end" interface="popover" placeholder="Elige el tipo">
                            <IonSelectOption value="task">Tarea</IonSelectOption>
                            <IonSelectOption value="hobby">Hobby</IonSelectOption>
                            <IonSelectOption value="resting">Descanso</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>

                <IonItem>
                    <IonLabel position="floating">Titulo</IonLabel>
                    <IonInput value={toDos?.title} ref={titleInput} placeholder="Titulo" />
                </IonItem>
               
                <IonItem>
                    <IonLabel position="floating">Descripción</IonLabel>
                    <IonTextarea value={toDos?.summ} ref={summInput} wrap="off" placeholder="Descripción" />
                </IonItem>
                <br></br>
                <IonItem >
                <IonLabel class="ion-text-start">Fecha</IonLabel>
                <IonDatetimeButton  datetime="datetime" ></IonDatetimeButton>
                    <IonModal keepContentsMounted={true}>
                        <IonDatetime value={toDos?.time} ref={dateTimePicker} slot="end"  id="datetime" className={style.DateTime} color="tertiary"></IonDatetime>
                    </IonModal>
                </IonItem>
                <div className={style.BtnDiv}>
                <IonButton type="submit" size={"large"}  shape={"round"}  id="click-trigger"  className={style.BtnAdd}>Modificar</IonButton> 
                </div>
                </form>               
            </IonContent>
        </IonPage>
      )
    }

