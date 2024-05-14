"use client";

import { ReactNode, useContext, useState } from "react";
import { CartContext } from "./CartProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface NavBarItemProps {
  children: ReactNode;
}

function NavBarItem({ children }: NavBarItemProps) {
  return (
    <motion.div
      // whileHover={{
      //   backgroundColor: "rgb(247 232 234)",
      //   color: "#FFB6C1",
      // }}
      // transition-all hover:underline hover:underline-offset-4
      className="hover:bg-joobyLightPink hover:text-joobyDarkPink transition-all text-base text-center justify-center w-full px-8 bg-joobyWhite text-joobyDark h-12 flex items-center "
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
}

function ShopSections({
  hover,
  setHover,
  setSectionHover,
  sectionHover,
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
            className="w-[140px] absolute z-10 bg-joobyWhite justify-center flex items-center shadow-joobyDark"
          >
            <motion.div
              variants={itemsVariants}
              className="relative w-auto flex flex-col justify-center items-center"
            >
              <Link className="w-full" href={"/shop/starter"}>
                <NavBarItem>Starter Kit</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/jars"}>
                <NavBarItem>Jars</NavBarItem>
              </Link>
              <Link className="w-full" href={"/shop/findings"}>
                <NavBarItem>Findings</NavBarItem>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
          className="w-screen text-joobyDark hover:cursor-pointer font-semibold bg-joobyDarkPink flex justify-center text-center items-center py-1 font-sans absolute"
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

export default function Navbar({}) {
  const { cartLines, updateCartLines, showCart, setShowCart } =
    useContext(CartContext);

  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const [sectionHover, setSectionHover] = useState<boolean>(false);

  const onMouseOver = (e: any) => {
    setHover(true);
  };

  const onMouseLeave = (e: any) => {
    if (!sectionHover) {
      setHover(false);
    }
  };

  return (
    <>
      <div className="w-screen h-auto pt-4 font-DMSerifDisplay bg-joobyWhite overflow-x-hidden">
        <h1 className="text-3xl text-joobyDark w-screen text-center pt-4 font-bold">
          <Link href={"/"}>
            <img
              className="rounded-full translate-x-4 absolute w-[50px] h-[50px]"
              src="/icon.ico"
            ></img>
          </Link>
          <Link href={"/"} className="hover:cursor-pointer hover:text-stone-700">
            JoobyRumi
          </Link>
        </h1>
        <div className="flex flex-row justify-center items-center w-screen text-xl pt-2 border-b-2 h-auto">
          <Link href={"/"}>
            <NavBarItem>Home</NavBarItem>
          </Link>
          <Link href={"/tutorials"}>
            <NavBarItem>Tutorials</NavBarItem>
          </Link>
          <div>
            <div
              id="shop"
              className="w-[140px] relative"
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              <Link href={"/shop/store"}>
                <NavBarItem>
                  <div>
                    Shop

                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className={`w-5 h-5 absolute right-3 ${(hover ||sectionHover) && 'rotate-180'} duration-200 transition-all stroke-joobyDark`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </NavBarItem>
              </Link>
            </div>
            <ShopSections
              sectionHover={sectionHover}
              setSectionHover={setSectionHover}
              hover={hover}
              setHover={setHover}
            ></ShopSections>
          </div>
          <Link href={"/shop/jooby"}>
            <NavBarItem>Jooby</NavBarItem>
          </Link>
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
