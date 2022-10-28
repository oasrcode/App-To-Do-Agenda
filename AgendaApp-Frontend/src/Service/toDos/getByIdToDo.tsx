import axios from "axios";

export function getByIdToDo(id:string){
    return(axios.get("http://localhost:8080/api/"+id))
    
}