'use client'

import { CartLine } from "@/app/utils/interfaces";
import Link from "next/link";

// Prevent from sending multiple requests to api route
export default function CartItem({line}: {line: CartLine}){
    console.log(line)

    async function increment(nodeid: string, quantity: number, productid: string) {
        const req = await fetch(`/api/incrementLine?nodeid=${nodeid}&quantity=${quantity}&productid=${productid}`, {
            method: "POST",
        })
        .then((res) => res.json());
        console.log(req);
    }

    return (
        <div>
            <Link href={`/${line.merchandise.product.handle}`}>{line.merchandise.product.title}</Link>
            <p>{line.quantity}</p>
            <button onClick={() => increment(line.id, line.quantity, line.merchandise.id)}>
                <span>+</span>
            </button>
            <button>
                <span>-</span>
            </button>
        </div>
    )
}