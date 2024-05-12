import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const addToCart = `
  mutation addCartLines($lines: [CartLineInput!]!, $cartId: ID!) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export async function POST(request: Request){
  const urlParts = request.url.split('?');
  const queryParams = new URLSearchParams(urlParts.slice(1).join('?'));
  const cartId = queryParams.get('cardId');
  const merchandiseId = queryParams.get('merchandiseId');
  const quantity = queryParams.get('quantity');
  console.log(queryParams)

  const res = await fetch(fetchURL, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      query: addToCart,
      variables: { 
        cartId: cartId,
        lines: [{
            merchandiseId: merchandiseId,
            quantity: (Number(quantity)),
        }]
      }
    }),
  })
  const data = await res.json()
  console.log(data);
  return Response.json({ data });
}
