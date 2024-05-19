// Jooby Products

import ShoppingList from "@/app/components/ShoppingList";
import getQuery from "@/app/utils/serverUtils";

const joobyQuery = `query Products {
    products(first:100, query: "tag:jooby"){
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

export default async function JoobyStore({}) {
  const res = await getQuery(joobyQuery);

  const products = res.data.products.edges;

  return (
    <div className="flex flex-col font-DMSerifDisplay text-joobyDark">
      <h1 className="ml-48 text-2xl mr-48 pt-8">Shop Jooby</h1>
      <div className="flex gap-12 justify-center flex-row">
        <ShoppingList items={products}></ShoppingList>
      </div>
    </div>
  );
}
