"use client";

import { ReactNode, useContext, useState } from "react";
import { CartContext } from "./CartProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NavBarProps {
  showBanner: boolean;
  setShowBanner: (val: boolean) => void;
}

function NavBanner({ showBanner, setShowBanner }: NavBarProps) {
  return (
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
          onClick={() => setShowBanner(false)}
          className="w-screen text-joobyDark z-10 hover:cursor-pointer font-semibold bg-joobyDarkPink flex justify-center text-center items-center py-1 font-sans absolute"
        >
          Free shipping for orders over __ !!
          <div className="absolute pr-6 right-0 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              className="w-4 h-4 hover:cursor-pointer stroke-joobyDark"
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
  );
}

interface NavBarItemProps {
  children?: ReactNode;
  onMouseOver?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
}

function NavBarItem({ children, onMouseLeave, onMouseOver }: NavBarItemProps) {
  return (
    <motion.div
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      className="hover:bg-joobyLightPink hover:text-joobyDarkPink transition-all text-base text-center justify-center px-8 bg-joobyWhite text-joobyDark h-12 flex items-center "
    >
      {children}
    </motion.div>
  );
}

interface ShopSectionsProps {
  hover: boolean;
  sectionHover: boolean;
  setHover: (val: boolean) => void;
  setSectionHover: (e: any) => void;
  children?: ReactNode;
}

function ShopSections({
  hover,
  setHover,
  setSectionHover,
  sectionHover,
  children,
}: ShopSectionsProps) {
  const sectionsVariants = {
    hidden: {},
    visible: {
      boxShadow: "2px 1px 14px 1px rgba(0, 0, 0, 0.1)",
    },
    exit: {},
  };

  const itemsVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <AnimatePresence>
        {(hover || sectionHover) && (
          <motion.div
            id="sections"
            onMouseOver={(e) => {
              setSectionHover((prev: any) => {
                return true;
              });
            }}
            onMouseLeave={() => {
              setSectionHover((prev: any) => {
                if (!hover) {
                  return false;
                }
              });
            }}
            animate="visible"
            variants={sectionsVariants}
            className="absolute translate-y-12 z-20 bg-joobyWhite justify-center flex items-center shadow-joobyDark"
          >
            <motion.div
              variants={itemsVariants}
              className="relative flex flex-col justify-center items-center"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavDropDownProps {
  children?: ReactNode;
  label?: string;
  width?: number; // in pixels
  href: string,
}

// Label is name of navbar item
// Children contains dropdown items
function NavDropDown({ children, label, width, href }: NavDropDownProps) {
  const [navItemHover, setNavItemHover] = useState<boolean>(false);
  const [dropDownHover, setDropDownHover] = useState<boolean>(false);

  const onMouseOver = (e: any) => {
    setNavItemHover(true);
  };

  const onMouseLeave = (e: any) => {
    if (!dropDownHover) {
      setNavItemHover(false);
    }
  };

  return (
    <>
      <div style={{ width: `${width}px` }}>
        <div
          id="shop"
          className="w-max"
          
        >
          <div className="w-full flex flex-row justify-center">
            <Link href={href}>
              <NavBarItem
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                <h1>{label}</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`w-5 h-5 ml-2 ${
                    (navItemHover || dropDownHover) && "rotate-180"
                  } duration-200 transition-all stroke-joobyDark`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </NavBarItem>
            </Link>
            <ShopSections
              sectionHover={dropDownHover}
              setSectionHover={setDropDownHover}
              hover={navItemHover}
              setHover={setNavItemHover}
            >
              {children}
            </ShopSections>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Navbar({}) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  const [showBanner, setShowBanner] = useState<boolean>(true);

  return (
    <>
      <div className="w-screen h-auto pt-4 font-DMSerifDisplay bg-joobyWhite overflow-x-hidden">
        <h1 className="text-3xl text-joobyDark w-screen text-center pt-4 font-bold">
          <Link href={"/"}>
            <img
              alt="icon"
              className="rounded-full translate-x-4 absolute w-[50px] h-[50px]"
              src="/icon.ico"
            ></img>
          </Link>
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
          <Link href={"/tutorials"}>
            <NavBarItem>Tutorials</NavBarItem>
          </Link>
            <NavDropDown label="Shop" href={"/shop/store"}>
              <Link className="w-full" href={"/shop/starter"}>
                <NavBarItem>Starter Kit</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jars"}>
                <NavBarItem>Jars</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/findings"}>
                <NavBarItem>Findings</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/store"}>
                <NavBarItem>Shop All</NavBarItem>
              </Link>
            </NavDropDown>


            <NavDropDown label="Shop Jooby" href={"/shop/jooby/store"}>
              <Link className="w-full" href={"/shop/jooby/store"}>
                <NavBarItem>Necklaces</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jooby/store"}>
                <NavBarItem>Bracelets</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jooby/store"}>
                <NavBarItem>Phone Charms</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jooby/store"}>
                <NavBarItem>Earrings</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jooby/store"}>
                <NavBarItem>Shop All</NavBarItem>
              </Link>
            </NavDropDown>

          <Link href={"/contact"}>
            <NavBarItem>Contact</NavBarItem>
          </Link>

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
      </div>
      <NavBanner
        setShowBanner={setShowBanner}
        showBanner={showBanner}
      ></NavBanner>
    </>
  );
}

