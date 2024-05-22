import { JarsProps, ProductPage } from "@/app/utils/interfaces";
import getQuery from "@/app/utils/serverUtils";
import Product from "@/app/components/Product";

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

export async function getImageDict(product: ProductPage) {
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

export default async function Jars({}) {

  const res = await getQuery(jarsQuery, {
    handle: 'jar'
  });

  // FIXME: fix the type for jars here
  const jars: ProductPage = res.data.product;
  console.log(jars)
  const prodict: ImageDict = await getImageDict(jars)

  return (
    <div className="w-screen h-screen bg-stone-100 text-stone-800">
      <Product className="border-2 border-red-500" prodict={prodict} product={jars} hasVariants={true}></Product>
    </div>
  );
}
