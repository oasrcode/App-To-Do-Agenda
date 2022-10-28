import { Camera} from "@capacitor/camera";

export async function pickImage(){
    const picked = await Camera.pickImages({
        limit:1,
        quality:100
      })
      
     return(picked);
 
}