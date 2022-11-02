import axios from "axios";
import { UserSignIn } from "../../data/UserContext";




export function Signin(userSigin:UserSignIn){


    function getOptions(user: UserSignIn){
        let base64UserAndPassword = window.btoa(user.username + ":" + user.password);
        let basicAccess = 'Basic ' + base64UserAndPassword;
        let options = {
          headers: {
            'Authorization' : basicAccess,
            'Content-Type' : 'application/x-www-form-urlencoded',
          }
        };
        return options;
      }

      return (axios.post("http://localhost:8080/api/users/signin",userSigin,getOptions(userSigin)))


}