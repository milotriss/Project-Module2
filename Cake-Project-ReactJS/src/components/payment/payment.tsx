import { useNavigate } from "react-router-dom";
import PaymentProducts from "../paymentProducts/paymentProducts";
import "./payment.css";
import { TfiBackLeft } from "react-icons/tfi";
import UserService from "../../services/users.service";
import { ChangeEvent, useEffect, useState } from "react";
import { ICart, IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import { notifyWarning } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popconfirm } from "antd";
import OrderService from "../../services/orders.service";
import ProductService from "../../services/products.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";

function Payment(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const userService = new UserService();
  const orderService = new OrderService();
  const productService = new ProductService();
  const [total, setTotal] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [formOrders, setFormOrders] = useState<IOrder>({
    idUser: Number(idUser),
    userName: "",
    phone: "",
    address: "",
    totalPrice: 0,
    status: 1,
    date: "",
    orderDetails: [],
  });
  console.log(formOrders);
  
  let dateNow = new Date();
  let date =
    dateNow.getDate() +
    "-" +
    (Number(dateNow.getMonth()) + 1) +
    "-" +
    dateNow.getFullYear();
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const backPayment = (): void => {
    navigation("/cart");
  };

  useEffect(() => {
    const getCart = async () => {
      const data: any = await userService.getUserById(Number(idUser));
      let carts: ICart[] = data.data.cart;
      let result = carts.reduce(
        (init: number, cart: ICart) => init + cart.quantity * cart.price,
        0
      );
      setName(data.data.fullName);
      setTotal(result);
      setFormOrders({
        ...formOrders,
        orderDetails: carts,
        userName: data.data.fullName,
        totalPrice: result,
        date: date,
      });
    };
    getCart();
  }, []);
  const handleFormOrders = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phone") {
      if (e.target.value.length > 10) {
        notifyWarning("Your phone number must 10 characters");
      } else {
        setFormOrders({
          ...formOrders,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setFormOrders({
        ...formOrders,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let inputElements = e.target;
    if (inputElements.value.length === 0) {
      inputElements.style.border = "1px solid red";
      inputElements.placeholder = "Please enter this filled";
    } else {
      inputElements.style.border = "1px solid var(--primary)";
      inputElements.placeholder = "";
    }
  };
  const handlePayment = async (formOrders: IOrder) => {
    console.log(123);
    
    if (formOrders.address.length === 0 && formOrders.phone.length === 0) {
      notifyWarning("Please enter all fields");
      // if (formOrders.phone.length > 10) {
      //   notifyWarning("Your phone must be at least 10 characters");
      // } 
    }else {
        await orderService.postOrder(formOrders);
        await userService.removeCarts(Number(idUser));
        await productService.onMinusStock(formOrders.orderDetails);
        dispatch(update());
        navigation("/histories", { state: true });
    }
  };
  return (
    <div className="backGroundPayment">
      <div className="overlayPayment">
        <section className="products__payment">
          <div className="products__payment-title">
            <TfiBackLeft onClick={backPayment} className="iconPayment" />
            <h1>Your Products</h1>
          </div>
          <PaymentProducts />
        </section>
        <form className="payment__info">
          <h1 id="name-user">{name}</h1>
          <div className="payment__info-items">
            <div>
              <input
                onBlur={handleBlur}
                onChange={handleFormOrders}
                name="address"
                value={formOrders.address}
                id="address"
                placeholder="Delivery address"
                type="text"
              />
              <input
                onBlur={handleBlur}
                onChange={handleFormOrders}
                value={formOrders.phone}
                name="phone"
                id="phone"
                placeholder="Your Phone"
                type="text"
              />
            </div>
            <p id="last-price">{formatPrice(total)}</p>
            <div>
              <span id="date">{date}</span>
              <span id="status-payment">Wait for confirmation</span>
            </div>
          </div>
          <Popconfirm
            title="CHECKOUT"
            description="Are you sure CHECKOUT?"
            onConfirm={() => handlePayment(formOrders)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btnPayment">COD Payment</Button>
          </Popconfirm>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Payment;
