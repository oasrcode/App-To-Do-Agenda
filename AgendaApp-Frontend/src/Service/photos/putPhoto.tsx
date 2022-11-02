import axios from "axios";

export function putPhoto(form:FormData){
    axios({
        method: "put",
        withCredentials: false,
        url: "http://localhost:8080/api/photos/"+form.get("id"),
        data: form,
        headers: { "Content-Type": "multipart/form-data"},
      })
        .then(function (response) {
        
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

}