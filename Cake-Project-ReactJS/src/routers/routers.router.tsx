import React from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "../layouts/defaultLayout/defaultLayout";
import Home from "../components/home/home";
import Products from "../components/products/products";
import Details from "../components/details/details";
import Location from "../components/location/location";
import Cart from "../components/cart/cart";
import Histories from "../components/histories/histories";
import Payment from "../components/payment/payment";
import Login from "../components/login/login";
import Register from "../components/register/register";
import NotFoundLayout from "../layouts/notFoundLayout/notFoundLayout";
import PrivateRouter from "./private.router";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout son={<Home />} />} />
        <Route
          path="/products"
          element={<DefaultLayout son={<Products />} />}
        />
        <Route
          path="/detail/:id"
          element={<DefaultLayout son={<Details />} />}
        />
        <Route path="/location" element={<Location />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouter />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/histories" element={<Histories />} />
        </Route>
        <Route path="*" element={<NotFoundLayout />} />
      </Routes>
    </>
  );
};

export default Routers;
