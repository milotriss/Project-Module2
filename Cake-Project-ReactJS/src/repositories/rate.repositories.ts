import ApiService from "../api/api.service";

class RateRepository {
    private apiService: ApiService
    constructor(){
        this.apiService = new ApiService()
    }

    async getRate<T>(): Promise<T>{
        const result = await this.apiService.GetAll('rate') as T
        return result
    }

    async postRate <T,U>(formRate:U): Promise<T>{
       return await this.apiService.Post('rate', formRate) as T
    }
}

export default RateRepository;