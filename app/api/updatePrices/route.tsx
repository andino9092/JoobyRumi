

// reuse query but with a different address code. Sync with useUeffect

import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

  const joobyQuery = `query getCollection($handle: String!, $countryCode: CountryCode!) @inContext(country: $countryCode) {
    collection(handle: $handle){
        products(first:100){
          edges{
            node{
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
            }
          }
        }
      }
    }`;

export async function POST(request: Request){
  const urlParts = request.url.split('?');
  const queryParams = new URLSearchParams(urlParts.slice(1).join('?'));
  const countryCode = queryParams.get('countryCode')
  const handle = queryParams.get('handle')
  console.log(queryParams)

  const res = await fetch(fetchURL, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
          query: joobyQuery,
          variables: { 
            countryCode: countryCode,
            handle: handle,
          }
      }),
  })
  const data = await res.json()
  console.log(data);
  return Response.json({ data });
}
