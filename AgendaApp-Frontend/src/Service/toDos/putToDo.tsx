import axios from "axios";
import { ToDo } from "../../data/ToDoContext";


export function putToDo(element:ToDo,token:string){


   var config = {
      method: 'put',
      url: 'http://localhost:8080/api/'+element.id,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token  
      },
      data : element
    };

    return(axios(config))
        
}