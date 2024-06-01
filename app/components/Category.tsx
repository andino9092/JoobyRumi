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
  labelClassName = "bg-white w-[180px] sm:w-[20vw] h-auto py-3 px-5",
}: CategoryProps) {
  const [hover, setHover] = useState<boolean>(false);


  return (
    <div
      className="flex-grow w-[180px] sm:w-[20vw] rounded-xl sm:overflow-hidden h-auto hover:cursor-pointer border-stone-200  shadow-[3px_2px_30px_-20px_rgba(0,0,0,0.3)]"
      onMouseEnter={() => {
        
        
        
        setHover(true)}}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden rounded-t-xl ">
        {!imgSrc && (
          <Loading className="z-00 w-[180px] h-[180px] sm:w-[20vw] sm:h-[20vw] object-cover"></Loading>
        )}
        {imgSrc && (
          <div className="w-[180px] h-[180px] sm:w-[20vw] sm:h-[20vw]">
            <Image
              fill
              // Do this later to optimize
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="itemImg"
              src={imgSrc}
              className="z-00 object-cover"
            ></Image>
            </div>
        )}
        <AnimatePresence>
          {/* Can wrap AnimatePresence and use with hover state if whileHover isn't enough */}
          {hover && (

              <motion.div
                animate={{
                  scale: 1.05,
                  opacity: 1,
                }}
                exit={{
                  scale: 1,
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                className="w-[180px] h-[180px] sm:w-[20vw] sm:h-[20vw] absolute top-0"
              >
                <Image
                  src={hoverSrc || "/loading_2.jpg"}
                  loading="eager"
                  fill
                  className="object-cover "
                  alt="hoverImg"
                ></Image>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h2 className={labelClassName}>{children}</h2>
    </div>
  );
}
