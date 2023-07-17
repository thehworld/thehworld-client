import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../apis/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import Stack from '@mui/material';

const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);


  const navigate = useNavigate();

  const [user, setuser] = useState([]);
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmailId, setuserEmailId] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userLocation, setuserLocation] = useState("");
  
  const [cart, setcart] = useState([]);

  const [isLoading, setisLoading] = useState(false);

  const getUserInformation = () => {
    const token = Cookies.get('TID');
    setisLoading(true);
    if(token){
      getUserDetails(token).then((res) => {
          setuser(res.data.user);
          setuserFirstName(res.data.user.userName);
          setuserLastName(res.data.user.userGoogleName);
          setuserEmailId(res.data.user.userEmail);
          setuserLocation("");
          setcart(res.data.user.userCart);
          setisLoading(false);
        }).catch((error) => {
          console.log("Error - ", error);
      })
    }
  }

  const userLogout = (e) => {
    e.preventDefault();
    Cookies.remove('TID');
    Cookies.remove('name');
    toast("Miss you!!!");
    navigate("/")

  }


  useEffect(() => {
      getUserInformation()
  }, [])

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
  
  



  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      {/* <div className="same-style account-setting d-none d-lg-block">
          <button
            className="account-setting-active"
            onClick={e => handleClick(e)}
          >
            <i className="pe-7s-user-female" />
          </button>
          <div className="account-dropdown">
            <ul>
              {userFirstName ? (
                <>
                <li onClick={userLogout}>
                <Link>Logout</Link>
              </li>
              <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
            </>
              ) : (
                <>
              <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>  
            <li>
            <Link to={process.env.PUBLIC_URL + "/login-register"}>
              Register
            </Link>
          </li>
          </>
              )

              }
              
              
            
          </ul>
        </div> */}
      {/* </div> */}
      {/* <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style header-wishlist">
        
          {userFirstName ? (
            <Link to={process.env.PUBLIC_URL + "/my-account"}>
            <Avatar {...stringAvatar(`${userFirstName}`)} className="avatar-i"/>
            </Link>

          ):(
            <Link to={process.env.PUBLIC_URL + "/login-register"} className="avatar-i">
            <Avatar>?</Avatar>
             </Link>

          )}
          
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
      <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>

        <button className="icon-cart">
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cart && cart.length ? cart.length : 0}
          </span>
        </button>
        </Link>
        {/* <MenuCart /> */}
      </div>
      {cart.length > 0 ? (
          <div className="same-style cart-wrap d-block d-lg-none">
            <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
              <i className="pe-7s-shopbag" />
              <span className="count-style">
              {cart && cart.length ? cart.length : 0}
              </span>
            </Link>
          </div>
      ) : (
          null
      )

      }
      
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
