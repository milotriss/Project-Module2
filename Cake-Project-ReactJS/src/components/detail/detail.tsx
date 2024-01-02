import "./detail.css";
import { BsInstagram } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { LuFacebook } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "../../types/interface";
import ProductService from "../../services/products.service";
import { formatPrice } from "../../common/formatPrice";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/users.service";
import { useDispatch } from "react-redux";
import { update } from "../../store/reducers/update";

const Detail = (): JSX.Element => {
  const idUser: string = localStorage.getItem("idUser") as string;
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [quantity, setQuantity] = useState<string>("1");
  const userService = new UserService();
  const productService = new ProductService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let param: any = useParams();
  let idProduct: number = param.id;
  useEffect(() => {
    const getProducts = async () => {
      const result: any = await productService.getProductsById(idProduct);
      setProductDetail(result.data);
    };
    getProducts();
  }, []);

  const handleAddCartDetail = async (
    productDetail: IProduct | undefined,
    idUser: number,
    quantity: number
  ) => {
    if (idUser) {
      if (Number(productDetail?.stock) < quantity) {
        notifyWarning("Product is not enough to be added");
      } else {
        await userService.addToCartDetail(productDetail, idUser, quantity);
        dispatch(update());
        notifySuccess("Add Success");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="details">
      <div className="details__left">
        <img src={productDetail?.image} alt="" />
      </div>
      <div className="details__right">
        <h1>{productDetail?.name}</h1>
        <h6 style={{ fontFamily: '"Lobster Two", sans-serif' }}>
          {formatPrice(Number(productDetail?.price))}
        </h6>
        <p>
          <strong style={{ textTransform: "uppercase" }}>
            Product Description:
          </strong>{" "}
          <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Dolorum molestias, voluptas minus consequuntur dolorem placeat eum
          tenetur, amet at libero dolor. Rem cumque, eligendi ipsum dolores
          aliquam facere maxime ab!
        </p>
        <p>
          <strong style={{ textTransform: "uppercase" }}>Ingredient:</strong>{" "}
          <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
          ratione obcaecati, placeat architecto consequatur cumque saepe
          asperiores? Nulla facilis aliquid nisi ullam, ipsa asperiores. Soluta
          quasi necessitatibus quia accusantium. Omnis.
        </p>
        <span>{productDetail?.stock}</span>
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
        <div className="details__right-add">
          <button
            onClick={() =>
              handleAddCartDetail(
                productDetail,
                Number(idUser),
                Number(quantity)
              )
            }
          >
            ADD+
          </button>
          <div className="details__right-quantity">
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.value === "") {
                  setQuantity("");
                } else {
                  if (e.target.value <= "0") {
                    notifyWarning("Quantity is from 1 or more");
                  } else {
                    setQuantity(e.target.value);
                  }
                }
              }}
              value={quantity}
              className="quantity-products"
              type="text"
            />
          </div>
        </div>
        <div className="details__right-brands">
          <BsInstagram className="iconDetailBrand" />
          <SlSocialTwitter className="iconDetailBrand" />
          <LuFacebook className="iconDetailBrand" />
          <FiYoutube className="iconDetailBrand" />
          <LiaTelegramPlane className="iconDetailBrand" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Detail;
