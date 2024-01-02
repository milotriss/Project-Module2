import ApiService from "../api/api.service"
import { IOrder } from "../types/interface"


class OrderRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }

    async postOrder(formOrders:IOrder) {
       const result = await this.apiService.Post("orders", formOrders)
       return result
    }
    async getOrder(): Promise<any> {
        const result = await this.apiService.GetAll("orders")
        return result
    }
}
export default OrderRepository