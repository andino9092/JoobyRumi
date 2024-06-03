import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const getCartQuery = `
    query getCart($id: ID!, $countryCode: CountryCode!) @inContext(country: $countryCode){
        cart(id: $id) {
            id
            checkoutUrl
            lines(first: 10) {
                edges {
                node {
                    id
                    quantity
                    merchandise {
                    ... on ProductVariant {
                        quantityAvailable
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
        }
    `;

export async function POST(request: Request) {
  const urlParts = request.url.split("?");
  const queryParams = new URLSearchParams(urlParts.slice(1).join("?"));
  const cartId = queryParams.get("cartId");
  const countryCode = queryParams.get("countryCode");
  console.log(queryParams);
  const res = await fetch(fetchURL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      query: getCartQuery,
      variables: {
        id: cartId,
        countryCode: countryCode,
      },
    }),
  }).then((res) => res.json());

  return Response.json({ res });
}
