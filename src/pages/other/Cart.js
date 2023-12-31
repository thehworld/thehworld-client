import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation , useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, decreaseQuantity, deleteFromCart, deleteAllFromCart } from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { getUserDetails, makeStatusUpdateViewProduct, removeCartHere , userCartAddRemove } from "../../apis/api";
import Cookies from "js-cookie";

const Cart = () => {
  let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  let navigate = useNavigate();

  
  const [userToken, setuserToken] = useState(Cookies.get("TID"))



  const getDiscountPrice = (price, discount) => {
    return discount && discount > 0 ? price - price * (discount / 100) : null;
  };
  

  const [cartItems, setcart] = useState([]);
  const [cartspecific, setcartspecific] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

  const fetchCartData = () => {
    setIsLoading(true);
    const token = Cookies.get("TID");
    if(token)
    getUserDetails(token).then((res) => {
          console.log("Res - ", res.data);
          console.log("Cart - ", res.data.user.userCart);
          setcart(res.data.user.userCart);
          setIsLoading(false);
    }).catch((err) => {
          console.log("Error - ", err);
    })
  }


  

  const makeStatsUpdate = () => {
  
    makeStatusUpdateViewProduct().then((res) => {
        console.log("E-Commerce Views - ", res);
        
    }).catch((error) => {
        console.log("Error - ", error);
    })

  }


  const [cartRenderStatus, setcartRenderStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCartData()
    makeStatsUpdate()
}, [cartRenderStatus])


// const removeCartItems = (e,id) => {
//   e.preventDefault();
//   const token = Cookies.get("TID");
//   console.log("Remove Cart Here - ", id)
//   removeCartHere(id, token).then((res) => {
//         console.log("Remove Cart - ", res);
//         if(res.data.cartuser){
//           setcartRenderStatus(!cartRenderStatus);
//         }
//   }).catch((err) => {
//       console.log("Error - ", err)
//   })
// }
const removeCartItems = (e,product,id) => {
  e.preventDefault();
  UpdateproductQuantityInCart(product,0,id);

}

  const OnChangeProductQuantityIncart  =(e,product,Existingqty,id,functiontype)=>{
    // console.log("datas",product,Existingqty,id,functiontype)
        if("Add" === functiontype ){
            let calculateQuantity = Existingqty + 1 ; 
            UpdateproductQuantityInCart(product,calculateQuantity,id);
        }
        else{
            let calculateQuantity = Existingqty - 1 ; 
            UpdateproductQuantityInCart(product,calculateQuantity,id);
        }
  }

  const UpdateproductQuantityInCart = (product,qty,id) => {
    const token = Cookies.get("TID");
    if(token){
    if(qty >= 0){
      const cartObject = {
        id: product._id,
        product: product,
        qty: qty
      }
      userCartAddRemove(cartObject,"Add",userToken).then((res) => {
        fetchCartData();
        setIsLoading(false);
      }).catch((error) => {
        console.log("Error - ", error);
      });
    }
    else{
      setIsLoading(false);
    }
  }
    else{
        navigate("/login-register");
    }
  

  }



  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]} 
        /> */}
        {/* {console.log("Here Cart - ", cartItems)} */}
        <div className="cart-main-area pt-90 pb-100">
          {
            isLoading ? 
            <div style={{display: "flex", justifyContent: "center", alignItems: "center",minHeight:'80vh'}}>
             <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>     
          </div>
          :
          
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {

                            cartItem.product.productDiscountPrice != null
                              ? (cartTotalPrice +=
                                cartItem.product.productDiscountPrice * cartItem.qty)
                              : (cartTotalPrice +=
                                  cartItem.product.productPrice * cartItem.qty);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.product._id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItem.product.productImages[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.product._id
                                    }
                                  >
                                  {cartItem.product.productName}
                                  </Link>
                                  
                                </td>

                                <td className="product-price-cart">
                                  {cartItem.product.productPrice != 0 ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {"₹" +
                                          cartItem.product.productPrice}
                                      </span>{' - '}
                                      <span className="amount">
                                        {"₹" +
                                          cartItem.product.productDiscountPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {"₹" +
                                        cartItem.product.productDiscountPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={(e)=>OnChangeProductQuantityIncart(e,cartItem.product,cartItem.qty,cartItem.id,"Minus")}
                                       
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.qty}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={(e)=>OnChangeProductQuantityIncart(e,cartItem.product,cartItem.qty,cartItem.id,"Add")}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {cartItem.product.productDiscountPrice !== null
                                    ? "₹" +
                                      (
                                        cartItem.product.productDiscountPrice * cartItem.qty
                                      ).toFixed(2)
                                    : "₹" +
                                      (
                                        cartItem.product.productDiscountPrice * cartItem.qty
                                      ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  <button
                                      onClick={(e) => removeCartItems(e, cartItem.product ,cartItem.id)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="row mt-5">
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimate Shipping And Tax
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}


                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {"₹" + cartTotalPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {"₹" + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                  {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="code" value={offerCode} onChange={(e) => setofferCode(e.target.value)}/>
                          <button className="cart-btn-2" type="submit" onClick={(e) => applyOfferCode(e)}>
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                </div>
              </Fragment>
            ) : (
            
             
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            
            )}
          </div>
         }
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
