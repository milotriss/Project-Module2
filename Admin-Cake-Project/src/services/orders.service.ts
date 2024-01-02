import { formatDate } from "../common/formatDate";
import OrderRepository from "../repositories/order.repositories";
import { IOrder } from "../types/interface";

class OrderService {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  public async getAllOrders(): Promise<IOrder[]> {
    const result = await this.orderRepository.getAllOrder();
    const data = result.data.sort((a:any, b:any) =>(a.status - b.status))
    return data
  }
  public async getOrderById (id: number): Promise<IOrder> {
    const data = await this.getAllOrders()
    const result:any = data.find((item: IOrder) => item.id === id)
    return result
  }
  public async revenue():Promise<number> {
    const orders:IOrder[] = await this.getAllOrders();
    const result = orders.reduce((init:number, order:IOrder) => init + order.totalPrice,0)
    return result
  }
  public async changeStatusOrder(id: number, status: number){
    await this.orderRepository.patchStatusOrder(id, status)
  }
  public async searchOrderByDate(date:string): Promise<IOrder[]> {
    const data = await this.getAllOrders()
    const result:IOrder[] = data.filter((item: IOrder) => formatDate(item.date).includes(formatDate(date)))
    return  result
  }
  
}

export default OrderService;
