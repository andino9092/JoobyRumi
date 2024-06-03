"use client";

import { CartLine } from "@/app/utils/interfaces";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../components/CartProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatPrice } from "../utils";

// Prevent from sending multiple requests to api route
export default function CartItem({
  variants,
  line,
  setInFlight,
  cartid,
  className,
}: {
  variants: any;
  line: CartLine;
  setInFlight: (arg: boolean) => void;
  cartid: string | null;
  className?: string;
}) {
  const {currCurrency, cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);
  // const [totalAmount, setTotalAmount] = useState(line.quantity)
  const totalInventory: number = Number(
    line.merchandise.quantityAvailable
  );

  // const cartid = localStorage.getItem("cartid")
  // console.log(line)

  async function increment(
    nodeid: string,
    quantity: number,
    productid: string
  ) {
    setInFlight(true);
    const req = await fetch(
      `/api/updateLine?cartid=${cartid}&nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=1`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    await updateCartLines();
    setInFlight(false);
    // console.log(req);
  }

  async function decrement(
    nodeid: string,
    quantity: number,
    productid: string
  ) {
    setInFlight(true);
    const req = await fetch(
      `/api/updateLine?cartid=${cartid}&nodeid=${nodeid}&quantity=${quantity}&productid=${productid}&update=-1`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    await updateCartLines();
    setInFlight(false);
    // console.log(req);
  }

  async function remove(nodeid: string) {
    setInFlight(true);
    const req = await fetch(
      `/api/removeLine?cartId=${cartid}&nodeId=${nodeid}`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    await updateCartLines();
    setInFlight(false);
    // console.log(req);
  }

  //   console.log(line)

  return (
    <motion.div
      variants={variants}
      className="relative flex flex-row py-4 items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="sm:ml-4 size-6 hover:stroke-red-600"
        onClick={() => {
          remove(line.id);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>

      <Link
        onClick={() => setShowCart(false)}
        href={`/shop/products/${line.merchandise.product.handle}`}
      >
        <Image
          alt="cartImg"
          className="w-[100px] h-[100px] object-cover p-3"
          src={line.merchandise.image.url}
          width={150}
          height={150}
        ></Image>
      </Link>
      <div className="flex flex-col gap-1">
        <Link
          onClick={() => setShowCart(false)}
          className="font-bold text-joobyDark"
          href={`/shop/products/${line.merchandise.product.handle}`}
        >
          {line.merchandise.product.title}
        </Link>
        <div className="text-sm text-stone-400"> 
          {line.merchandise.title}

        </div>
        <div>

        {formatPrice(Number(line.merchandise.price.amount), currCurrency.currency.isoCode)}
        </div>
      </div>
      <div className="absolute right-0">
        <div className="divide-x-2 border-2 flex items-center">
          <CartButton
            onClick={() => decrement(line.id, line.quantity, line.merchandise.id)}
            disabled={line.quantity <= 0}
          >
            <span>-</span>
          </CartButton>
          <span className="px-2">{line.quantity}</span>

          <CartButton
            onClick={() => increment(line.id, line.quantity, line.merchandise.id)}
            disabled={line.quantity >= totalInventory}
          >
            <span>+</span>
          </CartButton>
        </div>

      </div>
    </motion.div>
  );
}

function CartButton({ onClick, disabled, children }: any) {
  return (
    <button
      className="px-2 disabled:opacity-20"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
