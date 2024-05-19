"use client";

import Link from "next/link";
import Category from "./Category";
import { motion } from "framer-motion";

interface ShoppingListProps {
  items: any[];
}

const parent = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: .1
      }
    },
  };

  const children = {
    hidden: {
      opacity: 0,
      translateY: '10px',
    },
    visible: {
      opacity: 1,
      translateY: '0px',
    },
  };

export default function ShoppingList({ items }: ShoppingListProps) {
  
  return (
    <div className="flex justify-center min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={parent}
        className="flex flex-row flex-wrap gap-x-5 h-max gap-y-10 justify-center py-4"
      >
        {items.map((item, i) => {
          // console.log(item.node)

          const imgProps = {
            imgSrc: item.node.images.edges[0].node.url,
            ...(item.node.images.edges[1] && {
              hoverSrc: item.node.images.edges[1].node.url,
            })
          }
          return (
            <Link href={`/shop/products/${item.node.handle}`}>
              <motion.div
                key={i}
                variants={children}
              >
                
                <Category {...imgProps}>{item.node.title}</Category>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
