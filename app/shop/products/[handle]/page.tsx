import Product from "@/app/components/Product";
import { ProductPage, ProductNode } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";
import { formatPrice } from "@/app/utils";
import { split } from "postcss/lib/list";
import { cookies } from "next/headers";
import { secureHeapUsed } from "crypto";


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

interface Variant {
  node: {
    altText: string | null;
    url: string;
  };
}

interface ProductVariant {
  node: {
    id: string;
    quantityAvailable: number;
    price: {
      amount: string;
    };
    image: {
      url: string;
    };
    title: string;
  };
}

interface ImageDict {
  [key: string]: {
    price: number,
    variantId: string;
    productImages: string[];
  };
}


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


 function checkJooby(tags: string[]) {
  for (let i = 0; i < tags.length; ++i) {
    if (tags[i].toLowerCase() === "jooby") {
      return true
    }
  }
  return false
}

 function splitDescription(text: string) {
  if (text === "") {
    return null
  }
  const sections = text.split("<p>Section</p>\n")
  return sections
}
  function getImageDict(product: ProductPage): any {
    let prodict = product.variants.edges.reduce((acc: any, variant: any) => {
      const key: string | null = variant.node.title;
      if (key) {
          acc[key] = acc[key] || {
            price: variant.node.price.amount,
            variantId: variant.node.id,
            totalInventory: variant.node.quantityAvailable,
            productImages: []
          };
      }
      return acc;
    }, {});
    product.images.edges.reduce((acc: ImageDict, variant: Variant) => {
        const key: string | null = variant.node.altText;
        if (key) {
          acc[key].productImages.push(variant.node.url);
        } else {
          acc["Default Title"].productImages.push(variant.node.url);
        }
        return acc;
    }, prodict);
  
    return prodict
  }

  const res = await getQuery(query, {
    handle: params.handle,
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