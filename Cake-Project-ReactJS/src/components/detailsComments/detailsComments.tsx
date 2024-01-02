import "./detailsComments.css";
import "react-toastify/dist/ReactToastify.css";
import CommentService from "../../services/comments.service";
import { Space, Rate } from "antd";
import { FaStar } from "react-icons/fa";
import { IComment, IRate } from "../../types/interface";
import { useParams } from "react-router-dom";
import { notifySuccess, notifyWarning } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import { Popconfirm } from "antd";
import { ChangeEvent, useEffect, useState, MouseEvent, useRef } from "react";
import RateService from "../../services/rate.service";

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const DetailsComments = (): JSX.Element => {
  const idUser = localStorage.getItem("idUser") as string;
  let param: any = useParams();
  let idProduct: number = param.id;
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.update);
  const [contents, setContents] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [rate, setRate] = useState<IRate>();
  const [value, setValue] = useState(3);

  let ref: any = useRef();
  let dateNow = new Date();
  let date =
    dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear();
  const formComment: IComment = {
    idUser: Number(idUser),
    idProduct: idProduct,
    content: contents,
    date: date,
  };
  const commentService = new CommentService();
  const rateService = new RateService();
  useEffect(() => {
    const getComments = async () => {
      const data: any = await commentService.getComment(idProduct);
      setComments(data.reverse());
    };
    getComments();
  }, [status]);
  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 200 && e.target.value.length >= 0) {
      setContents(e.target.value);
    }
  };
  const handlePostComment = async (e: MouseEvent<HTMLButtonElement>) => {
    if (contents.length === 0) {
      notifyWarning("Comment must be between 1 and 200 characters");
    } else {
      await commentService.postComment(formComment);
      setContents("");
      ref.current.focus();
      dispatch(update());
    }
  };

  const onHoverBtnComment = () => {
    if (!idUser) {
      notifyWarning("Please Login to Comment");
    }
  };
  const handleDeleteComment = async (idComment: number) => {
    await commentService.deleteComment(idComment);
    notifySuccess("Comment deleted");
    dispatch(update());
  };

  return (
    <div className="comments">
      <div className="commentEnter">
        <div className="textAndCount">
          <textarea
            ref={ref}
            onChange={handleComment}
            autoFocus
            draggable="false"
            placeholder="Enter your comments..."
            value={contents}
            name=""
          ></textarea>
          <span>{contents.length}/200</span>
        </div>
        <div className="rateAndCommentAction">
          {/* <Space style={{ color: "var(--primary)" }}>
            <Rate className="rateGroup" onChange={setValue} value={value} />
            {value ? (
              <span className="rateAction">
                Click to Rate
              </span>
            ) : (
              ""
            )}
          </Space> */}

          <button
            onMouseOver={onHoverBtnComment}
            disabled={!idUser ? true : false}
            onClick={handlePostComment}
          >
            Comment
          </button>
        </div>
      </div>
      <ul className="commentElements">
        {comments.length > 0 &&
          comments.map((item: any) => {
            return (
              <li key={item.id} className="commentElement">
                <img src={item.avatar} alt="" />
                <div className="commentInfo">
                  <div className="commentText">
                    <div className="nameWithRate">
                      <span>{item.fullName}</span>
                      <span
                        style={{
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        5 <FaStar style={{ color: "yellow" }} />
                      </span>
                    </div>
                    <p>{item.content}</p>
                  </div>
                  <div className="commentActions">
                    <span className="commentDate">{item.date}</span>
                    {item.idUser == idUser ? (
                      <Popconfirm
                        title="Delete this Comment"
                        description="Are you sure?"
                        onConfirm={() => handleDeleteComment(item.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <span className="commentDelete">delete</span>
                      </Popconfirm>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default DetailsComments;
