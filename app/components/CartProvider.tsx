'use client'

import { createContext, useEffect, useState } from "react"
import { CartDisplay } from "../utils/interfaces";
import CartSidebar from "../cart/CartSidebar";

interface CartContextType{
    cartLines: any,
    updateCartLines: any
    showCart: boolean,
    setShowCart: any,
}

export const CartContext = createContext<CartContextType>({cartLines: null, updateCartLines: null, showCart: false, setShowCart: null})


export function CartProvider({children}: any){

    const [cartLines, setCartLines] = useState<CartDisplay>();
    const [showCart, setShowCart] = useState<boolean>(false);


    // Call this after each cart update
    const updateCartLines = async() => {
        // If Cookie cartId exists
        if (false){
            const req = await fetch(`/api/getCart?cartId=${'gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhRRjIzMjVTVFRSN0dNODgzSENEVFJW'}`, {
                method: "POST",
            })
            .then((res) => res.json());
            setCartLines(req.res.data.cart)
            console.log('updating cart');
        }
    }

    // useEffect(() => {
    //     updateCartLines();
    // }, [])

    return (
        <CartContext.Provider value={{cartLines, updateCartLines, showCart, setShowCart}}>

            {children}
            <CartSidebar cartLines={cartLines}></CartSidebar>
        </CartContext.Provider>
    )
}