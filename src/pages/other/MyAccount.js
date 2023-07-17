import { Fragment, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getUserDetails } from "../../apis/api";
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
  const [userLocation, setuserLocation] = useState("");
  const [userOrders, setuserOrders] = useState([]);

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
          setuserLocation("");
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
  

  return (
    <Fragment>
      <SEO
        titleTemplate={"My Account " + user.userName}
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
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
                                  <input type="text" />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Location</label>
                                  <input type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Update</button>
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
      {order.orderProduct.map((product, index) => {
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
           <button className="edit">Track Order</button>
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
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
