import { formatDate } from "../common/formatDate";
import OrderRepository from "../repositories/order.repositories";
import { IOrder } from "../types/interface";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async postOrder(formOrders: IOrder) {
    try {
      return await this.orderRepository.postOrder(formOrders);
    } catch (error) {
      throw error;
    }
  }

  public async getOrder(idUser: number) {
    let data = await this.orderRepository.getOrder();
    let orders = data.data;
    let result: IOrder[] = orders.filter(
      (item: IOrder) => item.idUser === idUser
    );
    return result;
  }
  public async onSearchOrders(value:string,idUser:number) {
    let data = await this.orderRepository.getOrder();
    let orders = data.data;
    let result: IOrder[] = orders.filter(
      (item: IOrder) => item.idUser === idUser
    );
    const ordersSearch = result.filter((item: IOrder) => formatDate(item.date).includes(formatDate(value)))
    return ordersSearch
  }
}

export default OrderService;
