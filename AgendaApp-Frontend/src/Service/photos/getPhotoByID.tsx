import axios from "axios";

export function getPhotoByID(id:string,token:string){
   // return(axios.get("http://localhost:8080/api/photos/"+id))

   var config = {
      method: 'get',
      url: "http://localhost:8080/api/photos/"+id,
      headers: {   
          'Content-Type': 'application/json',  
         'Authorization': 'Bearer ' + token  
          }
    };
    return(axios(config))
}