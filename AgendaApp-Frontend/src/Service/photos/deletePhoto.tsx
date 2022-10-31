import axios  from "axios";
export function deletePhoto(id:string){

    axios.delete("http://localhost:8080/api/photos/"+id)
    .then(res=>{
       
      })
      .catch(err=>{
        console.log(err);
      })
}