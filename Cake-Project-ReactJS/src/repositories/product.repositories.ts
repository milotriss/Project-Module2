import ApiService from "../api/api.service";

class ProductRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllProducts(): Promise<any> {
    const result:any = await this.apiService.GetAll("products");
    return result.data
  }
  async getProductsById(id: number|undefined): Promise<any> {
    const result:Response = await this.apiService.GetById("products", id);
    return result
  }
  async onMinusStock(id:number, data:any): Promise<any> {
    const result:Response = await this.apiService.Patch("products",id, "stock",data)
    return result
  }
}


export default ProductRepository;
