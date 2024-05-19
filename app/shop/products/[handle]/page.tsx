import Product from "@/app/components/Product";
import { ProductPage, ProductNode } from "@/app/utils/interfaces";
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

// Changed to sync function because doesn't handle any async promises


export default async function ProductTemplate({
  params,
}: {
  params: { handle: string };
}) {

  function getImageDict(product: ProductPage): any {
    let prodict = product.variants.edges.reduce((acc: ImageDict, variant: ProductVariant) => {
      const key: string | null = variant.node.title;
      if (key) {
          acc[key] = acc[key] || {
            price: variant.node.price.amount,
            variantId: variant.node.id,
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
  const prodict: any = getImageDict(product)

  let hasVariants = true
  if (Object.keys(prodict).length === 1 && Object.keys(prodict)[0] === "Default Title") {
    hasVariants = false
  }
  console.log(prodict)

  return (
    <div className="w-screen h-screen bg-stone-100 text-stone-800">
      <Product className="border-2 border-red-500" prodict={prodict} product={product} hasVariants={hasVariants}></Product>
    </div>
  );
}


