
import {ToDo} from "../data/ToDoContext";
export function putToDo(element:ToDo){
   

   return( fetch("http://localhost:8080/api/"+element.id, {
            method: "PUT",
            body: JSON.stringify(element),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            )
  
   
        


}