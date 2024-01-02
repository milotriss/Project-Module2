import "./about.css";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { SlSocialTwitter } from "react-icons/sl";
import { LuFacebook } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { LiaTelegramPlane } from "react-icons/lia";

const About = (): JSX.Element => {
  return (
    <section className="about item__active">
      <div className="overlay">
        <div className="about__top">
          <article className="about__us">
            <h1>ABOUT</h1>
            <ul className="middle">
              <li className="devide" />
              <li>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur nulla eius quidem deserunt, tenetur iste rem
                  impedit ipsam veniam ut blanditiis culpa doloribus asperiores
                  eum perferendis perspiciatis saepe dolore voluptas!
                </p>
              </li>
              <li className="devide" />
              <li>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsum perferendis quos cumque, quaerat quidem enim quas
                  blanditiis aperiam veniam ad iure, delectus odio ratione
                  debitis explicabo inventore assumenda magni in.
                </p>
              </li>
              <li className="devide" />
              <li>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati, dolore officia eum harum libero asperiores? Quam
                  minus obcaecati recusandae quos dicta et unde possimus odio
                  asperiores, suscipit eum eaque voluptatem!
                </p>
              </li>
            </ul>
            <ul className="bottom">
              <li>
                <h6>99999+</h6>
                <p>Sold</p>
              </li>
              <li>
                <h6>9999+</h6>
                <p>Event</p>
              </li>
              <li>
                <h6>999+</h6>
                <p>Comment</p>
              </li>
              <li>
                <h6>99+</h6>
                <p>Products</p>
              </li>
              <li>
                <h6>9+</h6>
                <p>Location</p>
              </li>
            </ul>
          </article>
          <section className="ourteam">
            <h1>OUR TEAM</h1>
            <div className="ourteam__group">
              <figure>
                <img src="./assets/images/cake/logo.JPG" alt="" />
                <figcaption>
                  <h3>FullName</h3>
                  <h4>Positions</h4>
                </figcaption>
              </figure>
              <figure>
                <img src="./assets/images/cake/logo2.JPG" alt="" />
                <figcaption>
                  <h3>FullName</h3>
                  <h4>Positions</h4>
                </figcaption>
              </figure>
              <figure>
                <img src="./assets/images/cake/logo.JPG" alt="" />
                <figcaption>
                  <h3>FullName</h3>
                  <h4>Positions</h4>
                </figcaption>
              </figure>
              <figure>
                <img src="./assets/images/cake/logo2.JPG" alt="" />
                <figcaption>
                  <h3>FullName</h3>
                  <h4>Positions</h4>
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
        <footer className="about__footer">
          <div className="about__footer-contact">
            <h1>1990 Bakery</h1>
            <p>13 Nguyen Huu Tho, Da Nang City, VIET NAM</p>
            <p>Tuesday - Sunday (8:00AM-6:00PM)</p>
            <span className="ab-icon">
            <IoMailOutline className="iconFooter"/>
              <p>1990Bakery@gmail.com</p>
            </span>
            <span className="ab-icon">
            <FiPhone className="iconFooter"/>
              <p>+84 0511 3999 999</p>
            </span>
          </div>
          <div className="about__footer-subcribe">
            <div className="about__footer-write">
              <input placeholder="Your Email" type="email" />
              <button type="submit">SUBCRIBE</button>
            </div>
            <div className="footer__icon">
            <BsInstagram className="iconFooterBrand"/>
            <SlSocialTwitter className="iconFooterBrand"/>
            <LuFacebook className="iconFooterBrand"/>
            <FiYoutube className="iconFooterBrand"/>
            <LiaTelegramPlane className="iconFooterBrand"/>
            </div>
            <p>© 2023 1990 Bakery. Design by Middray</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default About;
