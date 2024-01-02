import "./historyDetail.css";
import HistoryDetails from "../historyDetails/historyDetails";
import { TfiBackLeft } from "react-icons/tfi";
import { useEffect, useState } from "react";
import OrderService from "../../services/orders.service";
import { ICart, IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";

interface Props {
  offHistoryDetail:Function
  id:number|undefined
}

const HistoryDetail = (props:Props): JSX.Element => {
  const idUser = localStorage.getItem("idUser");
  const [ordersHistory, setOrdersHistory] = useState<ICart[]>([]);
  const [order,setOrder] =useState<IOrder>();
  const orderService = new OrderService();
  // console.log(ordersHistory);
  
  useEffect(() => {
    const getOrder = async () => {
      const data:any = await orderService.getOrder(Number(idUser));
      let result = data.find((item:IOrder) => item.id === props.id)
      setOrdersHistory(result.orderDetails);
      setOrder(result)
    };
    getOrder();
  }, []);

  return (
    <div className="popup__list">
      <div className="popup__list-title">
        <TfiBackLeft onClick={() => props.offHistoryDetail()} className="iconPayment" />
        <h1>{order?.date}</h1>
      </div>
      <HistoryDetails ordersHistory={ordersHistory}/>
      <h2 className="order__total">{`Total: ${formatPrice(order?.totalPrice || 0)}`}</h2>
    </div>
  );
};
export default HistoryDetail;
