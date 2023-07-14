import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
import { getUserDetails, userCartAddRemove } from "../../apis/api";
import { Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {

  const [userToken, setuserToken] = useState(Cookies.get("TID"))



  const [cart, setcart] = useState([]);
  const [cartspecific, setcartspecific] = useState(0);

  const navigate = useNavigate();


  const fetchCartData = () => {
    const token = Cookies.get("TID");
    if(token)
    getUserDetails(token).then((res) => {
          console.log("Res - ", res.data);
          if(!res.data.status){
            navigate("/login-register")
          }

          console.log("Cart - ", res.data.user.userCart);
          setcart(res.data.user.userCart);
          const qty = res.data.user.userCart.filter((p) => p.id === product._id);
          setcartspecific(qty[0].qty);
    }).catch((err) => {
          console.log("Error - ", err);
    })
  }

  const [fetchProduct, setfetchProduct] = useState(false);


  const [isLoading, setisLoading] = useState(false);
  const addProductToCart = (e) => {
    e.preventDefault();
    setisLoading(true);
    const token = Cookies.get("TID");
    if(token){
      console.log("Cart - ", cart === undefined);
      console.log(cart);
      const cartObject = {
        id: product._id,
        product: product,
        qty: 1
      }
      userCartAddRemove(cartObject,"Add",userToken).then((res) => {
        setfetchProduct(!fetchProduct)
        console.log(res);
        setisLoading(false);
      }).catch((error) => {
        console.log("Error - ", error);
      });
    }
    else{
        navigate("/login-register");
    }
  }

  const removeProductToCart = (e) => {
      e.preventDefault();
      setisLoading(true);
    const token = Cookies.get("TID");

      if(token){
      console.log("Cart - ", cart === undefined);
          console.log(cart);
          const cartObject = {
            id: product._id,
            product: product,
            qty: 1
          }
          userCartAddRemove(cartObject,"Rmv",userToken).then((res) => {
            setfetchProduct(!fetchProduct)
            console.log(res);
            setisLoading(false);
          }).catch((error) => {
            console.log("Error - ", error);
          });
        }
          else{
            navigate("/login-register");
        }
    }




  useEffect(() => {
      fetchCartData()
  }, [fetchProduct])
  


  return (
    <div className="product-details-content ml-70">
      <h2>{product.productName}</h2>
      <div className="product-details-price">
        {product.productDiscountPrice !== null ? (
          <Fragment>
            <span>{"₹" + product.productDiscountPrice}</span>{" "}
            <span className="old">
              {"₹" + product.productPrice}
            </span>
          </Fragment>
        ) : (
          <span>{"₹" + product.productPrice} </span>
        )}
      </div>
      {/* {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )} */}
      <div className="pro-details-list">
        <p>{product.productDescription}</p>
      </div>

      {isLoading ? (<p style={{
        textAlign:"center"
      }}>....</p>) : (
        <>
        
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
      }}
    >
 <Button
      onClick={(e) => addProductToCart(e, product)}
        style={{
          marginTop:5,
          width:'80%',
          borderRadius:1000,
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center'
        }}
        variant="contained"
        sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}
      >
            <AddIcon />
        </Button>


    </Box>
     
      <p style={{
        textAlign:'center'
      }}>
      {cartspecific}
      </p>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
      }}
    >
<Button
      onClick={(e) => removeProductToCart(e, product)}
        style={{
          marginTop:2,
          width:'80%',
          borderRadius:1000,
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center'
        }}
        variant="contained"
        sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}
      >
          <RemoveIcon />
        </Button>
    
      </Box>
      
    
      </>
    
      )

      }


     
      <div>
      {isLoading ? (
  <Button
  style={{
    marginTop:50,
    width:'100%'
  }}
  variant="contained"
  sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}
>
  Loading Cart
</Button>
      ) : (
  <Button
        style={{
          marginTop:50,
          width:'100%'
        }}
        variant="contained"
        sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}
        onClick={() => navigate("/cart")}
      >
        Add to Cart
      </Button>
      )

      }
      </div>
      {/* {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map(single => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  dispatch(addToCart({
                    ...product,
                    quantity: quantityCount,
                    selectedProductColor: selectedProductColor ? selectedProductColor : product.selectedProductColor ? product.selectedProductColor : null,
                    selectedProductSize: selectedProductSize ? selectedProductSize : product.selectedProductSize ? product.selectedProductSize : null
                  }))
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => dispatch(addToWishlist(product))}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => dispatch(addToCompare(product))}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
*/}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> 
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
