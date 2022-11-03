
import { IonActionSheet, IonAlert, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonRow, useIonViewDidEnter, useIonViewWillEnter} from "@ionic/react";
import { randomInt } from "crypto";
import { pencil, trash } from "ionicons/icons";
import {  useEffect,useState } from "react";

import { useHistory } from "react-router";
import { MyImages } from "../data/ImageContext";
import { deletePhoto } from "../Service/photos/deletePhoto";
import { getAllPhotos } from "../Service/photos/getAllPhotos";
import { Storage } from "@ionic/storage"
import style from "./css/MyImagesGrid.module.css"


export function MyImagesGrid(){

    const [images,setImages] = useState<MyImages[]>([]);
    const [optionSheet,setOptionSheet] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [imageID,setImageID] = useState("");
    const [change,setChange] = useState("");
    const [token,setToken] = useState("");
    const history = useHistory();

    useEffect(()=>{
      const initStorage = async ()=>{
        const newStore = new Storage();
        const store = await newStore.create()
        await store.get("user").then(res=>{    
          let user = JSON.parse(res);
          let token = user.access_token
          setToken(token);
          getAllPhotos(token).then(response => {
            setImages(response.data)
           
          }).catch(e => {
            console.log(e)
          })
        }).catch(err=>{
            history.push("/login")
        });
        }
        initStorage(); 
        setChange("")

    },[,change])

   
    return(
    <IonContent>
        <IonGrid>
            <IonRow>
            <IonCol>
                {     
                    images.map
                    ((e:MyImages,key:any)=>
                        {
                        return (    
                           
                              <div key={key} className={style.photoContainer}>
                              <IonImg className={style.imgContainer}  alt={"imagen de "+e.title} src={"http://localhost:8080/images/"+e.filename}
                                onClick={()=>{setOptionSheet(true) ; setImageID(e.id)}}></IonImg>
                               <IonItem no-lines color={"tertiary"}><IonLabel>{e.title}</IonLabel></IonItem>
                              </div>                  
                        )
                        }
                    )
                }
                </IonCol>
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
            deletePhoto(imageID,token).catch(err=>{
              console.log(err)
            });
            setChange(imageID+token)
                

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