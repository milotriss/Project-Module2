import { useNavigate } from "react-router-dom";
import "./product.css";
import { IProduct } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import { FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/users.service";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";

interface Props {
  productsData: IProduct[];
}

const Product = (props: Props): JSX.Element => {
  const idUser: string = localStorage.getItem("idUser") as string;
  const userService = new UserService();
  const dispatch = useDispatch()
  let navigation = useNavigate();
  const toDetails = (id: number | undefined): void => {
    navigation("/detail/" + id);
  };
  const handleAddCart = async (idUser: number, itemProduct: IProduct) => {
    if (idUser) {
      if (itemProduct.stock < 1) {
        notifyError("Product is not enough to be added");
      } else {
        await userService.addToCart(idUser, itemProduct);
        dispatch(update())
        notifySuccess("Add Success");
      }
    } else {
      navigation("/login");
    }
  };
  return (
    <section id="products__items">
      {props.productsData.length > 0 && props.productsData.map((item: IProduct) => {
        return (
          <figure key={item.id}>
            <img onClick={() => toDetails(item.id)} src={item.image} alt="" />
            <figcaption>
              <h1>{item.name}</h1>
              <p style={{ fontFamily: '"Lobster Two", sans-serif' }}>
                {formatPrice(item.price)}
              </p>

              <span>{item.stock}</span>

              <div className="details__add">
                <button onClick={() => handleAddCart(Number(idUser), item)}>
                  ADD+
                </button>
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
            </figcaption>
          </figure>
        );
      })}
      <ToastContainer />
    </section>
  );
};
export default Product;
