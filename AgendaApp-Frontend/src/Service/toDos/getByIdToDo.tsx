import axios from "axios";

export function getByIdToDo(id:string,token:string){
    
    var config = {
        method: 'get',
        url: 'http://localhost:8080/api/'+id,
        headers: {  
        'Content-Type': 'application/json',   
           'Authorization': 'Bearer ' + token 
            }
      };
      return(axios(config))
    
}