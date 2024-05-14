import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const updateAddOne = `
  mutation updateLessOne($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`

export async function POST(request: Request){
  const urlParts = request.url.split('?');
  const queryParams = new URLSearchParams(urlParts.slice(1).join('?'));
  const cartid = queryParams.get('cartid')
  const nodeid = queryParams.get('nodeid');
  const quantity = queryParams.get('quantity');
  const productid = queryParams.get('productid');
  const update = queryParams.get('update');
  console.log(queryParams)

  const res = await fetch(fetchURL, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
          query: updateAddOne,
          variables: { 
            cartId: cartid,
            lines: [{
              id: nodeid,
              quantity: (Number(quantity) + Number(update)),
              merchandiseId: productid,
            }]
          }
      }),
  })
  const data = await res.json()
  // console.log(data);
  return Response.json({ data });
}
