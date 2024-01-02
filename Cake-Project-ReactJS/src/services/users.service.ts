import UserRepository from "../repositories/user.repositories";
import { ICart, IProduct, IUser } from "../types/interface";

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async register(formRequest: IUser): Promise<any> {
    try {
      return await this.userRepository.register(formRequest);
    } catch (error) {
      throw error;
    }
  }
  public async login(formRequest: any): Promise<any> {
    try {
      return await this.userRepository.login(formRequest);
    } catch (error) {
      throw error;
    }
  }
  public async addToCart(idUser: number, itemProduct: IProduct) {
    let usersDb = await this.userRepository.getUserById(idUser);
    let user: IUser = usersDb.data;
    let cartUser: ICart[] = user.cart;
    let checkCart: ICart | undefined = cartUser.find(
      (item: ICart) => item.id === itemProduct.id
    );

    if (checkCart) {
      cartUser.map((item: ICart) => {
        return item.id === itemProduct.id
          ? { ...item, quantity: item.quantity++ }
          : item;
      });
    } else {
      cartUser = [...cartUser, { ...itemProduct, quantity: 1 }];
    }
    await this.userRepository.patchNewCart(idUser, cartUser);
  }

  public async addToCartDetail(
    productDetail: any,
    idUser: number,
    quantityInput: number
  ) {
    let usersDb = await this.userRepository.getUserById(idUser);
    let user = usersDb.data;
    let cartUser: ICart[] = user.cart;
    let checkCart: ICart | undefined = cartUser.find(
      (item: ICart) => item.id === productDetail?.id
    );
    if (checkCart) {
      cartUser.map((item: ICart) => {
        return item.id === productDetail?.id
          ? { ...item, quantity: (item.quantity += quantityInput) }
          : item;
      });
    } else {
      cartUser = [...cartUser, { ...productDetail, quantity: +quantityInput }];
    }
    console.log(cartUser);
    await this.userRepository.patchNewCart(idUser, cartUser);
  }

  public async removeCarts(idUser:number):Promise<any> {
    await this.userRepository.patchNewCart(idUser, []);
  }
  public async editProfileUser(idUser:number, formRequest:IUser):Promise<any> {
    await this.userRepository.patchNewProfileUser(idUser, formRequest);
  }

  public async getUserById(id: number): Promise<IUser>{
    const  result = await this.userRepository.getUserById(id);
    return result
  }

  public async onPlus(itemCart:ICart,idUser:number) {
    const result = await this.userRepository.getUserById(idUser)
    const carts:ICart[] = result.data.cart
    let checkCart = carts.find((item:ICart) => item.id === itemCart.id)
    if (checkCart) {
      carts.map((item:ICart) => {
        return (item.id === itemCart.id) ? {...item, quantity: item.quantity++} : item;
      })
    }
    await this.userRepository.patchNewCart(Number(idUser),carts);
  }
  public async onMinus(itemCart:ICart,idUser:number) {
    const result = await this.userRepository.getUserById(idUser)
    const carts:ICart[] = result.data.cart
    let checkCart = carts.find((item:ICart) => item.id === itemCart.id)
    if (checkCart) {
      carts.map((item:ICart) => {
        return (item.id === itemCart.id) ? {...item, quantity: item.quantity--} : item;
      })
    }
    await this.userRepository.patchNewCart(Number(idUser),carts);
  }

  public async onDelete(itemCart:ICart,idUser:number) {
    const result = await this.userRepository.getUserById(idUser)
    const carts:ICart[] = result.data.cart
    let newCarts:ICart[] = carts.filter((item:ICart) => item.id !== itemCart.id)
    await this.userRepository.patchNewCart(Number(idUser),newCarts);
  }

}

export default UserService;
