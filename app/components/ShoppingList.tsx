"use client";

import Link from "next/link";
import Category from "./Category";
import { motion } from "framer-motion";
import { formatPrice } from "../utils";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartProvider";

interface ShoppingListProps {
  items: any[];
  handle: string,
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

export default function ShoppingList({ items, handle }: ShoppingListProps) {
  const {currCurrency, setCurrency} = useContext(CartContext)

  const [data, setData] = useState<any[]>(items)
  const [inFlight, setInFlight] = useState<boolean>(false);
  // console.log(items[0]);

  useEffect(() => {
    const updateItems = async () => {
      // console.log(currCurrency)
      setInFlight(true);
      const req = await fetch( 
        `/api/updatePrices?countryCode=${currCurrency.isoCode}&handle=${handle}`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      setInFlight(false);
      // console.log(req.data.data.collection.products.edges);
      setData(req.data.data.collection.products.edges)
    }
    if (currCurrency){
      updateItems()
    }
  }, [currCurrency])

  // console.log(currCurrency);
  return (
    <div className="flex justify-center min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={parent}
        className="flex flex-row w-[85vw] sm:w-[92vw] flex-wrap gap-x-[5vw] sm:gap-x-[4vw] h-max gap-y-[5vh] justify-start py-4"
      >
        {inFlight && <div>
          LOADING</div>}
        {!inFlight && data.map((item, i) => {
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
                  <div className="text-sm">{item.node.title}</div>
                  <div className="font-DMSans text-xs sm:text-base ">
                    {formatPrice(item.node.priceRange.minVariantPrice.amount, currCurrency.currency.isoCode)}
                    {/* {formatPrice(item.node.priceRange.minVariantPrice.amount)} USD */}
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
