"use client";

import { useContext, useEffect, useRef, useState } from "react";
import CartItem from "./CartItem";
import { CartDisplay } from "../utils/interfaces";
import { CartContext } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar(props: any) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  const onClick = (e: any) => {
    if (e.target.id == "cartContainer" && showCart) {
      setShowCart(false);
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {showCart && (
          <motion.div
            id="cartContainer"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            onClick={onClick}
            className={`h-screen absolute overflow-x-hidden z-50 bg-stone-600 bg-opacity-30  right-0 top-0 w-screen`}
          >
            <motion.div
              initial={{
                width: "0px",
              }}
              animate={{
                width: "500px",
              }}
              exit={{
                width: "0px",
              }}
              transition={{ type: "tween", duration: 0.2 }}
              id="cart"
              className={` text-stone-800 bg-stone-100 h-screen absolute right-0`}
            >
              {props.cartLines &&
                props.cartLines.lines.edges.map((item: any) => {
                  // console.log(item.node);
                  return <CartItem key={item.node.id} line={item.node} />;
                })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
