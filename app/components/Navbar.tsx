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
    <div className="text-lg hover:cursor-pointer hover:bg-pink-200 px-10 h-12 flex items-center hover:text-stone-50 transition-all text-stone-600 font-semibold">
      {children}
    </div>
  );
}

interface ShopSectionsProps {
  hover: boolean;
  sectionHover: boolean;
  setHover: (val: boolean) => void;
  setSectionHover: (e: any) => void;
}

function ShopSections({ hover, setHover, setSectionHover, sectionHover }: ShopSectionsProps) {
  
  const sectionsVariants = {
    hidden : {
      height: "0px",
    },
    visible: {
      height: "48px",
      y: '-4px',
      boxShadow: '2px 1px 14px 1px rgba(0, 0, 0, 0.1)',
      transition: { 
        type: 'tween',
        when: 'beforeChildren',
      }
    },
    exit: {
      height: "0px",
      transition: {
        type: 'tween',
        when: 'afterChildren',
      }
    }
  }

  const itemsVariants = {
    hidden : {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
    }
  }
  
  return (
    <>
      <AnimatePresence initial={false}>
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
                
                return false;
              });
            }}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={sectionsVariants}
            className="absolute w-screen z-10 bg-stone-100 justify-center flex items-center  shadow-stone-300"
          >
            <motion.div
            variants={itemsVariants}
            className="relative flex justify-center items-center">
              <Link href={'/shop/starter'}>
                <NavBarItem>
                  KITS
                </NavBarItem>
              </Link>
              <Link href={'/shop/jars'}>
                <NavBarItem>
                  JARS
                </NavBarItem>
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
          className="w-screen text-stone-700 font-semibold bg-pink-200 flex justify-center text-center items-center py-1 font-sans absolute"
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
      <div className="relative top-0 w-screen h-fit bg-stone-100 overflow-x-hidden">
        <h1 className="text-3xl relative font-semibold font-serif text-pink-300 w-screen text-center pt-4">
          <Link href={'/'}>
            <img className="rounded-full translate-x-4 absolute w-[50px] h-[50px]" src='/icon.ico'></img>
          </Link>
          Jooby Rumi
        </h1>
        <div className="flex flex-row justify-center items-center gap-3 w-screen text-xl border-b-2 relative  h-fit">
          <Link href={"/"}>
            <NavBarItem>HOME</NavBarItem>
          </Link>
          <Link href={'/tutorials'}>
            <NavBarItem>TUTORIALS</NavBarItem>
          </Link>
          <div id="shop" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <Link href={'/shop/store'}>
              <NavBarItem>SHOP</NavBarItem>
            </Link>
          </div>
          <Link href={'/shop/jooby'}>
            <NavBarItem>JOOBY</NavBarItem>
          </Link>
          <Link href={"/contact"}>
            <NavBarItem>CONTACT</NavBarItem>
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
      </div>
      <ShopSections
      sectionHover={sectionHover}
        setSectionHover={setSectionHover}
        hover={hover}
        setHover={setHover}
      ></ShopSections>
      <NavBanner
        setShowBanner={setShowBanner}
        showBanner={showBanner}
      ></NavBanner>
    </>
  );
}
