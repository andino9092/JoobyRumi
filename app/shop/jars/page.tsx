import getQuery from "@/app/utils/serverUtils";

// Jooby Jars Products

const jarsQuery = `query Products {
    products(first:100, query: "tag:jars"){
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

export default async function Jars({}) {
  const res = await getQuery(jarsQuery);
  const jars = res.data.products.edges;

  console.log(jars);

  return <div>Jars</div>;
}
