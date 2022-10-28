import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export async function takeImage(){
    const picture = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality:100
      });

      return picture;

}