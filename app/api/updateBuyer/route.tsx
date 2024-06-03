// reuse query but with a different address code. Sync with useUeffect

import { ProductPage } from "@/app/utils/interfaces";
import { checkJooby, defaultHeaders, fetchURL, getImageDict, splitDescription } from "@/app/utils/serverUtils";

const query = `mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
        cart{
            id
            checkoutUrl
            lines(first: 10) {
                edges {
                node {
                    id
                    quantity
                    merchandise {
                    ... on ProductVariant {
                        id
                        title
                        product {
                        handle
                        title
                        totalInventory
                        }
                        price {
                        amount
                        }
                        image {
                        url
                        }
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
            }
            }
        userErrors {
            field
            message
        }
    }
}`

export async function POST(request: Request) {
  const urlParts = request.url.split("?");
  const queryParams = new URLSearchParams(urlParts.slice(1).join("?"));
  const countryCode = queryParams.get("countryCode");
  const cartId = queryParams.get("cartId");

//   console.log(queryParams);

  const res = await fetch(fetchURL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      query: query,
      variables: {
        buyerIdentity: {
            countryCode: countryCode,
        },
        cartId: cartId,
      },
    }),
  }).then((data) => data.json());

  const data = res.data.cartBuyerIdentityUpdate.cart
//   console.log(res);


  return Response.json({data});
}
