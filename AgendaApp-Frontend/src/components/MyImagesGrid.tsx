
import { IonActionSheet, IonCol, IonContent, IonGrid, IonImg, IonRow} from "@ionic/react";
import { pencil, trash } from "ionicons/icons";
import {  useEffect,useReducer,useState } from "react";
import { useHistory } from "react-router";
import { MyImages } from "../data/ImageContext";
import { PhotoModalProp } from "../data/PhotoModalContext";
import { deletePhoto } from "../Service/photos/deletePhoto";



import { getAllPhotos } from "../Service/photos/getAllPhotos";




export function MyImagesGrid(){

    const [images,setImages] = useState<MyImages[]>([]);
    const [optionSheet,setOptionSheet] = useState(false);
    const [imageID,setImageID] = useState("");
    const [refresh,setRefresh] = useReducer(x=>x+2,0);


    // const [modalState, setModalState] = useState(false);
  const history = useHistory();

    // let propModalState:PhotoModalProp={
    // modalState:modalState,
    // setModalState:setModalState};

   

    useEffect(()=>{
        console.log("bsuco toda las imagenes")
        getAllPhotos().then(response => {
            setImages(response.data)
          }).catch(e => {
            console.log(e)
          })
    },[refresh])


    
    return(
    <IonContent>
        <IonGrid>
            <IonRow>
                {     
                    images.map
                    ((e:MyImages,key:any)=>
                        {
                        return (    
                            <IonCol key={key} size="4">        
                                <IonImg  alt={"imagen de "+e.title} src={"http://localhost:8080/images/"+e.filename}
                                onClick={()=>{setOptionSheet(true) ; setImageID(e.id)}}></IonImg>
                            </IonCol>
                        )
                        }
                    )
                    
                }
            </IonRow>
        </IonGrid>
        
        <IonActionSheet
         isOpen={optionSheet}
         buttons={[
          {
            text: 'Borrar',
            role: 'destructive',
            icon:trash,
            handler: ()=>{
              console.log("work delete")
              deletePhoto(imageID)
              setOptionSheet(false)
              setRefresh()
            },
          },
          {
            text: 'Editar',
            role:'Edit',
            icon:pencil,
            handler: ()=>{
              console.log("work edit")
              // setModalState(true)

              history.push("/myimages/edit/"+imageID)

              setOptionSheet(false)

            },
          },
          {
            text: 'Cerrar',
            role: 'cancel',
            handler: ()=>{
              setOptionSheet(false)
              setRefresh()
            },
          },
        ]}
         >
         </IonActionSheet>
    </IonContent>
    )

    
}