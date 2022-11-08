import axios from "axios";
import { User } from "../../data/UserContext";

export function postUser(user:User){

    axios.post("http://localhost:8080/api/users/",user)
    .then(res=>{
    })
    .catch(err=>{
       console.log(err)
    })

    
}