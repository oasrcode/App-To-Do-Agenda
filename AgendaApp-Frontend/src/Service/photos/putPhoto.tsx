import axios from "axios";

export function putPhoto(form:FormData){
    axios({
        method: "put",
        url: "http://localhost:8080/api/photos/"+form.get("id"),
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

}