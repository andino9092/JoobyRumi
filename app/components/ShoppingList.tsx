"use client";

import Link from "next/link";
import Category from "./Category";
import { motion } from "framer-motion";
import { formatPrice } from "../utils";

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
      staggerChildren: 0.1,
    },
  },
};

const children = {
  hidden: {
    opacity: 0,
    translateY: "10px",
  },
  visible: {
    opacity: 1,
    translateY: "0px",
  },
};

export default function ShoppingList({ items }: ShoppingListProps) {
  return (
    <div className="sm:ml-28 flex justify-center min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={parent}
        className="flex flex-row w-11/12 sm:w-[90vw] flex-wrap gap-x-5 h-max gap-y-10 justify-start py-4"
      >
        {items.map((item, i) => {
          // console.log(item.node.priceRange.minVariantPrice.amount)

          const imgProps = {
            imgSrc: item.node.images.edges[0].node.url,
            ...(item.node.images.edges[1] && {
              hoverSrc: item.node.images.edges[1].node.url,
            }),
          };
          return (
            <Link key={i} href={`/shop/products/${item.node.handle}`}>
              <motion.div variants={children}>
                <Category {...imgProps}>
                  <div>{item.node.title}</div>
                  <div className="font-DMSans">
                    {formatPrice(item.node.priceRange.minVariantPrice.amount)} USD
                  </div>
                </Category>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
