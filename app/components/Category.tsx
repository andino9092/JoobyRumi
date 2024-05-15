"use client";
import { ReactNode, useState } from "react";
import Loading from "./Loading";
import { AnimatePresence, motion } from "framer-motion";


interface CategoryProps{
    children?: ReactNode,
    labelClassName?: string,
    imgSrc?: string,
    hoverSrc?: string,
}


export default function Category({children, imgSrc, hoverSrc, labelClassName = "bg-white w-[370px] h-auto py-3 px-5"}: CategoryProps) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="w-auto rounded-lg overflow-hidden hover:cursor-pointer shadow-[3px_2px_30px_-20px_rgba(0,0,0,0.3)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
        <div className="relative">

        <Loading className="z-00 w-[370px] h-[370px] object-cover"></Loading>
      <AnimatePresence>
        {hover && (
          <div className="absolute overflow-hidden top-0">
            <motion.img
              initial={{
                scale: 1,
                opacity: 1,
            }}
            animate={{
                scale: 1.1,
                opacity: 1,
            }}
            exit={{
                scale: 1,
                opacity: 0,
            }}
            src="/loading_2.jpg"
            className="w-[370px] h-[370px] object-cover "
            ></motion.img>
          </div>
        )}
        </AnimatePresence>
        </div>
      <h2 className={labelClassName}>{children}</h2>
    </div>
  );
}
