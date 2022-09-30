
export function getByIdToDo({id}:{id:string}){

    
    return(fetch('http://localhost:8080/api/'+id, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
      }))
      
}