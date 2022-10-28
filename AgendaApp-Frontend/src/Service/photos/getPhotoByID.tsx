import axios from "axios";

export function getPhotoByID(id:string){
   return(axios.get("http://localhost:8080/api/photos/"+id))
}