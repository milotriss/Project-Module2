import "./register.css";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import UserService from "../../services/users.service";
import { notifyError } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../types/interface";

const Register = () => {
  const [registerData, setRegisterData] = useState<IUser>({
    fullName: "",
    email: "",
    password: "",
    confirm: "",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/learn-firebase-bd824.appspot.com/o/Nodata%2Fanh-meo-che-anh-meo-bua-17-09-00-01-36.jpg?alt=media&token=c5334804-ad6e-4b60-aabc-79f1337f3e7c",
    role: 2,
    status: true,
    phone: "",
    address: "",
    cart: [],
  });
  let { confirm, ...formData } = registerData;
  let navigate = useNavigate();
  useEffect(() => {
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,}$");
    const isValid = regex.test(registerData.email);
    const inputEmail = document.querySelector(
      "input[placeholder='Your Email']"
    ) as HTMLInputElement;
    const fieldsetEmail = inputEmail.parentElement as HTMLElement;
    const legendEmail = fieldsetEmail.querySelector("legend") as HTMLElement;
    const inputPassword = document.querySelector(
      "input[placeholder='Your Password']"
    ) as HTMLInputElement;
    const fieldsetPassword = inputPassword.parentElement as HTMLElement;
    const legendPassword = fieldsetPassword.querySelector(
      "legend"
    ) as HTMLElement;
    const inputConfirm = document.querySelector(
      "input[placeholder='Confirm Your Password']"
    ) as HTMLInputElement;
    const fieldsetConfirm = inputConfirm.parentElement as HTMLElement;
    const legendConfirm = fieldsetConfirm.querySelector(
      "legend"
    ) as HTMLElement;
    if (inputPassword.value.length < 6 && inputPassword.value.length > 0) {
      legendPassword.innerText = "Too Short";
      legendPassword.style.color = "red";
      fieldsetPassword.style.border = "1px solid red";
    }
    if (inputPassword.value.length > 16) {
      legendPassword.innerText = "Too Long";
      legendPassword.style.color = "red";
      fieldsetPassword.style.border = "1px solid red";
    }
    if (inputPassword.value !== inputConfirm.value) {
      legendConfirm.innerText = "Incorrect Password";
      legendConfirm.style.color = "red";
      fieldsetConfirm.style.border = "1px solid red";
    }
    if (!isValid && inputEmail.value.length > 0) {
      legendEmail.innerText = "Incorrect Syntax";
      legendEmail.style.color = "red";
      fieldsetEmail.style.border = "1px solid red";
    }
  }, [registerData]);
  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
    let inputElement = e.target as HTMLInputElement;
    let fieldsetElement = inputElement.parentElement as HTMLElement;
    let legendElement = fieldsetElement.querySelector("legend") as HTMLElement;
    let placeholderValue: string = inputElement.placeholder;
    if (inputElement.value === "" || inputElement.value.trim() === "") {
      legendElement.innerText = "Please enter this field *";
      legendElement.style.color = "red";
      fieldsetElement.style.border = "1px solid red";
    } else {
      legendElement.innerText = `${placeholderValue} *`;
      legendElement.style.color = "#000";
      fieldsetElement.style.border = "1px solid #000";
    }
  };

  const handleBlurInput = (e: ChangeEvent<HTMLInputElement>) => {
    let inputElement = e.target as HTMLInputElement;
    let fieldsetElement = inputElement.parentElement as HTMLElement;
    let legendElement = fieldsetElement.querySelector("legend") as HTMLElement;
    if (inputElement.value === "" || inputElement.value.trim() === "") {
      legendElement.innerText = "Please enter this field *";
      legendElement.style.color = "red";
      fieldsetElement.style.border = "1px solid red";
    }
  };
  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      registerData.fullName === "" ||
      registerData.email === "" ||
      registerData.password === "" ||
      registerData.confirm === ""
    ) {
      notifyError("Please enter all fields");
    } else {
      try {
        const userService = new UserService();
        const response = await userService.register(formData);
        if (response.status === 201) {
          navigate("/login", { state: true });
        }
      } catch (error: any) {
        notifyError(error.response.data);
      }
    }
  };
  return (
    <div className="register">
      <section className="register__overlay">
        <ToastContainer />
        <form id="signup" className="signup">
          <div className="signup__left">
            <div className="signup__left-overlay">
              <h1>join with</h1>
              <h2>1990 Bakery's Family</h2>
              <Link to={"/login"}>Sign In</Link>
              <Link to={"/"}>Home</Link>
              <p>
                Create a new account to fully enjoy our flavors and services
              </p>
            </div>
          </div>
          <div className="signup__right">
            <h1>creat account</h1>
            <div className="signup__import">
              <fieldset>
                <legend>Name *</legend>
                <input
                  name="fullName"
                  value={registerData.fullName}
                  onBlur={handleBlurInput}
                  onChange={handleFormData}
                  id="name-signup"
                  placeholder="Name"
                  type="text"
                />
                <FaUser className="iconRegisterInput" />
              </fieldset>
              <fieldset>
                <legend>Email *</legend>
                <input
                  name="email"
                  value={registerData.email}
                  onChange={handleFormData}
                  onBlur={handleBlurInput}
                  id="email-signup"
                  placeholder="Your Email"
                  type="email"
                />
                <FaEnvelope className="iconRegisterInput" />
              </fieldset>
              <fieldset>
                <legend>Password *</legend>
                <input
                  name="password"
                  value={registerData.password}
                  onChange={handleFormData}
                  onBlur={handleBlurInput}
                  id="password-signup"
                  placeholder="Your Password"
                  type="password"
                />
                <FaLock className="iconRegisterInput" />
              </fieldset>
              <fieldset>
                <legend>Confirm password *</legend>
                <input
                  name="confirm"
                  onChange={handleFormData}
                  onBlur={handleBlurInput}
                  id="confirm-password-signup"
                  placeholder="Confirm Your Password"
                  type="password"
                />
                <IoCheckmarkDoneSharp className="iconRegisterInput" />
              </fieldset>
              <button onClick={handleRegister}>creat account</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
