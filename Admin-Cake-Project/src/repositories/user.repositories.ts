import ApiService from "../api/api.service";



class UserRepository {
    private apiService: ApiService;
    constructor(){
        this.apiService = new ApiService()
    }
    async login(formRequest: any):Promise<any> {
      const result:Response =  await this.apiService.Post('login', formRequest)
      return result
    }
    async getAllUsers(): Promise<any>{
        const result:Response = await this.apiService.GetAll("users")
        return result
    }
    async getAdminById(id:number): Promise<any>{
        const result:Response = await this.apiService.GetById("users",id)
        return result
    }
    async getUserById(id:number): Promise<any>{
        const result:Response = await this.apiService.GetById("users",id)
        return result
    }
    async patchUserById (id:number,data:any): Promise<any>{
        await this.apiService.Patch("users", id ,"status", data)
    }
    async register(formRequest: any):Promise<any> {
        const result:Response =  await this.apiService.Post('register', formRequest)
        return result
    }
    async deleteAdmin(id:number): Promise<any>{
        const result:Response = await this.apiService.Delete("users",id)
        return result
    }
}

export default UserRepository