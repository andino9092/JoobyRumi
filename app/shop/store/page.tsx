// All products

import DashboardFade from "@/app/components/DashboardFade";
import ShopAll from "@/app/components/ShopAll";
import ShoppingList from "@/app/components/ShoppingList";
import { ProductDisplay } from "@/app/utils/interfaces";
import { getQuery } from "@/app/utils/serverUtils";
import Link from "next/link";

export default async function Store({}) {
  const productsQuery = `query getCollection($handle: String!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    collection(handle: $handle){
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
            }
          }
        }
      }
    }`;

  const res = await getQuery(productsQuery, {
    countryCode: "US",
    handle: "others",
  });

  const products = res.data.collection.products.edges;

  return (
    <div className="flex flex-col font-DMSerifDisplay text-joobyDark">
      <DashboardFade>
        <h1 className="text-3xl ml-[7.5vw] sm:ml-[4vw] sm:text-2xl sm:mr-48 pt-12">
          Shop All
        </h1>
      </DashboardFade>
      <div className="flex gap-12 justify-center">
        <ShoppingList items={products} handle="others"></ShoppingList>
      </div>
    </div>
  );
}
