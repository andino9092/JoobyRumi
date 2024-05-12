'use client'

import { useContext, useEffect, useRef, useState } from "react"
import CartItem from "./CartItem";
import { CartDisplay } from "../utils/interfaces";
import { CartContext } from "../components/CartProvider";


export default function CartSidebar(props: any){


    const {cartLines, updateCartLines, showCart, setShowCart} = useContext(CartContext)

    const cartContainerRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);

        
    const onClick = (e: any) => {
        if (e.target.id == 'cartContainer' && showCart){
            setShowCart(false);
        }
    }
    

    return (

        <div id='cartContainer' onClick={onClick} ref={cartContainerRef} className={`h-screen absolute transition-all overflow-x-hidden bg-stone-600 bg-opacity-30 ease-in duration-200 right-0 top-0 ${showCart ? 'z-10': '-z-10'} w-screen`}>

            <div id='cart' ref={cartRef} className={`${showCart ? 'w-[500px]' : 'w-0'} text-stone-800 bg-stone-100 transition-all h-screen absolute right-0`}>
                {props.cartLines && props.cartLines.lines.edges.map((item: any) => {
                    // console.log(item.node);
                    return (
                        <CartItem key={item.node.id} line={item.node}/>
                    )
                })}

            </div>
        </div>
    )
}