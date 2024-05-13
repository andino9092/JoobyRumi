"use client";

import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

function NavBarItem({ children }: any) {
  return <div className="text-lg text-stone-600 font-semibold">{children}</div>;
}

export default function Navbar({}) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  const [showBanner, setShowBanner] = useState<boolean>(true);

  return (
    <>
    <div className="absolute top-0 w-screen h-fit bg-stone-100 pb-1 overflow-x-hidden">
      <h1 className="text-3xl font-semibold font-serif text-pink-300 w-screen text-center pt-4">
        Jooby Rumi
      </h1>
      <div className="flex flex-row justify-center py-4 items-center gap-24 w-screen text-xl border-2 relative  h-fit">
        <NavBarItem>HOME</NavBarItem>
        <NavBarItem>CONTACT</NavBarItem>
        <NavBarItem>SHOP</NavBarItem>
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
      {showBanner && 
      <div className="w-screen">
        Free shipping for orders over $50!!
        </div>}
    </div>
    </>
  );
}
