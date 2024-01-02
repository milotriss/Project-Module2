import "./login.css";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleLogin } from "../../store/reducers/user";

export interface Login {
  id?: number;
  email: string;
  password: string;
}
const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state === true) {
      notifySuccess("Register Success");
    }
  }, [location]);
  // const dispatch = useDispatch()
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let inputElement = e.target as HTMLInputElement;
    let fieldsetElement = inputElement.parentElement as HTMLElement;
    let legendElement = fieldsetElement.querySelector("legend") as HTMLElement;
    if (inputElement.value === "" || inputElement.value.trim() === "") {
      legendElement.innerText = "Please enter this field *";
      legendElement.style.color = "red";
      fieldsetElement.style.border = "1px solid red";
    }
  };
  const handleLoginForm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      notifyError("Please enter all fields");
    } else {
      const response = await dispatch(handleLogin(loginData) as any).unwrap();
      if (response?.status === 201 || response?.status === 200) {
        if (response.data.user.status === false) {
          notifyError("This account is Blocked, Hotline: 0934937974");
        } else {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("idUser", response.data.user.id);
          navigate("/", { state: "login" });
        }
      } else {
        if (response.response?.status === 400) {
          notifyError(response.response.data);
        }
      }
    }
  };
  return (
    <div className="login">
      <ToastContainer />
      <section className="login__overlay">
        <form className="signin">
          <div className="signin__left">
            <h1>sign in</h1>
            <div className="signin__import">
              <fieldset>
                <legend>Email</legend>
                <input
                  name="email"
                  onChange={handleChangeLogin}
                  onBlur={handleBlur}
                  id="email-signin"
                  placeholder="Your Email"
                  type="email"
                />
                <FaEnvelope className="iconLoginInput" />
              </fieldset>
              <fieldset>
                <legend>Password</legend>
                <input
                  name="password"
                  onChange={handleChangeLogin}
                  onBlur={handleBlur}
                  id="password-signin"
                  placeholder="Your Password"
                  type="password"
                />
                <FaLock className="iconLoginInput" />
              </fieldset>
              <button onClick={handleLoginForm}>sign in</button>
            </div>
            <div className="signin__or">
              <span />
              <p>or Sign In with</p>
              <span />
            </div>
            <div className="signin__with">
              <div className="signin__with-items">
                <button type="submit">
                  <FaFacebookF className="iconLogin" />
                </button>
              </div>
              <div className="signin__with-items">
                <button type="submit">
                  <FaInstagram className="iconLogin" />
                </button>
              </div>
              <div className="signin__with-items">
                <button type="submit">
                  <FaGoogle className="iconLogin" />
                </button>
              </div>
            </div>
          </div>
          <div className="signin__right">
            <div className="signin__right-overlay">
              <h1>Wellcome to</h1>
              <h2>1990 Bakery</h2>
              <Link to={"/register"}>Sign Up</Link>
              <Link to={"/"}>Home</Link>
              <p>Sign up now to take 25% discount</p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
