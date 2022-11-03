import axios from "axios";
import { ToDo } from "../../data/ToDoContext";

export function postToDo(element:ToDo,token:string){
   
   // axios.post("http://localhost:8080/api/",element,)
   // .then(res=>{
     
   // })
   // .catch(err=>{
   //    console.log(err)
   // })
   var config = {
      method: 'post',
      url: 'http://localhost:8080/api/',
      headers: {     
         'Authorization': 'Bearer ' + token  
          },
      data:element
    };
    return( axios(config))
   
}