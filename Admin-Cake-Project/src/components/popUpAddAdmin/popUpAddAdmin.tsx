import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import "./popUpAddAdmin.css";
import "react-toastify/dist/ReactToastify.css";

import { IUser } from "../../types/interface";

import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import UserService from "../../services/users.service";
import { update } from "../../store/reducers/update";
import { Popconfirm } from "antd";


interface Props {
  offPopUpAdd:Function
}

const PopUpAddAdmin = (props:Props): JSX.Element => {
  const [user, setUser] = useState<IUser>({
    email: "",
    fullName: "",
    password: "",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Nodata%2Fanh-meo-che-anh-meo-bua-17-09-00-01-36.jpg?alt=media&token=c5334804-ad6e-4b60-aabc-79f1337f3e7c",
    role: 1,
    status: true,
    phone: "",
    address: "",
    cart: [],
  });

  const dispatch = useDispatch();

  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let inputElement = e.target;
    if (inputElement.value.length <= 0) {
      
      inputElement.style.border = "1px solid red";
      inputElement.placeholder = "Enter this field ";
    }
  };
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.target.value.length > 0) {
      e.target.style.border = "1px solid #fff"
    }else {
      e.target.style.border = "1px solid #fff" 
    }
  };
  const handleAddAdmin = async (e:any) => {
    if (user.email === "" || user.fullName === "" || user.password === "") {
      notifyError('Please enter all fields')
    }else {
      try {
        const userService = new UserService();
        const response = await userService.register(user);
        if (response.status === 201) {
          props.offPopUpAdd()
          dispatch(update())
          notifySuccess('Add Success')
        }
      } catch (error: any) {
        notifyError(error.response.data);
      }
    }
  }
  return (
    <section className="popUpAddAdminOverlay">
      <div className="popUpAddAdminModal">
        <div className="informationPopUpAddAdmin">
          <div className="namePopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={user.fullName}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              name="fullName"
              className="inputPopUpAddAdmin"
              placeholder="FullName"
              type="text"
            />
          </div>
          <div className="emailPopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={user.email}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              name="email"
              className="inputPopUpAddAdmin"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="phonePopUpAddAdmin itemPopUpAddAdmin">
            <input
              value={user.password}
              onChange={handleChangeInput}
              onBlur={handleOnBlur}
              className="inputPopUpAddAdmin"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
        <Popconfirm
            title="Update Products"
            description="Are you sure about this information?"
            onConfirm={handleAddAdmin}
            okText="Yes"
            cancelText="No"
          >
        <button onClick={handleAddAdmin}>ADD+</button>
          </Popconfirm>
        <button onClick={() => props.offPopUpAdd()}>ESC</button>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default PopUpAddAdmin;
