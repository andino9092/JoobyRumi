import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";

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
    opacity: 0.6,
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

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={drawerVariants}
      className="fixed top-0 mt-[68px] w-screen h-screen z-40 left-0 font-DMSans"
    >
      <motion.div
        variants={bgVariants}
        className="absolute left-0 bg-joobyDark w-full h-full"
      ></motion.div>
      <motion.div
        variants={itemsVariants}
        className="absolute h-full bg-joobyLightPink"
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
                console.log(item.node)
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
              className="w-full" href={"/collections/jooby"}>
                <DrawerItem>Shop All</DrawerItem>
              </Link>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={bgVariants}
        className="absolute bottom-0 h-[200px] bg-stone-300 w-full"
      >
        FOOTER
      </motion.div>
    </motion.div>
  );
}
