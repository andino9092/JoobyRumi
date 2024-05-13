import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const removeLine = `
  mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!){
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds){
      cart{
        id
      }
    }
  }
`

export async function POST(request: Request){
  const urlParts = request.url.split('?');
  const queryParams = new URLSearchParams(urlParts.slice(1).join('?'));
  const cartId = queryParams.get('cartId')
  const nodeId = queryParams.get('nodeId');
  console.log(queryParams)

  const res = await fetch(fetchURL, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
          query: removeLine,
          variables: { 
            cartId: cartId,
            lineIds: nodeId
          }
      }),
  })
  const data = await res.json()
  console.log(data);
  return Response.json({ data });
}
