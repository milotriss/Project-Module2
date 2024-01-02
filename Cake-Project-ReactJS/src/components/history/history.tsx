import "./history.css";
import { IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import { memo } from "react";

interface Props {
  handleHistoryDetail: Function;
  getId: Function;
  ordersHistory: IOrder[];
}
const History = (props: Props): JSX.Element => {
  
  return (
    <ul className="history__list">
      {props.ordersHistory.length > 0 &&
        props.ordersHistory.map((item: IOrder) => {
          const renderStatus = (status:any) => {
            switch (item.status) {
              case 1:
                status = "Pending...";
                break;
              case 2:
                status = "Shipping..."
                break;
              case 3:
                status = "Finished"
                break;
              }
              return status;
          };
          return (
            <li key={item.id}>
              <span>{item.date}</span>
              <button
                onClick={() => {
                  props.getId(item.id);
                  props.handleHistoryDetail();
                }}
              >
                Details Order
              </button>
              <span>{renderStatus(item.status)}</span>
              <p>{formatPrice(item.totalPrice)}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default History;
