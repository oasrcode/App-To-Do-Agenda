import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from "@ionic/react";
import { useRef,  } from "react";
import { useHistory } from "react-router";
import { User } from "../data/UserContext";
import { postUser } from "../Service/auth/postUser";

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
                  text: 'volver',
                  handler: () => {
                    history.push("/login");
                    
                  },
                },
              ],
          }))
        
    }

    function OnSubmit(event:any){


        event.preventDefault();

        let name = nameInput.current?.value as string;
        let username = usernameInput.current?.value as string;
        let password = passwordInput.current?.value as string;

        let user:User={name,username,password,isAdmin};

        console.log(user)

        postUser(user);
        AlertDone()
        

    }

    return<IonPage>
        <IonContent>
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

                <IonButton type="submit" fill="outline"> Enviar</IonButton>
               
            </form>
        </IonContent>
    </IonPage>
}