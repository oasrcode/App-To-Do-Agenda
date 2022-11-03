import axios from "axios"
export function getAllToDo(token:string){
    var config = {
        method: 'get',
        url: 'http://localhost:8080/api/all',
        headers: {   
            'Content-Type': 'application/json',  
           'Authorization': 'Bearer ' + token  
            }
      };
      return( axios(config))
}