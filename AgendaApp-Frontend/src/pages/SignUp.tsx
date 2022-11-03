import { IonButton, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from "@ionic/react";
import { useRef,  } from "react";
import { useHistory } from "react-router";
import { User } from "../data/UserContext";
import { postUser } from "../Service/auth/postUser";
import style from "./css/Signup.module.css"
const logo =  require("../images/logo.png")
export function SignUp(){

    const nameInput = useRef<HTMLIonInputElement>(null);
    const usernameInput = useRef<HTMLIonInputElement>(null);
    const passwordInput = useRef<HTMLIonInputElement>(null);
    const isAdmin = false;

    const history = useHistory()

    const [presentAlert] = useIonAlert();

    function AlertDone(){
        return(presentAlert({
            header: 'Usuario Registrado',
            buttons:  [
                {
                  text: 'Volver al login',
                  handler: () => {
                    history.push("/login");
                    
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

    function OnSubmit(event:any){
        
        event.preventDefault();
        let name = nameInput.current?.value as string;
        let username = usernameInput.current?.value as string;
        let password = passwordInput.current?.value as string;

        
        if(name === ""){
            Alert("el nombre")
        }else if(username === ""){
            Alert("el usuario")
        }else if(password === ""){
            Alert("la contraseña")
        }else{
            let user:User={name,username,password,isAdmin};
            postUser(user);
            AlertDone();
        }
       

    }

    return<IonPage>
        <IonContent>
        <IonImg className={style.img} src={logo} />
            <form onSubmit={OnSubmit}>
                <IonItem>
                    <IonLabel>Nombre</IonLabel>
                    <IonInput type="text" ref={nameInput} ></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>usuario</IonLabel>
                    <IonInput type="text" ref={usernameInput}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel>contraseña</IonLabel>
                    <IonInput type="password" ref={passwordInput}> </IonInput>
                </IonItem>
                <IonButton type="submit" fill="solid" expand="block" color={"tertiary"}> Enviar</IonButton>
                <IonButton  fill="outline" expand="block" onClick={()=>history.goBack()} color={"tertiary"}> Volver</IonButton>
                
            </form>
        </IonContent>
    </IonPage>
}