'use client'

import { CartLine } from "@/app/utils/interfaces";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../components/CartProvider";


// Prevent from sending multiple requests to api route
export default function CartItem({line, setInFlight, cartid}: {line: CartLine, setInFlight: (arg: boolean) => void, cartid: string | null}){
    const {cartLines, updateCartLines, showCart, setShowCart} = useContext(CartContext)
    // const [totalAmount, setTotalAmount] = useState(line.quantity)
    const totalInventory:number = Number(line.merchandise.product.totalInventory)


    // const cartid = localStorage.getItem("cartid")
    // console.log(line)

    async function increment(nodeid: string, quantity: number, productid: string) {
        setInFlight(true);
        const req = await fetch(`/api/updateLine?cartid=${cartid}&nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=1`, {
            method: "POST",
        })
        .then((res) => res.json());
        await updateCartLines()
        setInFlight(false);
        console.log(req);
    } 

    async function decrement(nodeid: string, quantity: number, productid: string) {
        setInFlight(true);
        const req = await fetch(`/api/updateLine?cartid=${cartid}&nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=-1`, {
            method: "POST",
        })
        .then((res) => res.json());
        await updateCartLines()
        setInFlight(false);
        console.log(req);
    }

    async function remove(nodeid: string) {
        setInFlight(true);
        const req = await fetch(`/api/removeLine?cartId=${cartid}&nodeId=${nodeid}`, {
            method: "POST",
        })
        .then((res) => res.json());
        await updateCartLines()
        setInFlight(false);
        console.log(req);
    }

    return (
        <div>
            <Link href={`/${line.merchandise.product.handle}`}>{line.merchandise.product.title} ({line.merchandise.title})</Link>
            <p>{line.quantity}</p>
            <button onClick={() => increment(line.id, line.quantity, line.merchandise.id)} disabled={line.quantity >= totalInventory}>
                <span>+</span>
            </button>
            <button onClick={() => decrement(line.id, line.quantity, line.merchandise.id)} disabled={line.quantity <= 0}>
                <span>-</span>
            </button>
        </div>
    )
}