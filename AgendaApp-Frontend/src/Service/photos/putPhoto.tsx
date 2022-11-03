import axios from "axios";

export function putPhoto(form:FormData,token:string){
    
        var config = {
          method: 'put',
          url: "http://localhost:8080/api/photos/"+form.get("id"),
          headers: {   
              'Content-Type': 'multipart/form-data',  
             'Authorization': 'Bearer ' + token  
              },
              data:form
        };
      
        return(axios(config))

}