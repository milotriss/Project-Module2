import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { FaUserFriends } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuClipboardEdit } from "react-icons/lu";
import { SlSocialDropbox } from "react-icons/sl";
import StackedAreaChart from "../charts/chart";
import { useLocation } from "react-router-dom";
import { notifySuccess } from "../../common/toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/users.service";
import ProductService from "../../services/products.service";
import OrderService from "../../services/orders.service";
import { IOrder, IProduct, IUser } from "../../types/interface";
import { useSelector } from "react-redux";
import { formatPrice } from "../../common/formatPrice";

const Dashboard = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [revenues, setRevenue] = useState<number>(0);
  const [admin, setAdmin] = useState<IUser>();
  const idAdmin = localStorage.getItem("idAdmin");
  const status = useSelector((state: any) => state.update);
  const userService = new UserService();
  const productService = new ProductService();
  const orderService = new OrderService();
  let location: any = useLocation();

  useEffect(() => {
    const getValue = async () => {
      const user = await userService.getAllUsers();
      const product = await productService.getAllProducts();
      const order = await orderService.getAllOrders();
      const revenue = await orderService.revenue();
      const admin = await userService.getAdminById(Number(idAdmin));
      setUsers(user);
      setProducts(product);
      setOrders(order);
      setRevenue(revenue);
      setAdmin(admin);
    };
    getValue();
  }, [status]);
  useEffect(() => {
    if (location.state?.role === 3) {
      notifySuccess(`Welcome Admin ${location.state.fullName}`);
    }
    if (location.state?.role === 1) {
      notifySuccess(`Welcome Moderator ${location.state.fullName}`);
    }
  }, []);
  return (
    <section className="dashboard">
      <div className="dashboardGrid">
        <div className="dashboardUsers dashboardItems">
          <div className="dashboardUsersInfo">
            <div className="text">
              <p>Total Users</p>
              <span>{users.length} Users</span>
            </div>
            <FaUserFriends className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardRevenue dashboardItems">
          <div className="dashboardRevenueInfo">
            <div className="text">
              <p>Total Revenue</p>
              <span>{formatPrice(revenues)}</span>
            </div>
            <GiTakeMyMoney className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardProducts dashboardItems">
          <div className="dashboardProductsInfo">
            <div className="text">
              <p>Total Products</p>
              <span>{products.length} Products</span>
            </div>
            <SlSocialDropbox className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
        <div className="dashboardOrders dashboardItems">
          <div className="dashboardOrdersInfo">
            <div className="text">
              <p>Total Orders</p>
              <span>{orders.length} Orders</span>
            </div>
            <LuClipboardEdit className="iconDashboard" />
          </div>
          <div className="mountain"></div>
        </div>
      </div>
      <div className="dashboardChart">
        <StackedAreaChart />
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
