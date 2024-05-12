"use client";

import Link from "next/link";
import { ProductDisplay, ShopAllProps } from "../utils/interfaces";
import { useState } from "react";

export default function ShopAll({ products }: ShopAllProps) {




  return (
    <div>
      <div className="flex flex-row gap-2 text-xl">
        {products.map((product: ProductDisplay, i: number) => {
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
