import { Link, useLocation } from "react-router-dom";
import About from "../about/about";
import Sale from "../sale/sale";
import "./home.css";
import { useEffect } from "react";
import { notifySuccess } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Home = (): JSX.Element => {
  const idUser = localStorage.getItem("idUser") as string;

  const location = useLocation();

  useEffect(() => {
    if (location.state === "login" && idUser) {
      notifySuccess(`Welcome to 1990 Bakery`);
    }
    if (location.state === "logout" && !idUser) {
      notifySuccess("Logout Success");
    }
  }, [location]);

  return (
    <main className="homeMain">
      <ToastContainer />
      <section className="home item__active active">
        <div className="homeOverlay">
          <img
            src="https://toppng.com/uploads/preview/image-library-library-cupcake-birthday-cake-torte-simple-bakery-cupcake-logo-11562961286zthqttjrf1.png"
            alt=""
          />
          <h4>Sweet and tasty</h4>
          <h1>A taste of the good life</h1>
          <p>
            We are proud to say that Bakery Store offers all of your bakery. We
            handcrafted bakery made with quality ingredients. Once you try our
            delicious bakery, we know you will be coming back for more.
          </p>
          <Link to={"/products"} className="btn__big">
            SHOP NOW
          </Link>
        </div>
      </section>
      <Sale />
      <About />
    </main>
  );
};

export default Home;
