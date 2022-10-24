import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product to add
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found increment quantity
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === existingItem.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  // return new array when the array is empty
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find the existing item
  const itemToUpdate = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (itemToUpdate.quantity < 2)
    return cartItems.filter((cartItem) => cartItem.id !== itemToUpdate.id);

  // decrement the quantity
  return cartItems.map((cartItem) =>
    cartItem.id === itemToUpdate.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

const calculateCartCount = (cartItems) => {
  return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const calculateTotalPrice = (cartItems) =>
  cartItems.reduce((total, acc) => {
    return (total += acc.quantity * acc.price);
  }, 0);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteCartItem: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartCount(calculateCartCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteCartItem = (productToDelete) => {
    setCartItems(deleteItem(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    deleteCartItem,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
