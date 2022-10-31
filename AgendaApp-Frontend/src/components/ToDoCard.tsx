import { IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonIcon, IonImg, 
  IonItem, IonLabel, useIonAlert } from "@ionic/react";

import imgHobby from "../images/hobby.jpg";
import imgTask from "../images/task.jpg";
import imgRest from "../images/resting.jpg";
import style from "../components/css/ToDoCard.module.css";

import { createOutline } from "ionicons/icons";
import { trashBin } from "ionicons/icons";


import { deleteToDo } from "../Service/toDos/deleteTodo";
import { ToDoProps } from "../data/PropsContext";



export function ToDoCard({props}:{props:ToDoProps}){

  let img;
  const [presentAlert] = useIonAlert();

  
  switch (props.element.type) {
      case "task":
      img=imgTask;
      break;

      case "hobby":
        img=imgHobby;
      break;

      case "resting":
        img=imgRest;
      break;

    default:
      break;
  }
    function deleteElement(){
      let id:string = props.element.id as string;
      deleteToDo({id})
      
      props.setChange(true)//trick to reload grid
      
    }


    function Alert(){
      return(presentAlert({
        header: '¿Estás seguro?',
        buttons: 
        [
          {
          text: 'Cancel',
          role: 'cancel',
          },
          {
            text: 'Ok',
            role: 'confirm',
            handler:deleteElement
          }
        ],
      }))
  }

    new Date(props.element.time).getFullYear();
    let time = {
      day:new Date(props.element.time).getDate(),
      month:new Date(props.element.time).getMonth() +1,
      year:new Date(props.element.time).getFullYear(),
      hour: new Date(props.element.time).getHours()+":"+new Date(props.element.time).getMinutes()
    }

    return( 
    <IonCard className={style.Card}>
         <div className={style.btns}>
         <IonItem className={style.BtnDelete} onClick={()=>{Alert();}} lines="none"><IonIcon color="danger" icon={trashBin} /></IonItem>
         <IonItem className={style.BtnEdit} routerLink={"edit/"+props.element.id} routerDirection="forward" lines="none"><IonIcon className={style.btnEdit} color="warning" icon={createOutline}/></IonItem>
         </div>
        <IonImg src={img} className={style.Img}/>      
        <IonCardHeader>
          <IonCardTitle class="ion-text-center"  mode="md" color={"dark"}>{props.element.title}</IonCardTitle>
          <IonCardSubtitle class="ion-text-center">{"El "+time.day+"/"+time.month+"/"+time.year+" a las "+time.hour+" h"}</IonCardSubtitle>
          </IonCardHeader>
        <IonCardContent className={style.CardContent}>
        <IonLabel  class="ion-text-wrap">{props.element.summ}</IonLabel>
        </IonCardContent>
    </IonCard>
       
    )

}