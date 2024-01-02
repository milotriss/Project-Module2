import ApiService from "../api/api.service";
import { IComment } from "../types/interface";

class CommentRepository {
    private apiService : ApiService
    constructor(){
        this.apiService = new ApiService()
    }
    async getAllComments():Promise<any>{
        let result = await this.apiService.GetAll("comments")
        return result
    }
    async postComment(comment:IComment){
        await this.apiService.Post('comments', comment)
    }
    async deleteComment(id:number) {
        await this.apiService.Delete('comments',id)
    }
}
export default CommentRepository