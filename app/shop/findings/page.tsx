import ShoppingList from "@/app/components/ShoppingList";
import getQuery from "@/app/utils/serverUtils";

export default async function Findings({}) {
  // const items = ["Jump Rings", "Tools", "String", "Charms"];
  // const itemsList = [...items, ...items, ...items];

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
    <div>
      <div className="flex flex-col font-DMSerifDisplay text-joobyDark">
        <h1 className="ml-48 text-2xl mr-48 pt-8">Shop Findings</h1>
        <div className="flex gap-12 justify-center flex-row">
          <ShoppingList items={products}></ShoppingList>
        </div>
      </div>
    </div>
  );
}
