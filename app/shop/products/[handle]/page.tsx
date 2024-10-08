import Product from "@/app/components/Product";
import { ProductPage, ProductNode } from "@/app/utils/interfaces";
import {checkJooby, getImageDict, getQuery, splitDescription} from "@/app/utils/serverUtils";
import { formatPrice } from "@/app/utils";
import { split } from "postcss/lib/list";
import { cookies } from "next/headers";
import { secureHeapUsed } from "crypto";
import { currencyQuery } from "@/app/layout";


const query = `query getProductByHandle($handle: String, $countryCode: CountryCode!) @inContext(country: $countryCode) {
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
        descriptionHtml
        tags
        variants(first: 10) {
          edges {
            node {
              id
              quantityAvailable
              title
              price {
                amount
              }
              image {
                url
                altText
              }
            }
          }
        }
    }
  }
  `;




// export async function getImageDict(product: ProductPage) {
//   let prodict = product.variants.edges.reduce((acc: ImageDict, variant: ProductVariant) => {
//     const key: string | null = variant.node.title;
//     if (key) {
//         acc[key] = acc[key] || {
//           price: variant.node.price.amount,
//           variantId: variant.node.id,
//           totalInventory: variant.node.quantityAvailable,
//           productImages: []
//         };
//     }
//     return acc;
//   }, {});
//   product.images.edges.reduce((acc: ImageDict, variant: Variant) => {
//       const key: string | null = variant.node.altText;
//       if (key) {
//         acc[key].productImages.push(variant.node.url);
//       } else {
//         acc["Default Title"].productImages.push(variant.node.url);
//       }
//       return acc;
//   }, prodict);
// }

// Changed to sync function because doesn't handle any async promises


export default async function ProductTemplate({
  params,
}: {
  params: { handle: string };
}) {


  const currency = await getQuery(currencyQuery, {
    countryCode: 'JP',
  });


  const res = await getQuery(query, {
    handle: params.handle,
    countryCode: currency.extensions.context.country
  });

  const product: ProductPage = res.data.product; 
  const prodict: any = await getImageDict(product)
  const description: any = await splitDescription(product.descriptionHtml)
  const isJooby: boolean = await checkJooby(product.tags)

  let hasVariants = true
  if (Object.keys(prodict).length === 1 && Object.keys(prodict)[0] === "Default Title") {
    hasVariants = false
  }

  return (
    <div className="w-screen h-fit bg-stone-100 text-stone-800">
      <Product
        prodict={prodict}
        product={product}
        hasVariants={hasVariants}
        isJooby={isJooby}
        description={description?.[0] || null}
        whatsIncluded={description?.[1] || null}
        skillLevel={description?.[2] || null}
      ></Product>
    </div>
  );
}