"use client";

import { CartLine } from "@/app/utils/interfaces";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../components/CartProvider";
import { motion } from "framer-motion";
import Image from "next/image";

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
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);
  // const [totalAmount, setTotalAmount] = useState(line.quantity)
  const totalInventory: number = Number(
    line.merchandise.product.totalInventory
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
    console.log(req);
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
    console.log(req);
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
    console.log(req);
  }

  //   console.log(line)

  return (
    <motion.div variants={variants} className="relative flex flex-row py-4">
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
      <p>
        <Link
          onClick={() => setShowCart(false)}
          className="font-bold text-joobyDark"
          href={`/shop/products/${line.merchandise.product.handle}`}
        >
          {line.merchandise.product.title} •{" "}
          <span className="text-stone-300 font-normal">
            {line.merchandise.title}
          </span>
        </Link>
      </p>
      <p className="absolute right-4 top-4 divide-x-2 border-2">
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
      </p>
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
