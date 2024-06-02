'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({children, title}: {children: string, title: string}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden mb-2">
      <motion.div
        className="relative z-20 px-1 py-2 cursor-pointer border-b-2 border-joobyDarkPink"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-bold text-xl font-DMSerifDisplay text-joobyDark flex justify-between items-center">
          <div className="w-fit">
            {title}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-5 h-5 right-3 stroke-joobyDark ${isOpen && 'rotate-180'} duration-200 transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{type: "spring", duration: 0.4, bounce: 0}}
          >
            <div className="p-2 text-joobyDark" dangerouslySetInnerHTML={{ __html: children }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;