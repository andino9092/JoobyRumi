"use client";

import Link from "next/link";
import { StaggeredCarouselProps } from "../utils/interfaces";
import Category from "./Category";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const parent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: {
    opacity: 0,
    translateY: "10px",
  },
  visible: {
    opacity: 1,
    translateY: "0px",
  },
};

export default function StaggeredCarousel({
  heading,
  children,

}: StaggeredCarouselProps) {


    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref);
    
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

  return (
    <motion.div
      initial="hidden"
      ref={ref}
      animate={controls}
      variants={parent}
      className="flex flex-col gap-4 pt-4"
    >
      <motion.h1 variants={child} className="ml-48 text-2xl">
        {heading}
      </motion.h1>
      <motion.div className="flex gap-12 justify-center flex-row">
        {children.map((item, i) => {
          return (
            <motion.div key={i} variants={child}>
              <Link href={item.href}>
                <Category>{item.label}</Category>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
