"use client";

import Link from "next/link";
import { ProductDisplay, ShopAllProps } from "../utils/interfaces";
import { useState } from "react";
import useSet from "../utils/hooks/useSet";

export default function ShopAll({ products }: ShopAllProps) {
  const {set, has, add, remove} = useSet(['Jars'])

  const filteredProducts = products.filter((product) => {
    if (set.size == 0) return true
    console.log(set.has)
    return has(product.node.tags)
  })

  return (
    <div>
      <div className="flex flex-row gap-2 text-xl">
        {filteredProducts.map((product: ProductDisplay, i: number) => {
          return (
            <div key={i}>
              <Link
                className="hover:underline"
                href={`/shop/products/${product.node.handle}`}
              >
                {product.node.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
