import { ImageDict, ProductPage, Variant } from "./interfaces"


export const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': String(process.env.ACCESS_TOKEN)
}

export const fetchURL = String(process.env.DOMAIN_NAME)

// Takes query and returns the promised result. 

// Revalidates cached data every hour
export async function getQuery(query: string, variables: any = {}){

    const res = await fetch(fetchURL, {
      
        next: { revalidate: 100 },
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({query, variables}),
    }).then((res) => res.json())

    return res
}


export function checkJooby(tags: string[]) {
    for (let i = 0; i < tags.length; ++i) {
      if (tags[i].toLowerCase() === "jooby") {
        return true
      }
    }
    return false
  }
  
export function splitDescription(text: string) {
    if (text === "") {
      return null
    }
    const sections = text.split("<p>Section</p>\n")
    return sections
  }
export function getImageDict(product: ProductPage): any {
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
  