import React, { useContext } from "react";

import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";

import { CartContext } from "../../contexts/cartContext";

import "./CartDropDown.styless.scss";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>Go To Checkout</Button>
    </div>
  );
};

export default CartDropDown;
