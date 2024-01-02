import React from "react";
import { Link } from "react-router-dom";
import "./notFoundLayout.css";
const NotFoundLayout = () => {
  return (
    <div className="notFoundLayout">
      <div className="notFoundContent">
        <h1>
          4
          <img src="../../../assets/images/cake2/burger.png" alt="" />4
        </h1>
        <p>NOT FOUND</p>
        <span>IDIOT!!! </span>
        <Link to={"/"}>Back GUY</Link>
      </div>
    </div>
  );
};

export default NotFoundLayout;
