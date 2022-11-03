import axios  from "axios";
export function deletePhoto(id:string,token:string){

    var config = {
      method: 'delete',
      url: "http://localhost:8080/api/photos/"+id,
      headers: {  
        'Content-Type': 'application/json',   
        'Authorization': 'Bearer ' + token 
          }
    };
    return(axios(config))
}