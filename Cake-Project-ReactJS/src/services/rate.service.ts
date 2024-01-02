import RateRepository from "../repositories/rate.repositories";
import { IRate } from "../types/interface";

class RateService {
  private rateRepository: RateRepository;
  constructor() {
    this.rateRepository = new RateRepository();
  }

  public async getRate<T>(): Promise<T> {
    let result:any = await this.rateRepository.getRate() as T
    return result.data;
  }

  public async postRate<T>(formRate:IRate): Promise<T>{
    return this.rateRepository.postRate(formRate);
  }
}

export default RateService;
