import { formatPrice } from "../../common/formatPrice";
import { ICart } from "../../types/interface";
import "./historyDetails.css";

interface Props {
  ordersHistory: ICart[];
}
const HistoryDetails = (props: Props): JSX.Element => {
  return (
    <ul className="popup__history">
      {props.ordersHistory.map((item: ICart) => {
        return (
          <li key={item.id}>
            <img
              src={item.image}
              alt=""
            />
            <p>{item.name}</p>
            <span>{item.quantity}</span>
            <p>{formatPrice((item.quantity * item.price))}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default HistoryDetails;
