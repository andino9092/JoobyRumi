import Link from "next/link";
import getQuery from "../utils/serverUtils";
import { ProductDisplay } from "../utils/interfaces";
import Button from "../components/Button";
import Tester from "./Tester";

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
          }
        }
      }
    }`;

export default async function Testing({}) {

  const res = await getQuery(productsQuery);

  const products = res.data.products.edges;

  return (
    <div className="w-screen h-screen flex flex-row justify-center bg-stone-100 text-stone-800">
      <div>

      </div>
      <Tester></Tester>
      
    </div>
  );
}
