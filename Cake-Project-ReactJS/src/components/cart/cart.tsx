import { Link, useNavigate } from "react-router-dom";
import CartList from "../cartList/cartList";
import PopUp from "../popUp/popUp";
import "./cart.css";
import { useEffect, useMemo, useState } from "react";
import UserService from "../../services/users.service";
import { ICart } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import { useSelector } from "react-redux";
import { notifyWarning } from "../../common/toastify";

const Cart = (): JSX.Element => {
  const [total, setTotal] = useState<number>(0);
  const idUser = localStorage.getItem("idUser") as string;
  const userService = new UserService();
  const status = useSelector((state: any) => state.update);

  let navigation = useNavigate();
  const toPayment = async () => {
    let result: any = await userService.getUserById(Number(idUser));
    let carts = result.data.cart;
    if (carts.length === 0) {
      notifyWarning("Cart is empty");
    } else {
      navigation("/payment");
    }
  };

  useEffect(() => {
    const getTotal = async () => {
      let result: any = await userService.getUserById(Number(idUser));
      let carts = result.data.cart;
      let price = carts.reduce(
        (init: number, cart: ICart) => init + cart.price * cart.quantity,
        0
      );
      setTotal(price);
    };
    getTotal();
  }, [status]);

  return (
    <div className="cart__container">
      <div className="cart__overlay">
        <PopUp />
        <main className="mainCart">
          <section className="cart__top">
            <div className="cart__top-title">
              <Link to={"/products"}>← Continue shopping</Link>
              <hr />
            </div>
            <div className="cart__top-products">
              <CartList />
              <div className="cart__top-voucher">
                <input placeholder="Voucher Code" type="text" />
                <button>Apply Voucher</button>
              </div>
            </div>
          </section>
          <section className="cart__bottom">
            <div className="cart__bottom-title">
              <hr />
              <h1>Cart Totals</h1>
            </div>
            <table cellSpacing={0}>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>tien</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className="total-price">{formatPrice(total)}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={toPayment}>Proceed to checkout</button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Cart;
