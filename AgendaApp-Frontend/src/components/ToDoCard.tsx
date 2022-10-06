import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import imgHobby from "../images/hobby.jpg";
import imgTask from "../images/task.jpg";
import imgRest from "../images/resting.jpg";
import style from "../components/ToDoCard.module.css"
import { ToDo } from "../data/ToDoContext";
import { createOutline } from "ionicons/icons";
import { trashBin } from "ionicons/icons";
import { deleteToDo } from "../Service/deleteTodo";
import { useHistory } from "react-router";



export function ToDoCard({element}:{element:ToDo}){

  let img;

  const history = useHistory()

  const [presentAlert] = useIonAlert();

  
  switch (element.type) {
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
      let id:string = element.id as string;
      deleteToDo({id})
      history.push("/")//trick to reload com
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


    new Date(element.time).getFullYear();
    let time = {
      day:new Date(element.time).getDate(),
      month:new Date(element.time).getMonth() +1,
      year:new Date(element.time).getFullYear(),
      hour: new Date(element.time).getHours()+":"+new Date(element.time).getMinutes()
    }

    
    

    return( 
    <IonCard className={style.Card}>
         <div className={style.btns}>
         <IonItem className={style.BtnDelete} onClick={()=>{Alert()}} lines="none"><IonIcon color="danger" icon={trashBin} /></IonItem>
         <IonItem className={style.BtnEdit} routerLink={"EditTodo/"+element.id} routerDirection="forward" lines="none"><IonIcon className={style.btnEdit} color="warning" icon={createOutline}/></IonItem>
         </div>
        <IonImg src={img} className={style.Img}/>      
        <IonCardHeader>
          <IonCardTitle class="ion-text-center"  mode="md" color={"dark"}>{element.title}</IonCardTitle>
          <IonCardSubtitle class="ion-text-center">{"El "+time.day+"/"+time.month+"/"+time.year+" a las "+time.hour+" h"}</IonCardSubtitle>
          </IonCardHeader>
        <IonCardContent className={style.CardContent}>
        <IonLabel  class="ion-text-wrap">{element.summ}</IonLabel>
        </IonCardContent>
    </IonCard>
    
    
    )

}