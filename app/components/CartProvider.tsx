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
  currCurrency: {
    currency: {
      isoCode: '',
      name: '',
      symbol: '',
    },
    isoCode: '',
    name: '',
    unitSystem: '',
  },
  setCurrency: () => null,
});

export function CartProvider({ context, children }: any) {
  const [cartLines, setCartLines] = useState<CartDisplay>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [currCurrency, setCurrency] = useState<ContextCountry>(context.country);
  const currencyList = context.availableCountries;
  const [inFlight, setInFlight] = useState<boolean>(false);

  // Call this after each cart update
  const updateCartLines = async () => {
    const cartid = localStorage.getItem("cartid");

    if (cartid != null) {
      // console.log(currCurrency.isoCode);
      const req = await fetch(`/api/getCart?cartId=${cartid}&countryCode=${currCurrency.isoCode}`, {
        method: "POST",
      }).then((res) => res.json());
      setCartLines(req.res.data.cart);
    }
  };


  useEffect(() => {
    updateCartLines();
  }, []);

  useEffect(() => {
    const updateItems = async () => {
      const cartid = localStorage.getItem("cartid");
      // console.log(currCurrency)
      setInFlight(true);
      const req = await fetch( 
        `/api/updateBuyer?cartId=${cartid}&countryCode=${currCurrency.isoCode}`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      setInFlight(false);
      setCartLines(req.data)
    }
    if (currCurrency){
      updateItems()
    }
  }, [currCurrency])

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
