import Product from "@/app/components/Product";
import { ProductPage } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";

const query = `query getProductById($id: ID!) {
    product(id: $id) {
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
        description
    }
  }`;

export default async function ProductTemplate({
  params,
}: {
  params: { id: string };
}) {

  const res = await getQuery(query, {
    id: "gid://shopify/Product/" + params.id,
  });
  const product: ProductPage = res.data.product;

  return (
    <div>
      {product.title}
      <img src={product.images.edges[0].node.url} width={80} height={80}></img>
      <Product></Product>
    </div>
  );
}
