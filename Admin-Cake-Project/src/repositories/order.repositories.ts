import ApiService from "../api/api.service"
class OrderRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }
    async getAllOrder(): Promise<any> {
        const result = await this.apiService.GetAll("orders")
        return result
    }
    async patchStatusOrder(id:number, data:number) {
       await this.apiService.Patch('orders', id, "status", data)
    }
    
}
export default OrderRepository