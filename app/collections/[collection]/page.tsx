import Product from "@/app/components/Product";
import { ProductPage, ProductNode } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";
import { formatPrice } from "@/app/utils";
import ShoppingList from "@/app/components/ShoppingList";
import DashboardFade from "@/app/components/DashboardFade";

const joobyQuery = `query getCollection($handle: String!) {
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

export default async function ProductTemplate({
  params,
}: {
  params: { collection: string };
}) {
  const res = await getQuery(joobyQuery, {
    handle: params.collection,
  });

//   console.log(res.data.collection.products.edges)
  const products = res.data.collection.products.edges

  return (
    <div className="flex flex-col font-DMSerifDisplay text-joobyDark">
      <DashboardFade>
        <h1 className="text-3xl ml-4  sm:ml-40 sm:text-2xl sm:mr-48 pt-12">Shop Jooby</h1>
      </DashboardFade>
        <ShoppingList items={products}></ShoppingList>
    </div>
  );
}
