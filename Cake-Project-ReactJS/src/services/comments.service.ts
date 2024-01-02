import CommentRepository from "../repositories/comment.repositories";
import UserRepository from "../repositories/user.repositories";
import { IComment, IUser } from "../types/interface";

class CommentService {
  commentRepository: CommentRepository;
  userRepository: UserRepository;
  constructor() {
    this.commentRepository = new CommentRepository();
    this.userRepository = new UserRepository();
  }
  public async getComment(idProduct: number): Promise<any> {
    const dataComments: any = await this.commentRepository.getAllComments();
    const dataUsers: any = await this.userRepository.getAllUsers();
    const arrComments = dataComments.data.filter(
      (item: IComment) => item.idProduct === idProduct
    );
    const arrUsers = dataUsers.data;
    let arrUserNeed = arrUsers.reduce((result: any[], user: any) => {
      arrComments.forEach((comment: any) => {
        if (user.id == comment.idUser && !result.includes(user)) {
          result.push(user);
        }
      });
      return result;
    }, []);
    const arrCommentNeed = arrComments.reduce((result: any, item: IComment) => {
        arrUserNeed.forEach((element: IComment) => {
        if (item.idUser == element.id) {
          result.push({
            ...element,
            ...item,
          });
        }
      });
      return result;
    }, []);
    return arrCommentNeed;
  }
  public async postComment(comment: IComment) {
    return await this.commentRepository.postComment(comment);
  }
  public async deleteComment(id:number){
    return await this.commentRepository.deleteComment(id)
  }
}
export default CommentService;
