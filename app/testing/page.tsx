import Link from "next/link";
import getQuery from "../utils/serverUtils";
import { ProductDisplay } from "../utils/interfaces";

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
            id
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
        {
        products.map(({node}:{node:ProductDisplay}, i: number) => {
          const [a, b, c, d, nodeId] = node.id.split('/')
          
          return <div key={i}>
            {node.title}
            {node.handle}
            <Link href={`/shop/products/${nodeId}`}>Link to Product</Link>
          </div>
        })
      }
      </div>
    </div>
  );
}
