import "./location.css"
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const Location = (): JSX.Element => {
  return (
    <div className="bg__contact">
      <div className="overlay">
        <header className="headerLocation">
          <Link to={'/'} className="back">
            <i className="fa-solid fa-caret-left" />
            Back To Home
          </Link>
          <img
            src="https://toppng.com/uploads/preview/image-library-library-cupcake-birthday-cake-torte-simple-bakery-cupcake-logo-11562961286zthqttjrf1.png"
            alt=""
          />
        </header>
        <main className="mainLocation">
          <section className="contact">
            <div className="contact__info">
              <h1>Contact Us</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
                quidem debitis nihil optio earum impedit beatae, vitae tempore
                neque ea molestiae dolores incidunt sint sequi perspiciatis
                eaque officiis quisquam mollitia!
              </p>
              <div className="contact__link">
                <div className="contact__link-items">          
                  <FaLocationDot className="iconLocation"/>            
                  <div className="contact__text">
                    <p>
                      <span>Primary: </span>35 Thai Thi Boi, Da Nang, Viet Nam
                    </p>
                    <p>
                      <span>Secondary: </span>35 Thai Thi Boi, Ha Noi, Viet Nam
                    </p>
                  </div>
                </div>
                <div className="contact__link-items">          
                  <FaPhone className="iconLocation"/>            
                  <div className="contact__text">
                    <p>
                      <span>Primary: </span>+84 999 999 999
                    </p>
                    <p>
                      <span>Secondary: </span>+84 989 898 989
                    </p>
                  </div>
                </div>
                <div className="contact__link-items">          
                  <IoMail className="iconLocation"/>            
                  <div className="contact__text">
                    <p>
                      <span>Primary: </span>1990Bakery@gmail.com
                    </p>
                    <p>
                      <span>Secondary: </span>1990Sweetscake@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact__subscribe">
                <p>
                  Subscribe for email ti enjoy complimentary shipping on your
                  first order and get the latest bakes, updates and special
                  offers.
                </p>
                <div className="contact__subscribe-input">
                  <input placeholder="Enter Your Email" type="email" />
                  <button type="submit">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.947537368453!2d108.19654471176113!3d16.06821198454699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218530293be19%3A0x13dba5800ca3f232!2zMzUgVGjDoWkgVGjhu4sgQsO0aSwgQ2jDrW5oIEdpw6FuLCBRLiBUaGFuaCBLaMOqLCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1698918342905!5m2!1svi!2s"
                width={600}
                height={450}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Location;
