import React, { Fragment, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { Link, useLocation, redirect, Navigate, useNavigate  } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { userIsAuth, userSignup } from "../../apis/api";
import Cookies from "js-cookie";


const LoginRegister = () => {
  let { pathname } = useLocation();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  


  // Register User Here

  const [userRName, setUserRName] = useState("");
  const [userRPassword, setUserRPassword] = useState("");
  const [userREmail, setUserREmail] = useState("");

  const [isRLoading, setIsRLoading] = useState(false);
  const [isRError, setIsRError] = useState(false);

  const navigate = useNavigate();

  const userLoginSubmit = (e) => {
    e.preventDefault();

  }


  const checkUserIsAuth = async() => {
    const token = await Cookies.get("TID");
    if(token)
    userIsAuth(token).then((res) => {  
        console.log("User Res - ", res);
        if(res.data.status && res.data.user){
            navigate("/")
        }

    }).catch((error) => {
        console.log("Error - ", error);
    })
  }

  useEffect(() => {
    checkUserIsAuth();
  }, [])
  


  const userAuthHere = (user) => {
    console.log("User on: ", user);
    if(!user){
      return 1;
    }
    userSignup(user).then((res) => {
      console.log('User Signup',res);
      if(res.data.token){
        Cookies.set("TID",res.data.token); 
        navigate("/")
      }
    }).catch((err) => {
        console.log('Error - ', err); 
    })
  }



  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login Register", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
       
        <GoogleLogin
  onSuccess={credentialResponse => {
    console.log("credentialResponse", credentialResponse);
    var token = credentialResponse.credential;
    var decoded = jwt_decode(token);
    console.log("User Data - ", decoded);
    userAuthHere(decoded)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
