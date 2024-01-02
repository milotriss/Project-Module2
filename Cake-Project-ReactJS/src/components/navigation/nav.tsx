import "./nav.css"
import { TiThMenu } from "react-icons/ti";
import { GoHome } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { LuPartyPopper } from "react-icons/lu";
import { PiCakeLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  return (
    <nav id="nav">
      <div className="menu">
        <TiThMenu className="iconNav" />
      </div>
      <div className="nav__top">
        <ul>
          <li>
            <Link to={'/'}>
              <GoHome className="iconNavTop" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to={'/location'}>
              <FaLocationArrow className="iconNavTop" />
              <span>Location</span>
            </Link>
          </li>
          <li>
            <Link to={'/products'}>
              <MdStorefront className="iconNavTop" />
              <span>Shop</span>
            </Link>
          </li>
          <li>
            <Link to={'/event'}>
              <LuPartyPopper className="iconNavTop" />
              <span>Event</span>
            </Link>
          </li>
          <li>
            <Link to={'/workshop'}>
              <PiCakeLight className="iconNavTop" />
              <span>Workshop</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav__bottom">
        <button type="submit">
          <FaLanguage className="iconNavBottom" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
