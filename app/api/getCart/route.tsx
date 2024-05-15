import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const getCartQuery = `
    query getCart($id: ID!) {
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

export async function POST(request: Request){
    const urlParts = request.url.split('?');
    const queryParams = new URLSearchParams(urlParts.slice(1).join('?'));
    const cartId = queryParams.get('cartId');
    console.log(queryParams)
    const res = await fetch(fetchURL, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
            query: getCartQuery,
            variables: {
                id: cartId
            }
        }),
    }).then((res) => res.json())


    return Response.json({res});
}
