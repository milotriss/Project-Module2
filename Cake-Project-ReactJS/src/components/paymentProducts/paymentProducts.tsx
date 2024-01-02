import { useEffect, useState } from "react";
import UserService from "../../services/users.service";
import { ICart } from "../../types/interface";
import "./paymentProducts.css";
import { formatPrice } from "../../common/formatPrice";

const PaymentProducts = () => {
  const idUser = localStorage.getItem("idUser");
  const userService = new UserService();
  const [carts, setCarts] = useState<ICart[]>([]);

  useEffect(() => {
    const getCart = async () => {
      const data: any = await userService.getUserById(Number(idUser));
      setCarts(data.data.cart);
    };
    getCart();
  }, []);
  return (
    <ul className="product__payment-items">
      {carts.map((cart: ICart) => {
        return (
          <li key={cart.id} className="product__payment-item">
            <img src={cart.image} alt="" />
            <p>{cart.name}</p>
            <span>{cart.quantity}</span>
            <span style={{ fontFamily: '"Lobster Two", sans-serif' }}>
              {formatPrice((cart.quantity * cart.price))}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default PaymentProducts;
