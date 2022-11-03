import axios from "axios"
export function getAllPhotos(token:string){

    
    var config = {
        method: 'get',
        url: "http://localhost:8080/api/photos/all",
        headers: {   
            'Content-Type': 'application/json',  
           'Authorization': 'Bearer ' + token  
            }
      };
      return( axios(config))
}