"use client";

import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function NavBarItem({ children }: any) {
  return (
    <div className="text-lg hover:cursor-pointer hover:bg-pink-200 px-10 h-12 flex items-center hover:text-stone-50 transition-all text-stone-600 font-semibold">
      {children}
    </div>
  );
}

function ShopSections({ hover, setHover }: any) {
  return (
    <>
      {/* <AnimatePresence> */}
      {hover && (
        <div className="absolute w-screen h-[100px] bg-stone-200">Hello</div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
}

export default function Navbar({}) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);

  return (
    <>
      <div className="relative top-0 w-screen h-fit bg-stone-100 pb-1 overflow-x-hidden">
        <h1 className="text-3xl font-semibold font-serif text-pink-300 w-screen text-center pt-4">
          Jooby Rumi
        </h1>
        <div className="flex flex-row justify-center items-center gap-3 w-screen text-xl border-b-2 relative  h-fit">
          <Link href={"/"}>
            <NavBarItem>HOME</NavBarItem>
          </Link>
          <Link href={"/contact"}>
            <NavBarItem>CONTACT</NavBarItem>
          </Link>
          <div
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
          >
            <NavBarItem>SHOP</NavBarItem>
            
          </div>
          <NavBarItem>JOOBY</NavBarItem>

          <div className="flex flex-row absolute right-0 pr-8">
            {/* <div>
                        Search Bar not gonna implement yet harhar
                    </div>                     */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-stone-600 stroke-2 hover:cursor-pointer"
              onClick={() => {
                setShowCart(true);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        </div>
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{
                height: "0px",
                opacity: 0,
              }}
              animate={{
                height: "28px",
                opacity: 1,
              }}
              exit={{
                height: "0px",
                opacity: 0,
              }}
              className="w-screen text-stone-700 font-semibold bg-pink-200 flex justify-center text-center items-center py-1 font-sans relative"
            >
              Free shipping for orders over __ !!
              <div className="absolute pr-6 right-0 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-4 h-4 hover:cursor-pointer "
                  onClick={() => {
                    setShowBanner(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ShopSections hover={hover} setHover={setHover}></ShopSections>
    </>
  );
}
