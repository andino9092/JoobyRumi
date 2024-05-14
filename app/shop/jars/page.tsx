import { JarsProps } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";

// Jooby Jars Products



const jarsQuery = `query getProductByHandle($handle: String) {
  product(handle: $handle) {
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
      options{
        name
        values
      }
      totalInventory
      description
  }
}`;

export default async function Jars({}) {
  const res = await getQuery(jarsQuery, {
    handle: 'snorlax'
  });

  // console.log(res);
  const jars: JarsProps = res.data.product;

  console.log(jars);

  return <div>Jars</div>;
}
