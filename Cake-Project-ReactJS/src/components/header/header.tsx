import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { IoCaretDown } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useState, MouseEvent, useEffect } from "react";
import Profile from "../profile/profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/user";
import UserService from "../../services/users.service";
import { IUser } from "../../types/interface";

const Header = (): JSX.Element => {
  const [user, setUser] = useState<IUser>();
  const [count, setCount] = useState<number>(0);
  const [char, setChar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const idUser = localStorage.getItem("idUser") as string;
  const userService = new UserService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: any) => state.update);

  useEffect(() => {
    const getUser = async () => {
      if (idUser) {
        const data: any = await userService.getUserById(Number(idUser));
        let fullName: any = data.data.fullName;
        let lastName: string =
          fullName.split(" ")[fullName.split(" ").length - 1];
        let character: string = lastName.charAt(0);
        setUser(data.data);
        setCount(data.data.cart.length);
        setName(fullName);
        setChar(character);
      }
    };
    getUser();
  }, [status]);
  const [sup, setSup] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const navigation = useNavigate();
  const backHome = (): void => {
    navigation("/");
  };
  const handleToHistories = (): void => {
    navigation("/histories");
    setSup(false);
  };
  const handleToCart = (): void => {
    navigation("/cart");
  };
  const offProfile = (): void => {
    setProfile(false);
  };
  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    dispatch(logout());
    navigate("/", { state: "logout" });
  };
  return (
    <header className="headerMain">
      <img
        onClick={backHome}
        src="https://toppng.com/uploads/preview/image-library-library-cupcake-birthday-cake-torte-simple-bakery-cupcake-logo-11562961286zthqttjrf1.png"
        alt="logo"
      />
      {!idUser ? (
        <Link to={"/login"} className="login-btn">
          Login
        </Link>
      ) : (
        <div className="profiles">
          <div className="headerCart">
            <FaCartShopping onClick={handleToCart} className="iconHeaderCart" />
            <span className="headerCount">{count}</span>
          </div>
          <div className="profile">
            <img src={user?.avatar} alt="" />

            <p>{`Hi, ${name}`}</p>
            <div className="supProfileActions">
              <IoCaretDown
                onClick={() => setSup(!sup)}
                className="iconProfile"
              />
              {sup ? (
                <div className="supProfileGroup">
                  <span className="arrow"></span>
                  <ul className="supProfile">
                    <li onClick={handleToHistories}>History Orders</li>
                    <li
                      onClick={() => {
                        setSup(false);
                        setProfile(true);
                      }}
                    >
                      Profile
                    </li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {profile && <Profile offProfile={offProfile} />}
    </header>
  );
};

export default Header;
