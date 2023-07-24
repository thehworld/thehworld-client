import * as React from 'react';
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getUserDetails, userOrderProductFromCart } from "../../apis/api";
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Checkout = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const navigate = useNavigate();
  
  const [userToken, setuserToken] = useState(Cookies.get("TID"))


  
  const [user, setuser] = useState([]);
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [userEmailId, setuserEmailId] = useState("");
  const [userPhone, setuserPhone] = useState("");
  const [userWAPhone, setuserWAPhone] = useState("");
  const [userLocation, setuserLocation] = useState("");
  const [userState, setuserState] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [userPincode, setuserPincode] = useState("");
  const [userOrderNote, setuserOrderNote] = useState("");
  const [userCityTown, setuserCityTown] = useState("");
  const [userAddressTwo, setuserAddressTwo] = useState("");
  const [userHome, setuserHome] = useState("");
  const [userPostalCode, setuserPostalCode] = useState("");
  const [userOrderNotes, setuserOrderNotes] = useState("");
  const [userOrderProduct, setuserOrderProduct] = useState([]);
  const [userPaymentOpions, setuserPaymentOpions] = useState("");


  const [userOrderSubTotal, setuserOrderSubTotal] = useState("");
  const [userOrderGrandTotal, setuserOrderGrandTotal] = useState("");
  const [userOrderisOffer, setuserOrderisOffer] = useState("");


  


  const [isLoading, setisLoading] = useState(false);

  const getUserInformation = () => {
    const token = Cookies.get('TID');
    setisLoading(true);
    if(token){
      getUserDetails(token).then((res) => {
          console.log("User Res - ", res);
          setuser(res.data.user);
          setuserFirstName(res.data.user.userName);
          setuserLastName(res.data.user.userGoogleName);
          setuserEmailId(res.data.user.userEmail);
          if(res.data.user.userAddresses.length > 0){
            let address_list = res.data.user.userAddresses;
            setuserAddress(address_list);
          }
          if(res.data.user.contactNumber ||
            res.data.user.contactWAForAuto ||
            res.data.user.userAddressPincode || 
            res.data.user.userState ||
            res.data.user.userHome ||
            res.data.user.userTown){
            setuserPhone(res.data.user.contactNumber);
            setuserWAPhone(res.data.user.contactWAForAuto);
            setuserPincode(res.data.user.userAddressPincode);
            setuserState(res.data.user.userState);
            setuserHome(res.data.user.userHome);
            setuserCityTown(res.data.user.userTown);
          }
          
          setuserLocation("");
          setisLoading(false);
        }).catch((error) => {
          console.log("Error - ", error);
      })
    }
  }


  useEffect(() => {
      getUserInformation()
  }, [])
  


  const getDiscountPrice = (price, discount) => {
    return discount && discount > 0 ? price - price * (discount / 100) : null;
  };
  

  const [cartItems, setcart] = useState([]);
  const [cartspecific, setcartspecific] = useState(0);

  const fetchCartData = () => {
    const token = Cookies.get("TID");
    if(token)
    getUserDetails(token).then((res) => {
          console.log("Res - ", res.data);
          console.log("Cart - ", res.data.user.userCart);
          setcart(res.data.user.userCart);
          setuserOrderProduct(res.data.user.userCart);
          
    }).catch((err) => {
          console.log("Error - ", err);
    })
  }


  useEffect(() => {
      fetchCartData()
  }, [])
  
  
  let cartTotalPrice = 0;
  

  useEffect(() => {
    let cartTotalPrice = 0;
    let cartSubTotalPrice = 0;
    cartItems.map((cartItem, index) => {
      cartTotalPrice += cartItem.product.productPrice * cartItem.qty
      cartSubTotalPrice += cartItem.product.productDiscountPrice * cartItem.qty
    });
    setuserOrderGrandTotal(cartTotalPrice);
    setuserOrderSubTotal(cartSubTotalPrice);
  }, [])
  

  const placeOrder = (e) => {
      e.preventDefault();
      const token = Cookies.get("TID");
      // if(token)
      // userOrderProductFromCart(,);
      // setcheckout(false);
      let cartTotalPrice = 0;
      let cartSubTotalPrice = 0;
      cartItems.map((cartItem, index) => {
        cartTotalPrice += cartItem.product.productPrice * cartItem.qty
        cartSubTotalPrice += cartItem.product.productDiscountPrice * cartItem.qty
      });
      setuserOrderGrandTotal(cartTotalPrice);
      setuserOrderSubTotal(cartSubTotalPrice);
      const data = {
            userFirstName,
            userLastName,
            userEmailId,
            userPhone,
            userWAPhone,
            userLocation,
            userState,
            userAddress,
            userAddressPincode: userPincode,
            userOrderNote,
            userTown:userCityTown,
            userAddressTwo,
            paymentOptions: userPaymentOpions,
            userHome,
            userOrderSubTotal :cartSubTotalPrice,
            userOrderGrandTotal: cartTotalPrice,
            userOrderisOffer,
            userOrderProduct
      }
      console.log(data);
      if(token){
        userOrderProductFromCart(data, token).then((res) => {
          console.log("Res - ", res);
          if(res.data){
            console.log("Res.data - ",res.data);
            console.log("Res.data - ",res.data.userRedirect);
            // navigate(res.data);
            if(res.data.userRedirect){
              navigate("/my-account");
            }
            else if(res.data.paymentObject){
              window.location.replace(res.data.paymentObject.data.instrumentResponse.redirectInfo.url);
            }
          }
        }).catch((error) => {
            console.log("Error - ", error);
        })
      }
    
  }


  const [checkout, setcheckout] = useState(false);


  const changePaymentOptions = (event) => {
    setuserPaymentOpions(event.target.value);   
  }
  
  if(checkout){
    return(
      <div style={{
        height:"100%",
        width:"100%"
      }}>
        
      <Box sx={{ minWidth: 120 }} style={{
          marginTop:220
      }}>
        <p style={{
          marginRight:15,
          marginLeft:15,
          fontWeight: 700
        }}>
            Pick Payment Options
        </p>
      <FormControl  style={{
            marginRight:15,
            marginLeft:15,
            width:"90%"
      }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Payment Options"
          onChange={changePaymentOptions}
        >
          <MenuItem value={'CARD'}>Card Payment</MenuItem>
          <MenuItem value={'COD'}>Cash on Delivery</MenuItem>
        </Select>
        <div className="place-order mt-25">
            <button className="btn-hover" onClick={(e) => placeOrder(e)}>Place Order</button>
        </div>
      </FormControl>
    </Box>
      </div>
    )
  }
else
  return (
    
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + "/chekout" }
          ]} 
        /> */}
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input value={userFirstName} onChange={(e) => setuserFirstName(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" value={userLastName} onChange={(e) => setuserLastName(e.target.value)}/>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Phone Number</label>
                          <input type="text" value={userPhone} onChange={(e) => setuserPhone(e.target.value)}/>
                        </div>
                      </div>
                     
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            value={userAddress} onChange={(e) => setuserAddress(e.target.value)}
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            value={userHome}
                            onChange={(e) => setuserHome(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" value={userCityTown} onChange={(e) => setuserCityTown(e.target.value) } />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                      <div className="billing-select mb-20">
                          <label>State</label>
                          <select value={userState} onChange={(e) => setuserState(e.target.value)}>
                            <option>Select a state</option>
                            <option>Tamil Nadu</option>
                            <option>Kerala</option>
                            <option>Karnataka</option>
                            <option>Gujarat</option>
                            <option>Uttar Pradesh</option>
                            <option>Rajasthan</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" value={userPincode} onChange={(e) => setuserPincode(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Whatsapp Phone</label>
                          <input type="number" value={userWAPhone} onChange={(e) => setuserWAPhone(e.target.value)}  />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" value={userEmailId} onChange={(e) => setuserEmailId(e.target.value)}/>
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Order notes"
                          name="message"
                          defaultValue={""}
                          value={userOrderNote}
                          onChange={(e) => setuserOrderNote(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                             cartItem.product.productDiscountPrice != null
                             ? (cartTotalPrice +=
                               cartItem.product.productDiscountPrice * cartItem.qty)
                             : (cartTotalPrice +=
                                 cartItem.product.productPrice * cartItem.qty);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.product.productName} X {cartItem.qty}
                                  </span>{" "}
                                  <span className="order-price">
                                    {cartItem.product.productDiscountPrice !== null
                                      ? "₹" +
                                        (
                                          cartItem.product.productDiscountPrice *
                                          cartItem.qty
                                        ).toFixed(2)
                                      : "₹" +
                                        (
                                          cartItem.product.productDiscountPrice * cartItem.qty
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>100</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Sub Total</li>
                            {cartTotalPrice.toFixed(2)}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">GST</li>
                            <li>{cartTotalPrice * 0.18}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            {cartTotalPrice + (cartTotalPrice * 0.18)}
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover" onClick={() => setcheckout(true)}>Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
