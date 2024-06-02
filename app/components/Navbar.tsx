"use client";

import { useContext, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { CartContext } from "./CartProvider";
import Link from "next/link";
import NavBarItem from "./nav/NavBarItem";
import NavDropDown from "./nav/NavDropDown";
import NavBanner from "./nav/NavBanner";
import MobileDrawer from "./nav/MobileDrawer";
import { AnimatePresence, motion } from "framer-motion";
import DrawerButton from "./nav/DrawerButton";
import CurrencyDropdown from "./nav/CurrencyDropdown";

interface CollectionProperties {
  node: {
    handle: string;
    title: string;
  };
}

export const getWidth = () => {
  return window.innerWidth;
};

export const subscribe = (cb: any) => {
  window.addEventListener("resize", cb);

  return () => window.removeEventListener("resize", cb);
};

export const serverWidth = () => {
  return undefined;
};

const shopItems = [
  {
    href: "/shop/starter",
    label: "Starter Kit",
  },
  {
    href: "/shop/products/jars",
    label: "Jars",
  },
  {
    href: "/shop/starter",
    label: "Findings",
  },
  {
    href: "/shop/store",
    label: "Shop All",
  },
];

export default function Navbar({
  collections,
}: {
  collections: CollectionProperties[];
}) {
  const { setShowCart } = useContext(CartContext);

  const [showBanner, setShowBanner] = useState<boolean>(true);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const width = useSyncExternalStore(subscribe, getWidth, serverWidth);

  useLayoutEffect(() => {
    const original = document.body.style.overflowY;
    if (showDrawer) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = original;
    };
  }, [showDrawer]);

  return (
    <>
      <div className="w-screen flex justify-center items-center sm:flex-col fixed sm:static z-20 h-auto sm:pt-4 font-DMSerifDisplay bg-joobyWhite overflow-x-hidden">
        <h1 className="text-3xl text-joobyDark w-screen text-center py-2 lg:pt-4 font-bold">
          <Link
            href={"/"}
            className="hover:cursor-pointer hover:text-stone-700"
          >
            JoobyRumi
          </Link>
        </h1>
        <div className="flex flex-row justify-center items-center w-screen text-xl pt-2 border-joobyLightPink border-b-2 h-auto">
          <Link href={"/"}>
            <NavBarItem>Home</NavBarItem>
          </Link>
          {/* <Link href={"/tutorials"}>
            <NavBarItem>Tutorials</NavBarItem>
          </Link> */}
          <NavDropDown label="Shop" href={"/shop/store"}>

            <Link className="w-full" href={"/shop/starter"}>
              <NavBarItem>Starter Kit</NavBarItem>
            </Link>
            <Link className="w-full" href={"/shop/products/jar"}>
              <NavBarItem>Jars</NavBarItem>
            </Link>
            <Link className="w-full" href={"/shop/findings"}>
              <NavBarItem>Findings</NavBarItem>
            </Link>
            <Link className="w-full" href={"/shop/store"}>
              <NavBarItem>Shop All</NavBarItem>
        
        {width && width >= 600 && <CurrencyDropdown></CurrencyDropdown>}

        {/* 
          ========================
          MOBILE VERSION OF NAVBAR
          ========================
         */}
        {width && width < 640 && (
          <div
            onClick={() => setShowDrawer((prev) => !prev)}
            className="absolute left-0 ml-4"
          >
            <DrawerButton showDrawer={showDrawer}></DrawerButton>
          </div>
        )}
        <AnimatePresence>
          {width && width < 640 && showDrawer && (
            <MobileDrawer
              setShowDrawer={setShowDrawer}
              shopItems={shopItems}
              collections={collections}
            ></MobileDrawer>
          )}
        </AnimatePresence>

        {/* 
          ========================
          SCREEN VERSIONS
          ========================
         */}
        {width && width >= 640 && (
          <div className="flex flex-row justify-center items-center w-screen text-xl border-joobyLightPink border-b-2 h-auto">
            <Link href={"/"}>
              <NavBarItem>Home</NavBarItem>
            </Link>
            <NavDropDown label="Shop" href={"/shop/store"}>
              {shopItems.map((item, i) => {
                return (
                  <Link key={i} className="w-full" href={item.href}>
                    <NavBarItem>{item.label}</NavBarItem>
                  </Link>
                );
              })}
            </NavDropDown>

            <NavDropDown label="Shop Jooby" href={"/collections/jooby"}>
              {collections &&
                collections.map((collection, i) => {
                  if (collection.node.handle == "jooby" || collection.node.handle == 'others') {
                    return;
                  }
                  return (
                    <Link
                      key={i}
                      className="w-full"
                      href={`/collections/${collection.node.handle}`}
                    >
                      <NavBarItem>{collection.node.title}</NavBarItem>
                    </Link>
                  );
                })}
              <Link className="w-full" href={"/collections/jooby"}>
                <NavBarItem>Shop All</NavBarItem>
              </Link>
            </NavDropDown>

            <Link href={"/contact"}>
              <NavBarItem>Contact</NavBarItem>
            </Link>
          </div>
        )}

        {/* 
          ========================
          CART BUTTON
          ========================
         */}

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
            className="w-6 h-6 stroke-joobyDark stroke-2 hover:cursor-pointer"
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
      <NavBanner
        setShowBanner={setShowBanner}
        showBanner={showBanner}
      ></NavBanner>
    </>
  );
}
