import ApiService from "../api/api.service";
import { IProduct } from "../types/interface";

class ProductRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllProducts(): Promise<any> {
    const result:any = await this.apiService.GetAll("products");
    return result.data
  }
  async isDeleteById(id:number, status:boolean){
    await this.apiService.Patch('products',id, "isDelete", status)
  }
  async patchNew(id:number , data:IProduct){
    await this.apiService.PatchNew('products',id,data)
  }
  async postProduct(data:IProduct){
    await this.apiService.Post('products',data)
  }
}


export default ProductRepository;
