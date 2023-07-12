import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice"

const MenuCart = () => {
  const location = useLocation();
  const { cartItems } = location.state;
  if(cartItems)
  console.log("cartItems - ", cartItems);
  return (
    <div className="shopping-cart-content">
      {cartItems && cartItems.length > 0 ? (
       <>
        <p>
          dd
        </p>
       </>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
