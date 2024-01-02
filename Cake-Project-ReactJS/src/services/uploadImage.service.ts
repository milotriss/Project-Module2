import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../configs/firebase.config";
class UploadService {
  public async uploadImage(file: any, folderName: string) {
    const imageRef = ref(storage, `/${folderName}/${file.name}`);
    let data = await uploadBytes(imageRef, file);
    let result = await getDownloadURL(data.ref);
    return result
  }
}
export default UploadService;
