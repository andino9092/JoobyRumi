import Product from "@/app/components/Product";
import { ProductPage } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";

const query = `query getProductByHandle($handle: String) {
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
        totalInventory
        description
    }
  }`;

export default async function ProductTemplate({
  params,
}: {
  params: { handle: string };
}) {

  const res = await getQuery(query, {
    handle: params.handle,
  });

  
  const product: ProductPage = res.data.product;
  console.log(product);

  return (
    <div>
      {product.title}
      <img src={product.images.edges[0].node.url} width={80} height={80}></img>
      <Product></Product>
    </div>
  );
}
