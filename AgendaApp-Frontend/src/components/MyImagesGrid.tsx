
import { IonActionSheet, IonAlert, IonCol, IonContent, IonGrid, IonImg, IonRow, useIonViewWillEnter} from "@ionic/react";
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
    const [rerender, setRerender] = useState(0);
   


  const history = useHistory();

    useEffect(()=>{
      getAllPhotos().then(response => {
        setImages(response.data)
      }).catch(e => {
        console.log(e)
      })
        
      
      /* problem with the clics over alers, sometime dosent  delete but the image still there,
       even when useEffect is re-called to reload the component as the first time*/ 
          
    },[rerender])

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
              setRerender(prev => prev + 1);

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
              history.push("/myimages/edit/"+imageID)
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