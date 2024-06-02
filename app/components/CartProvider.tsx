"use client";

import { createContext, useEffect, useState } from "react";
import {
  CartContextType,
  CartDisplay,
  ContextCountry,
} from "../utils/interfaces";
import CartSidebar from "./CartSidebar";

export const CartContext = createContext<CartContextType>({
  cartLines: null,
  updateCartLines: () => {},
  showCart: false,
  setShowCart: (arg) => {},
  currencyList: [],
  currCurrency: null,
  setCurrency: () => null,
});

export function CartProvider({ context, children }: any) {
  const [cartLines, setCartLines] = useState<CartDisplay>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [currCurrency, setCurrency] = useState<ContextCountry>(context.country);
  const currencyList = context.availableCountries;

  // Call this after each cart update
  const updateCartLines = async () => {
    const cartid = localStorage.getItem("cartid");
    console.log(cartid)

    if (cartid != null) {
      const req = await fetch(`/api/getCart?cartId=${cartid}`, {
        method: "POST",
      }).then((res) => res.json());
      console.log(req);
      setCartLines(req.res.data.cart);
    }
  };

  useEffect(() => {
    updateCartLines();
  }, []);

  return (
    <CartContext.Provider
      value={{
        currencyList,
        currCurrency,
        setCurrency,
        cartLines,
        updateCartLines,
        showCart,
        setShowCart,
      }}
    >
      {children}
      <CartSidebar cartLines={cartLines}></CartSidebar>
    </CartContext.Provider>
  );
}
