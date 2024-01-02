import { FaTrashCan } from "react-icons/fa6";
import "./cartList.css";
import { useEffect, useState, MouseEvent } from "react";
import { ICart } from "../../types/interface";
import UserService from "../../services/users.service";
import { formatPrice } from "../../common/formatPrice";
import { notifyWarning } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";

function CartList() {
  const idUser = localStorage.getItem("idUser") as string;
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const userService = new UserService();
  const status = useSelector((state:any) => state.update)
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser: any = async () => {
      let user: any = await userService.getUserById(Number(idUser));
      setCartItems(user.data.cart);
    };
    getUser();
  }, [status]);

  const handlePlus = async (item: ICart, idUser: number) => {
    if (item.quantity >= item.stock) {
      notifyWarning("The quantity of product needed is lower");
    } else {
      await userService.onPlus(item, idUser);
      dispatch(update());
    }
  };
  const handleMinus = async (item: ICart, idUser: number) => {
    if (item.quantity <= 1) {
      notifyWarning("The minium number of products must be 1");
    } else {
      await userService.onMinus(item, idUser);
      dispatch(update());
    }
  };
  const handleDelete = async (item: ICart, idUser: number) => {
    message.success("Delete Success");
    await userService.onDelete(item, idUser);
    dispatch(update());
  };
  return (
    <ul className="list-cart">
      {cartItems.length === 0 ? (
        <img
          style={{ width:"100%", height:"100%", objectFit: "contain"}}
          src="https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Nodata%2FDaco_5212497.png?alt=media&token=06c6da9a-173c-41db-a3a4-13a11e92d37a"
          alt=""
        />
      ) : (
        cartItems.map((item: ICart) => {
          return (
            <li key={item.id}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <div className="cart__quantity">
                <span>{item.quantity}</span>
                <button onClick={() => handleMinus(item, Number(idUser))}>
                  -
                </button>
                <button onClick={() => handlePlus(item, Number(idUser))}>
                  +
                </button>
              </div>
              <p>{formatPrice(item.quantity * item.price)}</p>
              <Popconfirm
                title="Delete this product"
                description="Are you sure delete this product?"
                onConfirm={() => handleDelete(item, Number(idUser))}
                okText="Yes"
                cancelText="No"
              >
                <FaTrashCan className="iconRecycle" />
              </Popconfirm>
            </li>
          );
        })
      )}
      <ToastContainer />
    </ul>
  );
}

export default CartList;
