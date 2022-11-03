import axios from "axios"
export function deleteToDo(id:string,token:string){

  
      // axios.delete("http://localhost:8080/api/"+id)
      // .then(res=>{
       
      // })
      // .catch(err=>{
      //   console.log(err);
      // })

      var config = {
        method: 'delete',
        url: "http://localhost:8080/api/"+id,
        headers: {  
          'Content-Type': 'application/json',   
          'Authorization': 'Bearer ' + token 
            }
      };
      return(axios(config))
}