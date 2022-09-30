
import {ToDo} from "../data/ToDoContext";
export function postToDo(element:ToDo){
   

   return( fetch("http://localhost:8080/api/", {
            method: "POST",
            body: JSON.stringify(element),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            )
  
   
        


}