import ProductRepository from "../repositories/product.repositories";
import { ICart, IProduct } from "../types/interface";

class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const result = await this.productRepository.getAllProducts();
    const allProducts = result.filter(
      (item: IProduct) => item.isDelete === true
    );
    return allProducts;
  }

  public async getProductsCategory(value: string) {
    const result = await this.getAllProducts();
    const productsCategory = result.filter(
      (item: IProduct) => item.category === value
    );
    return productsCategory;
  }

  public async getProductsById(id: number | undefined): Promise<IProduct> {
    const result = await this.productRepository.getProductsById(id);
    return result;
  }
  public async onSearch(value: string) {
    const result = await this.getAllProducts();
    const searchProducts = result.filter((item: IProduct) =>
      item.name.toLowerCase().includes(value)
    );
    return searchProducts;
  }
  public async updateStock(data: any) {
    const result = await Promise.all(
      data.map(async (item: any) => {
        return await this.productRepository.onMinusStock(
          item.id,
          item.stock - item.quantity
        );
      })
    );
    return result;
  }
  public async onMinusStock(carts: ICart[]) {
    const products = await this.getAllProducts();
    let productsNeed = products.reduce((result: any[], item: any) => {
      carts.forEach((element: any) => {
        if (item.id == element.id && !result.includes(item)) {
          result.push(item);
        }
      });
      return result;
    }, []);
    let arrNeed: any = carts.reduce((result: any[], item: any) => {
      productsNeed.forEach((element: any) => {
        if (item.id == element.id) {
          result.push({
            id: item.id,
            stock: item.stock,
            quantity: item.quantity,
          });
        }
      });
      return result;
    }, []);
    this.updateStock(arrNeed);
    return arrNeed;
  }
}
export default ProductService;
