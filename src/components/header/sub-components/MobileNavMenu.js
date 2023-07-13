import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserDetails } from "../../../apis/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MobileNavMenu = () => {
  const { t } = useTranslation();


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

  useEffect(() => {
    getUserInformation()
}, [])

const userLogout = (e) => {
  e.preventDefault();
  Cookies.remove('TID');
  Cookies.remove('name');
  navigate("/")

}



  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>
          
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/cart"}>
            {t("cart")}
          </Link>
        </li>
        {userFirstName ? (
        <>
        <li>
          <Link to={process.env.PUBLIC_URL + "/my-account"}>
            {t("my_account")}
          </Link>
        </li>
        <li onClick={userLogout}>
              <Link>Logout</Link>
            </li>
        </>  
        ) : (
<li>
          <Link to={process.env.PUBLIC_URL + "/login-register"}>
            {t("login")}
          </Link>
        </li>
        )

        }
        
    
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
