import UserRepository from "../repositories/user.repositories";
import { IUser } from "../types/interface";

class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  public async login(formRequest: any): Promise<any> {
    try {
      return await this.userRepository.login(formRequest);
    } catch (error) {
      throw error;
    }
  }
  public async getAllUsers(): Promise<IUser[]> {
    const result = await this.userRepository.getAllUsers();
    const users = result.data.filter((user: IUser) => (user.role === 2));
    const data = users.sort((a:any, b:any) =>(a.status - b.status));
    return data;
  }
  public async getUserById(id: number): Promise<IUser> {
    const result = await this.userRepository.getUserById(id);
    return result.data;
  }
  public async getAllAdmin(): Promise<IUser[]> {
    const result = await this.userRepository.getAllUsers();
    const admin = result.data.filter((user: IUser) => user.role !== 2);
    return admin;
  }
  public async getAdminById(id: number): Promise<IUser> {
    const result = await this.userRepository.getAdminById(id);
    return result.data;
  }
  public async active(id:number) {
    const userNeed = await this.userRepository.getUserById(id)
    const user = userNeed.data
    const newUser = {...user, status: true}
    await this.userRepository.patchUserById(id, newUser.status)
  }
  public async block(id:number) {
    const userNeed = await this.userRepository.getUserById(id)
    const user = userNeed.data
    const newUser = {...user, status: false}
    await this.userRepository.patchUserById(id, newUser.status)
  }
  public async register(formRequest: IUser): Promise<any> {
    try {
      return await this.userRepository.register(formRequest);
    } catch (error) {
      throw error;
    }
  }
  public async deleteAdmin (id:number){
    await this.userRepository.deleteAdmin(id)
  }
  public async searchUsers(value:string): Promise<IUser[]>{
    const users = await this.getAllUsers()
    const userNeed:IUser[] = users.filter((user) => user.fullName.toLowerCase().includes(value))
    return userNeed
  }
}

export default UserService;
