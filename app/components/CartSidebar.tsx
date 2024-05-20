"use client";

import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import CartItem from "./CartItem";
import { CartDisplay } from "../utils/interfaces";
import { CartContext } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "./Button";

const getSnapshot = () => {
  return localStorage.getItem("cartid");
};

const subscribe = (cb: any) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const serverSide = () => {
  return null;
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const sideBarVariants = {
  hidden: {
    width: "0px",
  },
  visible: {
    width: "500px",
    transition: {
      staggerChildren: 0.1,
      duration: 0.4,
      when: "beforeChildren",
    },
  },
  exit: {
    width: "0px",
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    transitionY: "-20px",
  },
  visible: {
    opacity: 1,
    transitionY: "0px",
  },
  exit: {
    opacity: 0,
    transitionY: "-20px",
  },
};

export default function CartSidebar(props: any) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  useLayoutEffect(() => {
    const original = document.body.style.overflowY;
    if (showCart) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = original;
    };
  }, [showCart]);

  const cartid = useSyncExternalStore(subscribe, getSnapshot, serverSide);

  const [inFlight, setInFlight] = useState<boolean>(false);

  const onClick = (e: any) => {
    if (e.target.id == "cartContainer" && showCart) {
      setShowCart(false);
    }
  };

  // console.log(cartLines);
  return (
    <>
      <AnimatePresence initial={false}>
        {showCart && (
          <motion.div
            id="cartContainer"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            onClick={onClick}
            className={`h-screen fixed overflow-x-hidden z-50 bg-joobyDark bg-opacity-30  right-0 top-0 w-screen`}
          >
            <motion.div
              variants={sideBarVariants}
              id="cart"
              className={` text-stone-800 bg-joobyWhite h-screen absolute right-0`}
            >
              <h1 className="font-sans text-2xl ml-20 py-10 text-joobyDark">
                {" "}
                CART • {cartLines.lines.edges.length}
              </h1>
              <div className="flex justify-center after:w-full after:border-b-2 after:border-stone-200">
                {" "}
              </div>
              {inFlight && <div>WEE WOO WEE WOO</div>}
              <div className="flex flex-col divide-y-2 py-4 overflow-y-auto overflow-x-hidden">
                {props.cartLines &&
                  !inFlight &&
                  props.cartLines.lines.edges.map((item: any) => {
                    // console.log(item.node);
                    return (
                      <CartItem
                        variants={childVariants}
                        cartid={cartid}
                        setInFlight={setInFlight}
                        key={item.node.id}
                        line={item.node}
                      />
                    );
                  })}
                {props.cartLines && !inFlight && (
                  <motion.div variants={childVariants}>
                    <Link href={props.cartLines.checkoutUrl}>
                      <Button className="w-max px-8 py-5 group hover:bg-stone-200 ml-16 hover:text-joobyDark transition-all">
                        Checkout • 
                        <span className="text-joobyWhite pl-2 group-hover:text-joobyDark font-bold">${cartLines.cost.totalAmount.amount}</span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
