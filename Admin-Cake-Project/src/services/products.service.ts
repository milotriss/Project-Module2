import ProductRepository from "../repositories/product.repositories";
import { IProduct } from "../types/interface";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  public async getAllProducts():Promise<IProduct[]> {
    const result = await this.productRepository.getAllProducts();
    return result;
  }
  public async getProductsCategory(value: string) {
    const result = await this.productRepository.getAllProducts();
    const productsCategory = result.filter(
      (item: IProduct) => item.category === value && item.isDelete === true
    );
    return productsCategory;
  }
  public async isDeleted(id: number , status:boolean) {
    await this.productRepository.isDeleteById(id, status)
  }
  public async searchProducts (value: string):Promise<IProduct[]> {
    const data = await this.getAllProducts()
    const result = data.filter((item:IProduct) => item.name.toLowerCase().includes(value))
    return result
  }
  public async editProduct(id:number, data:IProduct){
    await this.productRepository.patchNew(id,data)
  }
  public async addProduct(data:IProduct){
    await this.productRepository.postProduct(data)
  }
}
export default ProductService;
