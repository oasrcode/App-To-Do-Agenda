import axios from "axios"
export function getAllToDo(){

    return(axios.get("http://localhost:8080/api/all"))   
     
}