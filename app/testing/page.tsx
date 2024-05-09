import getQuery from "../utils/serverUtils";

export default async function Testing({}) {
  const query = `query Products {
        products(first:100){
          edges{
            node{
              title
              handle
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

  const res = await getQuery(query);

  const products = res.data.products.edges;
  console.log(products[0].node.images.edges)

  return (
    <div className="w-screen h-screen flex flex-row justify-center bg-stone-100 text-stone-800">
      {
        products.map((item:ProductDisplay) => {
          return <div>

            

          </div>
        })
      }
    </div>
  );
}
