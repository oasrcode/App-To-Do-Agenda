import { IonBackButton, IonButton, IonButtons,

    IonContent, IonDatetime, IonDatetimeButton,

    IonHeader, IonInput, IonItem, IonLabel, 

    IonList, 

    IonModal, IonPage,  IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonAlert, useIonViewWillEnter} 
    from "@ionic/react";


import {useRef} from "react";
import { useHistory } from "react-router";
import { ToDo, ToDoType } from "../data/ToDoContext";
import { postToDo } from "../Service/toDos/postToDo";

import style from "./css/AddToDo.module.css"


export  function AddToDo() {

    const [presentAlert] = useIonAlert();
    
    //can use this way or Onchange with useState
    const typeInput = useRef<HTMLIonSelectElement>(null);
    const titleInput = useRef<HTMLIonInputElement>(null);
    const summInput = useRef<HTMLIonTextareaElement>(null);
    const dateTimePicker = useRef<HTMLIonDatetimeElement>(null);
    const myForm = useRef<HTMLFormElement>()
    const history = useHistory();

    useIonViewWillEnter(()=>{
       
    })


    function Alert(componente:string){
        return(presentAlert({
            header: 'Rellena '+ componente,
            buttons: ['OK'],
          }))
    }

    function AlertDone(){
        return(presentAlert({
            header: 'Añadido a la agenda',
            buttons:  [
                {
                  text: 'volver',
                  handler: () => {
                    history.push("/home");
                    myForm.current?.reset()
                  },
                },
              ],
          }))
        
    }


    function onSubmit(event:any){
        event.preventDefault();
              
        let title  = titleInput.current?.value as string;
        let summ = summInput.current?.value as string ;
        let date =  dateTimePicker.current?.value as string 
        let type = typeInput.current?.value as ToDoType
        
        
            if(type === undefined){
                Alert("el tipo")
            }else if(title === ""){
                Alert("el título")
            }else if(summ === ""){
                Alert("la descripción")
            }else if(date === undefined){
                Alert("la fecha y la hora")
            }else{
                   
            let element:ToDo={id:null,title:title,summ:summ,time:date,type:type}
            postToDo(element)
  
   
             AlertDone();
            
    }
}

    return(<IonPage>
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
                <IonItem lines="none">
                    <IonSelect ref={typeInput} slot="end" interface="popover" placeholder="Elige el tipo">
                        <IonSelectOption value="task">Tarea</IonSelectOption>
                        <IonSelectOption value="hobby">Hobby</IonSelectOption>
                        <IonSelectOption value="resting">Descanso</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonList>

            <IonItem>
                <IonLabel position="floating">Titulo</IonLabel>
                <IonInput ref={titleInput} placeholder="Titulo" />
            </IonItem>
           
            <IonItem>
                <IonLabel position="floating">Descripción</IonLabel>
                <IonTextarea ref={summInput} wrap="off" placeholder="Descripción" />
            </IonItem>
            <br></br>
            <IonItem >
            <IonLabel class="ion-text-start">Fecha</IonLabel>
           
            <IonDatetimeButton  datetime="datetime" ></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>   
                    <IonDatetime ref={dateTimePicker}   id="datetime" className={style.DateTime} color="tertiary"></IonDatetime>
                </IonModal>
            </IonItem>
           <div className={style.BtnDiv} >
           <IonButton type="submit" size={"large"}  shape={"round"}  className={style.BtnAdd} >Crear</IonButton>  
            </div>
            </form>        
        </IonContent>
    </IonPage>)
        
}


