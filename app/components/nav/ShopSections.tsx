import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ShopSectionsProps {
  hover: boolean;
  sectionHover: boolean;
  setHover: (val: boolean) => void;
  setSectionHover: (e: any) => void;
  children?: ReactNode;
}

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

export default function ShopSections({
  hover,
  setHover,
  setSectionHover,
  sectionHover,
  children,
}: ShopSectionsProps) {
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
