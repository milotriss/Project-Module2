import React, { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import './login.css'
import { notifyError, notifySuccess, notifyWarning } from "../../common/toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/users.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../types/interface";



export interface ILogin {
  id?: number;
  email: string;
  password: string;
}
const Login = (): JSX.Element => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const location = useLocation()
  const navigate = useNavigate();
  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value,
      })
  };

  useEffect(() => {
    if (location.state === true) {
      notifySuccess('Logout Success')
    }
  },[location])
  const handleLogin = async (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      notifyError("Please enter all fields");
    } else {
      try {
        const userService: UserService = new UserService();
        const response = await userService.login(loginData);
        if (response.data.user.role === 2) {
          notifyWarning('Not have access')
        }else{
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("idAdmin", response.data.user.id);
          navigate('/dashboard', {state: response.data.user})
        }
      } catch (error:any) {
        if (error.response?.status === 400) {
          notifyError(error.response.data)
        } 
      }
    }
  } 
  return (
    <div className="admin__login">
      <div className="admin__login-overlay">
        <form>
          <h1>1990 Bakery</h1>
          <input onChange={handleChangeLogin} value={loginData.email} name="email" id="email-admin" placeholder="Email" type="text" />
          <input onChange={handleChangeLogin} value={loginData.password} name="password" id="password-admin" placeholder="Password" type="password" />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
