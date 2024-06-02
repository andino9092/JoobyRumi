import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState, useSyncExternalStore } from "react";
import { getWidth, serverWidth, subscribe } from "../Navbar";
import CurrencyDropdown from "./CurrencyDropdown";

// ===================
// ANIMATION CONSTANTS
// ===================
const drawerVariants = {
  hidden: {},
  show: {},
  exit: {},
};

const bgVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const itemsVariants = {
  hidden: {
    width: "0px",
    opacity: 0,
  },
  show: {
    width: "100%",
    opacity: 1,
    transition: {
      when: "beforeChildren",
    },
  },
  exit: {
    width: "0px",
    opacity: 0,
  },
};

const pageVariants = {
  hidden: {
    translateX: "-200px",
    opacity: 0,
  },
  show: {
    translateX: "0px",
    opacity: 1,
    transition: {
      type: "tween",
      staggerChildren: 0.5,
      when: "beforeChildren",
    },
  },
  exit: {
    translateX: "-200px",
  },
};

const itemVariant = {
  hidden: {
    opacity: 0,
    translateY: "10px",
  },
  show: {
    opacity: 1,
    translateY: "0px",
  },
  exit: {
    opacity: 0,
    translateY: "10px",
    transition: {
      duration: 0.1,
    },
  },
  tap: {
    backgroundColor: "rgb(255 182 193)",
    transition: {},
  },
};

// ===================
// DRAWER ITEM STYLING
// ===================

function DrawerItem({
  children,
  onClick,
  href,
  layered,
}: {
  children?: ReactNode;
  onClick?: (e: any) => void;
  href?: string;
  layered?: boolean;
}) {
  return (
    // Edit tap colors after
    <motion.div
      onClick={onClick}
      className="text-xl mx-3 px-3 my-6 py-2 items-center flex justify-start"
      whileTap="tap"
      variants={itemVariant}
    >
      {children}
      {layered && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={4}
          className={`w-5 h-5 mr-16 absolute right-0 -rotate-90 duration-200 transition-all stroke-joobyDark`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </motion.svg>
      )}
    </motion.div>
  );
}

// ===================
// MAIN FUNCTION
// ===================
interface MobileDrawerProps {
  collections: any[];
  shopItems: any[];
  setShowDrawer: (arg: boolean) => void;
}

export default function MobileDrawer({
  collections,
  shopItems,
  setShowDrawer,
}: MobileDrawerProps) {
  // switch between layers
  const [currLayer, setLayer] = useState<number>(0);

  const width = useSyncExternalStore(subscribe, getWidth, serverWidth);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={drawerVariants}
      className="fixed top-0 mt-[52px] text-joobyDark w-screen h-screen z-40 left-0 font-DMSans"
    >
      <motion.div
        variants={bgVariants}
        className="absolute left-0 bg-joobyDark w-full h-full"
      ></motion.div>
      <motion.div
        variants={itemsVariants}
        className="absolute h-full bg-joobyWhite"
      >
        {currLayer != 0 && (
          <motion.div variants={pageVariants}>
            {currLayer == 1 && (
              <motion.div
                onClick={() => setLayer(0)}
                className="flex ml-12 pt-6 flex-row text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  className={`w-5 h-5 absolute left-0 ml-4  rotate-90 duration-200 stroke-joobyDark`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                Shop
              </motion.div>
            )}
            {currLayer == 2 && (
              <motion.div
                onClick={() => setLayer(0)}
                className="flex ml-12 pt-6 flex-row text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  className={`w-5 h-5 absolute left-0 ml-4 rotate-90 duration-200 stroke-joobyDark`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                Collections
              </motion.div>
            )}
          </motion.div>
        )}
        {currLayer == 0 && (
          <motion.div variants={pageVariants}>
            <Link
              onClick={() => {
                setShowDrawer(false);
              }}
              href={"/"}
            >
              <DrawerItem>Home</DrawerItem>
            </Link>
            <DrawerItem layered onClick={() => setLayer(1)}>
              Shop
            </DrawerItem>
            <DrawerItem layered onClick={() => setLayer(2)}>
              Shop Jooby
            </DrawerItem>
            <Link
              onClick={() => {
                setShowDrawer(false);
              }}
              href={"/contact"}
            >
              <DrawerItem>Contact</DrawerItem>
            </Link>
          </motion.div>
        )}
        {currLayer == 1 && (
          <motion.div variants={pageVariants}>
            {shopItems &&
              shopItems.map((item, i) => {
                return (
                  <Link
                    onClick={() => {
                      setShowDrawer(false);
                    }}
                    key={i}
                    href={item.href}
                  >
                    <DrawerItem>{item.label}</DrawerItem>
                  </Link>
                );
              })}
          </motion.div>
        )}
        {currLayer == 2 && (
          <motion.div variants={pageVariants}>
            {collections &&
              collections.map((item, i) => {
                if (item.node.handle == "jooby") {
                  return;
                }
                console.log(item.node);
                return (
                  <Link
                    key={i}
                    onClick={() => {
                      setShowDrawer(false);
                    }}
                    href={`/collections/${item.node.handle}`}
                  >
                    <DrawerItem>{item.node.title}</DrawerItem>
                  </Link>
                );
              })}
            <Link
              onClick={() => {
                setShowDrawer(false);
              }}
              className="w-full"
              href={"/collections/jooby"}
            >
              <DrawerItem>Shop All</DrawerItem>
            </Link>
          </motion.div>
        )}
        <motion.div
          variants={itemsVariants}
          className="fixed flex flex-row bottom-0 h-[150px] font-DMSerifDisplay text-xl text-joobyWhite bg-joobyDarkPink w-full"
        >
          <div className="flex flex-col gap-6 ml-4 justify-center">
            <motion.div variants={itemVariant}>
              <CurrencyDropdown setShowDrawer={setShowDrawer}></CurrencyDropdown>
            </motion.div>
            <motion.div variants={itemVariant}>Contact</motion.div>
            {/* <motion.div variants={itemVariant}>
                Freq questions
            </motion.div> */}
          </div>
          <div className="flex flex-grow relative gap-4 mr-12 items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-8 w-8 group/insta"
            >
              {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
              <path
                className="group-hover/insta:fill-joobyDark fill-joobyWhite"
                d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
