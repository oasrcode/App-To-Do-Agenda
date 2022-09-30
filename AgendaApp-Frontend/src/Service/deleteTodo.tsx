
export function deleteToDo({id}:{id:string}){

    
    return(fetch('http://localhost:8080/api/'+id, {
        method: "DELETE",
        headers: {"Content-type": "application/json;charset=UTF-8"}
      }))
      
}