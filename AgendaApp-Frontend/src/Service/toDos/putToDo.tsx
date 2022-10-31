import axios from "axios";
import { ToDo } from "../../data/ToDoContext";


export function putToDo(element:ToDo){
   
   axios.put("http://localhost:8080/api/"+element.id,element,)
   .then(res=>{
     
   })
   .catch(err=>{
      console.log(err)
   })
        
}