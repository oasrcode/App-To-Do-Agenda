import axios from "axios";

export function postPhoto(form:FormData,token:string){

  var config = {
    method: 'post',
    url: "http://localhost:8080/api/photos/",
    headers: {   
        'Content-Type': 'multipart/form-data',  
       'Authorization': 'Bearer ' + token  
        },
        data:form
  };

  return(axios(config))

    
     
}