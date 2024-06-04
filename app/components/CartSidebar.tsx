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
import { formatPrice } from "../utils";
import { getWidth, serverWidth } from "./Navbar";

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
    transition: {
      when: "beforeChildren",
      duration: .1
    }
  },
  exit: {
    opacity: 0,
    transition:{
      when: 'afterChildren',
      duration: .1,
    }
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
    duration: .1,
  },
};

export default function CartSidebar(props: any) {
  const {currCurrency, cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);


    const width = useSyncExternalStore(subscribe, getWidth, serverWidth);

    const sideBarVariants = {
      hidden: {
        width: "0px",
      },
      visible: {
        width: width && width < 640 ? "100%" : '500px',
        transition: {
          staggerChildren: 0.1,
          duration: 0.2,
          when: "beforeChildren",
        },
      },
      exit: {
        width: "0px",
        transition: {
          duration: .1,
          when: 'afterChildren',
        }
      },
    };
    
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
            className={`h-screen fixed overflow-x-hidden z-50 bg-joobyDark bg-opacity-30 right-0 top-0 w-screen`}
          >
            <motion.div
              variants={sideBarVariants}
              id="cart"
              className={` text-stone-800 bg-joobyWhite h-screen absolute right-0`}
            >
              <motion.h1 variants={childVariants} className="font-sans text-xl ml-8 py-4 sm:py-10 text-joobyDark relative items-center flex">
                CART • {props.cartLines && props.cartLines.lines.edges.length != 0 ? props.cartLines.lines.edges.length : "0"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      setShowCart(false);
                    }}
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 absolute right-0 mr-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
              </motion.h1>
              <div className="flex justify-center after:w-full after:border-b-2 after:border-stone-200">
                {" "}
              </div>
              {props.cartLines && props.cartLines.lines.edges.length != 0 ? (
                <>
              {inFlight && <div>WEE WOO WEE WOO</div>}
              <div className="flex flex-col divide-y-2 py-4 mx-4 text-sm sm:ml-0 overflow-y-auto overflow-x-hidden">
                {props.cartLines &&
                  !inFlight &&
                  props.cartLines.lines.edges.map((item: any) => {
                    console.log(item.node);
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
                        <span className="text-joobyWhite pl-2 group-hover:text-joobyDark font-bold">
                         {formatPrice(props.cartLines.cost.totalAmount.amount, currCurrency.currency.isoCode)}
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
              </>
              )
              :
              (<motion.div variants={childVariants} className="w-screen sm:absolute sm:block sm:w-auto sm:left-32 sm:top-80 h-auto min-h-[300px] flex justify-center items-center text-joobyDark text-xl">
                YOUR CART IS EMPTY
              </motion.div>)}
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
