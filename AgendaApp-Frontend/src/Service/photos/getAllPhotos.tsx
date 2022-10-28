import axios from "axios"
export function getAllPhotos(){

    return(axios.get("http://localhost:8080/api/photos/all"))
}