import axios from "axios"
export function deleteToDo({id}:{id:string}){

  
      axios.delete("http://localhost:8080/api/"+id)
      .then(res=>{
       
      })
      .catch(err=>{
        console.log(err);
      })
}