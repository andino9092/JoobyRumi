'use client'

import { CartLine } from "@/app/utils/interfaces";
import Link from "next/link";
import { useState, useEffect } from "react";

// Prevent from sending multiple requests to api route
export default function CartItem({line}: {line: CartLine}){
    const [totalAmount, setTotalAmount] = useState(line.quantity)
    const totalInventory:number = Number(line.merchandise.product.totalInventory)
    // console.log(line)

    async function increment(nodeid: string, quantity: number, productid: string) {
        const req = await fetch(`/api/updateLine?nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=1`, {
            method: "POST",
        })
        .then((res) => res.json());
        setTotalAmount(totalAmount + 1)
        console.log(req);
    } 

    async function decrement(nodeid: string, quantity: number, productid: string) {
        const req = await fetch(`/api/updateLine?nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=-1`, {
            method: "POST",
        })
        .then((res) => res.json());
        setTotalAmount(totalAmount - 1)
        if (totalAmount <= 0) {
            remove(line.id)
        }
        console.log(req);
    }

    async function remove(nodeid: string) {
        const req = await fetch(`/api/removeLine?nodeid=${nodeid}`, {
            method: "POST",
        })
        .then((res) => res.json());
        console.log(req);
    }

    return (
        <div>
            <Link href={`/${line.merchandise.product.handle}`}>{line.merchandise.product.title}</Link>
            <p>{totalAmount}</p>
            <button onClick={() => increment(line.id, line.quantity, line.merchandise.id)} disabled={totalAmount >= totalInventory}>
                <span>+</span>
            </button>
            <button onClick={() => decrement(line.id, line.quantity, line.merchandise.id)} disabled={totalAmount <= 0}>
                <span>-</span>
            </button>
        </div>
    )
}