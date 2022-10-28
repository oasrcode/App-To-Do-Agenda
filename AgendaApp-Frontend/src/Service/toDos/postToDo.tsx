import axios from "axios";
import { ToDo } from "../../data/ToDoContext";

export function postToDo(element:ToDo){
   
   axios.post("http://localhost:8080/api/",element,)
   .then(res=>{
      console.log(res)
   })
   .catch(err=>{
      console.log(err)
   })
   
}