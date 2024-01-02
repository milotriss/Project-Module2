import React, { useEffect, useState } from "react";
import "./orderDetail.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ICart, IOrder } from "../../types/interface";
import OrderService from "../../services/orders.service";
import { formatPrice } from "../../common/formatPrice";
interface Props {
  offOrderDetails: Function;
  orderById: any;
}
const OrderDetail = (props: Props): JSX.Element => {
    
  return (
    <div className="orderDetailOverlay">
      <div className="orderDetail">
        <div className="orderDetailTitle">
          <h1>Order Detail</h1>
          <p>Total: {formatPrice(Number(props.orderById?.totalPrice))}</p>
          <AiOutlineCloseCircle
            className="iconClose"
            onClick={() => props.offOrderDetails()}
          />
        </div>
        <ul className="orderDetailList">
          {props.orderById?.orderDetails.length > 0 &&
            props.orderById?.orderDetails.map((item: ICart) => {
              return (
                <li key={item.id}>
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>{formatPrice(item?.price * item?.quantity)}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetail;
