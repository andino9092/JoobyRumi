"use client";
import { ReactNode, useState } from "react";
import Loading from "./Loading";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface CategoryProps {
  children?: ReactNode;
  labelClassName?: string;
  imgSrc?: string;
  hoverSrc?: string;
}

export default function Category({
  children,
  imgSrc,
  hoverSrc,
  labelClassName = "bg-white w-[370px] h-auto py-3 px-5",
}: CategoryProps) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="w-auto rounded-lg overflow-hidden hover:cursor-pointer shadow-[3px_2px_30px_-20px_rgba(0,0,0,0.3)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        {!imgSrc && (
          <Loading className="z-00 w-[370px] h-[370px] object-cover"></Loading>
        )}
        {imgSrc && (
          <Image
          loading="eager"
          height={370}
          width={370}
            alt="itemImg"
            src={imgSrc}
            className="z-00 w-[370px] h-[370px] object-cover"
          ></Image>
        )}
        <AnimatePresence>
          {/* Can wrap AnimatePresence and use with hover state if whileHover isn't enough */}
            {hover && hoverSrc && (
              <div className="absolute overflow-hidden top-0">
                <motion.div
  
                  animate={{
                    scale: 1.1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 1,
                    opacity: 0,
                    transition: {
                      duration: .3
                    }
                  }}
                  
                >
                  <Image
                    src={hoverSrc}
                    loading="eager"
                    width={370}
                    height={370}
                    className="w-[370px] h-[370px] object-cover "
                    alt="hoverImg"
                  ></Image>
                </motion.div>
              </div>
            )}
            {hover && !hoverSrc && (
              <div className="absolute overflow-hidden top-0">
                <motion.div
                  initial={{
                    scale: 1,
                    opacity: 0,
                  }}
                  whileHover={{
                    scale: 1.1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 1,
                    opacity: 0,
                  }}
                  
                >
                  <Image
                    src={'/loading_2.jpg'}
                    loading="eager"
                    width={370}
                    height={370}
                    className="w-[370px] h-[370px] object-cover "
                    alt="hoverImg"
                  ></Image>
                </motion.div>
              </div>
            )}

        </AnimatePresence>
      </div>
      <h2 className={labelClassName}>{children}</h2>
    </div>
  );
}
