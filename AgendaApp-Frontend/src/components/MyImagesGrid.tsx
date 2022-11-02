
import { IonActionSheet, IonAlert, IonCol, IonContent, IonGrid, IonImg, IonRow, useIonViewDidEnter, useIonViewWillEnter} from "@ionic/react";
import { randomInt } from "crypto";
import { pencil, trash } from "ionicons/icons";
import {  useEffect,useState } from "react";

import { useHistory } from "react-router";
import { MyImages } from "../data/ImageContext";
import { deletePhoto } from "../Service/photos/deletePhoto";
import { getAllPhotos } from "../Service/photos/getAllPhotos";

import style from "./css/MyImagesGrid.module.css"


export function MyImagesGrid(){

    const [images,setImages] = useState<MyImages[]>([]);
    const [optionSheet,setOptionSheet] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [imageID,setImageID] = useState("");
    const [change,setChange] = useState<boolean>();

    const history = useHistory();

    useEffect(()=>{
      getAllPhotos().then(response => {
        setImages(response.data)
      }).catch(e => {
        console.log(e)
      })    
      
      
    },[change])

    useIonViewWillEnter(()=>{
      getAllPhotos().then(response => {
        setImages(response.data)
      }).catch(e => {
        console.log(e)
      })  
    })

    return(
    <IonContent>
        <IonGrid>
            <IonRow>
                {     
                    images.map
                    ((e:MyImages,key:any)=>
                        {
                        return (    
                            <IonCol key={key} size="4" >                  
                              <IonImg className={style.imgContainer}  alt={"imagen de "+e.title} src={"http://localhost:8080/images/"+e.filename}
                                onClick={()=>{setOptionSheet(true) ; setImageID(e.id)}}></IonImg>        
                            </IonCol>
                        )
                        }
                    )
                }
            </IonRow>
        </IonGrid>
       
        <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="¿Estas seguro?"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setShowAlert(false);
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
            deletePhoto(imageID);
              
            setChange(!change)
                

            },
          },
        ]}
        />
        <IonActionSheet
         isOpen={optionSheet}
         cssClass="actionSheet"
         buttons={[
          {
            text: 'Borrar',
            role: 'destructive',
            icon:trash,
            handler: ()=>{
              setOptionSheet(false)
              setShowAlert(true)
              
            },
          },
          {
            text: 'Editar',
            role:'Edit',
            icon:pencil,
            handler: ()=>{
              history.push("/editimage/"+imageID)
              setOptionSheet(false)

            },
          },
          {
            text: 'Cerrar',
            role: 'cancel',
            handler: ()=>{
              setOptionSheet(false)
            },
          },
        ]}
         />
    </IonContent>
    )

    
}