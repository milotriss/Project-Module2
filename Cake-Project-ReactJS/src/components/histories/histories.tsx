import { useNavigate } from "react-router-dom";
import History from "../history/history";
import HistoryDetail from "../historyDetail/historyDetail";
import "./histories.css";
import { TfiBackLeft } from "react-icons/tfi";
import { ChangeEvent, useEffect, useState } from "react";
import { IOrder } from "../../types/interface";
import OrderService from "../../services/orders.service";




const Histories = (): JSX.Element => {
  const idUser = localStorage.getItem("idUser");
  const [openHistoryDetail, setOpenHistoryDetail] = useState<boolean>(false)
  const [id,setId] = useState<number>()
  const [ordersHistory, setOrdersHistory] = useState<IOrder[]>([]);
  const [value, setValue] = useState<string>('')
  let navigation = useNavigate()
  const backHome = ():void => {
    navigation('/')
  }
  const handleHistoryDetail = ():void => {
    setOpenHistoryDetail(true)
  }
  const offHistoryDetail = ():void => {
    setOpenHistoryDetail(false)
  }
  const getId = (id:number):void =>{
    setId(id)
  }
  const orderService = new OrderService();
  useEffect(() => {
    const getAllOrder = async () => {
      const data = await orderService.getOrder(Number(idUser));
      setOrdersHistory(data);
    };
    getAllOrder();
  }, []);

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setValue(e.target.value)
    }else{
      setValue('')

    }
  };
  useEffect(() => {
    const getOrderSearch = async () => {
      const data = await orderService.onSearchOrders(value,Number(idUser))
      setOrdersHistory(data)
    }
    setTimeout(() => {
      getOrderSearch()
    }, 1000);
  },[value])
  return (
    <div className="historyBackGround">
      <main className="historyOverlay">
        <section className="history">
          <div className="history__title">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TfiBackLeft onClick={backHome} className="iconHistories" />
              <h1>Your History</h1>
            </div>
            <div className="search__order">
              <input
                onChange={handleSearch}
                value={value}
                placeholder="Search by Month"
                id="search__history"
                type="text"
              />
              <ul className="search-order"></ul>
            </div>
          </div>
          <History ordersHistory={ordersHistory} getId={getId} handleHistoryDetail={handleHistoryDetail}/>
        </section>
        {openHistoryDetail ?
        <HistoryDetail id={id} offHistoryDetail={offHistoryDetail}/> :
        null
        }
      </main>
    </div>
  );
};

export default Histories;
