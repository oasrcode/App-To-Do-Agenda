
export function getAllToDo(){

    
    return(fetch('http://localhost:8080/api/all', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
      }))
      
}