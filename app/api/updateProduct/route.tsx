// reuse query but with a different address code. Sync with useUeffect

import { ProductPage } from "@/app/utils/interfaces";
import { checkJooby, defaultHeaders, fetchURL, getImageDict, splitDescription } from "@/app/utils/serverUtils";

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

export async function POST(request: Request) {
  const urlParts = request.url.split("?");
  const queryParams = new URLSearchParams(urlParts.slice(1).join("?"));
  const countryCode = queryParams.get("countryCode");
  const handle = queryParams.get("handle");
  // console.log(queryParams);

  const res = await fetch(fetchURL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      query: query,
      variables: {
        countryCode: countryCode,
        handle: handle,
      },
    }),
  });
  const data = await res.json();

  const product: ProductPage = data.data.product; 
  const prodict: any = getImageDict(product)

  return Response.json({product: product, prodict: prodict });
}
