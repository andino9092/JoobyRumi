import Product from "@/app/components/Product";
import { ProductPage } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";
import { formatPrice } from "@/app/utils";


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
        variants(first: 10) {
          edges {
            node {
              id
              image {
                url
              }
              title
            }
          }
        }
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
  console.log(product.variants.edges);

  return (
    <div className="w-screen h-screen gap-4 bg-stone-100 text-stone-800">
      <div className="px-20 grid grid-cols-2 gap-6">
        <div className="">
          <img className="w-full object-cover object-center rounded-2xl shadow-3xl" src={product.variants.edges[0].node.image.url} width={400} height={400}></img>
          <div className="flex mt-10">
            {product.variants.edges.map((item) => {
              return (
                  <img className="rounded-lg " src={item.node.image.url} width={100} height={100}></img>
              )
            })}
          </div>
        </div>
        <div className="border border-red-500">
          <p className="font-light text-sm text-stone-500">JOOBY</p>
          <p className="font-black text-6xl">{product.title}</p>
          <p className="font-medium text-2xl text-stone-500">{formatPrice(Number(product.priceRange.minVariantPrice.amount))}</p>
          <Product className="border-2 border-red-500" product={product}></Product>
        </div>
      </div>
    </div>
  );
}


