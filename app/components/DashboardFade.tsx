"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface DashboardFadeProps {
  className?: string;
  children?: ReactNode;
  delay?: number;
}

export default function DashboardFade({
  className,
  children,
  delay,
}: DashboardFadeProps) {
  const parent = {
    hidden: {
      opacity: 0,
      translateY: '10px',
    },
    visible: {
      opacity: 1,
      translateY: '0px',
      ...(delay && {
        transition: {
          delay,
        },
      }),
    },
  };


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
      ref={ref}
      initial="hidden"
      className={className}
      animate={controls}
      variants={parent}
    >
      {children}
    </motion.div>
  );
}
