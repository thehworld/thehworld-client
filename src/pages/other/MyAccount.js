import { Fragment, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom"; 
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getUserDetails, orderProblemMyAccount } from "../../apis/api";
import Cookies from "js-cookie";
import { useState } from "react";

import Avatar from 'react-avatar';
import { AvatarGroup } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';



const MyAccount = () => {
  let { pathname } = useLocation();


  const [user, setuser] = useState([]);
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmailId, setuserEmailId] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userWAPhone, setuserWAPhone] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [userOrders, setuserOrders] = useState([]);
  const [userPincode, setuserPincode] = useState("");

  const [userAddress, setUserAddress] = useState("");


  const [isLoading, setisLoading] = useState(false);

  const getUserInformation = () => {
    const token = Cookies.get('TID');
    setisLoading(true);
    if(token){
      getUserDetails(token).then((res) => {
          toast("Fetching...")
          console.log("User Res - ", res);
          console.log("User Res - ", res.data.orders);
          
          setuser(res.data.user);
          setuserFirstName(res.data.user.userName);
          setuserLastName(res.data.user.userGoogleName);
          setuserEmailId(res.data.user.userEmail);
          setuserPhone(res.data.user.contactNumber);
          setuserWAPhone(res.data.user.contactWAForAuto);
          setuserWAPhone(res.data.user.contactWAForAuto);
          setuserLocation(res.data.user.userAddresses);
          setuserPincode(res.data.user.userAddressPincode);
          
          setisLoading(false);
          if(res.data.orders.length > 0){
            setuserOrders(res.data.orders);
          }

        }).catch((error) => {
          console.log("Error - ", error);
      })
    }
  }



  
  useEffect(() => {
      getUserInformation()
  }, [])

const navigate = useNavigate();


  const userLogout = (e) => {
    e.preventDefault();
    Cookies.remove('TID');
    Cookies.remove('name');
    navigate("/")
  }


  const orderProblem = (e, order) => {
      e.preventDefault();
      orderProblemMyAccount({order}).then((res) => {
        console.log("Order Problem - ", res);
      }).catch((err) => {
        console.log("Error - ", err);
      });
  }

  return (
    <Fragment>
      <SEO
        titleTemplate={"My Account " + user.userName}
        description=""
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]} 
        /> */}
        <div  style={{
          alignContent:'center'
        }}>
        <h3 style={{textAlign: "center", marginTop: "20px"}}>hi {userFirstName}</h3>
        {/* <img alt={user.userGoogleName} src={user.userProfilePic}/> */}
        </div>
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your <b>{user.userName}</b> account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text" value={userFirstName ? userFirstName: ""} onChange={(e) => setuserFirstName(e.target.value)}/>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" value={userLastName ? userLastName: ""} onChange={(e) => setuserLastName(e.target.value)}/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input type="email" value={userEmailId ? userEmailId: ""} onChange={(e) => setuserEmailId(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input type="text" value={userPhone ? userPhone: ""} onChange={(e) => setuserPhone(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Phone WhatsApp</label>
                                  <input type="text" value={userWAPhone ? userWAPhone: ""} onChange={(e) => setuserWAPhone(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Location</label>
                                  <input type="text" value={userLocation ? userLocation: ""} onChange={(e) => setuserLocation(e.target.value)} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Pincode</label>
                                  <input type="text" value={userPincode ? userPincode: ""} onChange={(e) => setuserPincode(e.target.value)} />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Request Update</button>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={() => window.open(`https://web.whatsapp.com/send?phone=+919677641176&text=${encodeURI(`Hi H World Team - I'm ${userFirstName} (${user._id}) - I'm Having Issues with an Order, contact me`)}`)}>Request Issues in Order</button>
                              </div>
                            </div>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item>

{/* 
                    <Accordion.Item eventKey="1" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                          <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item> */}

                    <Accordion.Item eventKey="2" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                          <span>2 .</span> Your Order History and Status
                      </Accordion.Header>
                      {
                        console.log("userOrder -> ", userOrders)
                      }
                      <div>
                        {userOrders.length > 0 && userOrders.map((order, index) =>  (
 <Accordion.Body key={index}>
   {
    console.log(order)
  }
 <div className="myaccount-info-wrapper">
   <div className="account-info-wrapper">
     <h4>Order Id: {order.orderId}</h4>
   </div>
   <div className="entries-wrapper">
     <div className="row">
      {order.paymentResponse && order.paymentResponse.code === "PAYMENT_SUCCESS" &&  order.orderProduct.map((product, index) => {
          return(
            <>
 
             <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
         <div className="entries-info text-center">
           <p>{product.product.productName}</p>
           <p>{product.product.productDescription}</p>
           <p>Qty. {product.qty} Price.{product.product.productPrice}</p>
           <p>Total Price.{order.paymentTotal}</p>
         </div>
       </div>
       <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
         <div className="entries-edit-delete text-center">
          <Link to={`/orderstatus/${order._id}`} 
          >
           <button style={{padding: "5px"}}>Track Order</button>
           </Link>
          
           <button style={{padding: "5px"}} onClick={(e) => orderProblem(e, order)}>Order Problem</button>

         </div>
       </div>
            </>
          )  
      })

      }
      
     </div>
   </div>
   
 </div>
</Accordion.Body>
                        ) 
)}
                      </div>
                     
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0"}}>
        <button onClick={userLogout} className="logout-btn">Logout</button>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
