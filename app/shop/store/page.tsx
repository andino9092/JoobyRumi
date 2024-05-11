// All products

import ShopAll from "@/app/components/ShopAll";
import { ProductDisplay } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";
import Link from "next/link";

export default async function Store({}) {
  const productsQuery = `query Products {
        products(first:100){
          edges{
            node{
              title
              priceRange{
                minVariantPrice{
                  amount
                }
              }
              handle
              images(first:10){
                edges{
                  node{
                    url
                    altText
                  }
                }
              }
              totalInventory
              tags
            }
          }
        }
      }`;


  const res = await getQuery(productsQuery);

  const products = res.data.products.edges;

  return (
    <div className="w-screen h-screen flex flex-row flex-wrap gap-2 items-center justify-center bg-stone-100 text-stone-800">
      <h1 className="text-xl font-bold">Items: </h1>
      <ShopAll products={products}></ShopAll>
    </div>
  );
}
