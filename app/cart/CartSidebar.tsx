'use client'

import { useEffect, useRef, useState } from "react"
import CartItem from "./CartItem";
import { CartDisplay } from "../utils/interfaces";


export default function CartSidebar({}){

    const [cartLines, setCartLines] = useState<CartDisplay>();

    useEffect(() => {
        const getCart = async () => {
            const req = await fetch(`/api/getCart?cartId=${'gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy'}`, {
                method: "POST",
            })
            .then((res) => res.json());
            setCartLines(req.res.data.cart)
            console.log(req.res.data.cart);
        }
        getCart()
    }, [])



    const cartContainerRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
        

    const onClick = (e: any) => {
        if (e.target.id == 'cartContainer' &&  cartRef.current && cartContainerRef.current?.style.zIndex == '10'){
            console.log('found')
            cartRef.current.style.width = '0px'
            setTimeout(() => {

                if (cartContainerRef.current){
                    cartContainerRef.current.style.zIndex = '-10'
                    cartContainerRef.current.style.opacity = '0'
                }

            }, 150)
        }
    }

    return (

        <div id='cartContainer' onClick={onClick} ref={cartContainerRef} className="h-screen absolute transition-all overflow-x-hidden bg-stone-600 bg-opacity-30 ease-in duration-200 right-0 top-0 -z-10 w-screen">

            <div id='cart' ref={cartRef} className="w-0 text-stone-800 bg-stone-100 transition-all h-screen absolute right-0">
                {cartLines && cartLines.lines.edges.map((item) => {
                    // console.log(item.node);
                    return (
                        <CartItem key={item.node.id} line={item.node}/>
                    )
                })}

            </div>
        </div>
    )
}