import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { UserSignIn } from "../data/UserContext";
import { Signin } from "../Service/auth/singin";

import { Storage } from "@ionic/storage"
export function Login(){

    const usernameInput = useRef<HTMLIonInputElement>(null);
    const passwordInput = useRef<HTMLIonInputElement>(null);
    const history = useHistory()
    const [presentAlert] = useIonAlert();

    
    function AlertDone(){
        return(presentAlert({
            header: 'Usuario Registrado',
            buttons:  [
                {
                  text: 'volver',
                  handler: () => {
                    history.push("/home");
                    
                  },
                },
              ],
          }))
    }


     function OnSubmit(event:any){

        event.preventDefault()

        let username = usernameInput.current?.value as string;
        let password = passwordInput.current?.value as string;
    

        let userSigin: UserSignIn={username,password}
        
        Signin(userSigin).then(async res=>{
          
            const initStorage = async ()=>{
                const newStore = new Storage();
                const store = await newStore.create()
                await store.set("user",JSON.stringify(res.data))
                }
                initStorage();
        })

        
       AlertDone()
    }

    return(<IonPage>
        <IonContent>
            <form onSubmit={OnSubmit}>
                <IonItem>
                    <IonInput placeholder="USUARIO" type="text" ref={usernameInput}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="CONTRASEÑA" type="password" ref={passwordInput}></IonInput>
                </IonItem>
                <IonButton type="submit" >Enviar</IonButton>
            </form>

            <IonLabel>Regitrate aquií si aun no tienes cuenta</IonLabel>
                <IonButton fill="outline" onClick={()=>history.push("/signin")}> Registrase</IonButton>
        </IonContent>
    </IonPage>)
}