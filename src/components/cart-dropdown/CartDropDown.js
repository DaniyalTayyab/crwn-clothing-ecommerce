import React from "react";

import Button from "../button/Button";

import "./CartDropDown.styless.scss";

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>Go To Checkout</Button>
    </div>
  );
};

export default CartDropDown;
