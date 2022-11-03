import { IonButton, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from "@ionic/react";
import { useRef, useState} from "react";
import { useHistory } from "react-router";
import { UserSignIn } from "../data/UserContext";
import { Signin } from "../Service/auth/singin";
import { Storage } from "@ionic/storage"

import  style  from "./css/Login.module.css"
import { stringify } from "querystring";


const logo =  require("../images/logo.png")
export function Login(){

    const usernameInput = useRef<HTMLIonInputElement>(null);
    const passwordInput = useRef<HTMLIonInputElement>(null);
    const history = useHistory()
  
    const [presentAlert] = useIonAlert();

    
    function AlertDone(){
        return(presentAlert({
            header: 'Bienvenido',
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
    function Alert(componente:string){
        return(presentAlert({
            header: 'Rellena '+ componente,
            buttons: ['OK'],
          }))
    }

    function AlerErrLogin(){
        return(presentAlert({
            header: 'Usuario o contraseña erroneo',
            buttons: ['volver'],
          }))
    }


     function OnSubmit(event:any){

        event.preventDefault()

        let username = usernameInput.current?.value as string;
        let password = passwordInput.current?.value as string;

        
        if(username === ""){
            Alert("el usuario")
        }else if(password === ""){
            Alert("la contraseña")
        }else{
    

        let userSigin: UserSignIn={username,password}
        
        Signin(userSigin).then(async res=>{
            const initStorage = async ()=>{
                const newStore = new Storage();
                const store = await newStore.create()
                await store.set("user",JSON.stringify(res.data))
                }
                initStorage();
                AlertDone()

        }).catch(err=>{
            AlerErrLogin()
        })

       

    }
    }

    return(<IonPage>
        <IonContent>
            <IonImg className={style.img} src={logo} />
            <form className={style.Form} onSubmit={OnSubmit}>
                <IonItem>
                    <IonInput placeholder="USUARIO" type="text" ref={usernameInput}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="CONTRASEÑA" type="password" ref={passwordInput}></IonInput>
                </IonItem>
                <IonButton color={"tertiary"} type="submit" >Enviar</IonButton>
            </form>
            <div className={style.signinContainer}>
            <IonLabel>Regístrate si aun no tienes cuenta</IonLabel>
            <IonButton color={"tertiary"} fill="outline" onClick={()=>history.push("/signup")}> Registrase</IonButton>
            </div>
        </IonContent>
    </IonPage>)
}