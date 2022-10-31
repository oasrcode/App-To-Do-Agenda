import axios from "axios";

export function postPhoto(form:FormData){

    axios({
        method: "post",
        url: "http://localhost:8080/api/photos",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
         
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
     
}