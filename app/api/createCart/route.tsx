import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";

const createCart = `
    mutation createCart($cartInput: CartInput) {
        cartCreate(input: $cartInput) {
        cart {
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
                            }
                        }
                    }
                }
            }
            attributes {
                key
                value
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
    const merchandiseId = queryParams.get('merchandiseId');
    const quantity = queryParams.get('quantity');
    console.log(queryParams)

    const res = await fetch(fetchURL, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
            query: createCart,
            variables: { 
                cartInput: {
                    lines: [{
                        merchandiseId: merchandiseId,
                        quantity: (Number(quantity)),
                    }]
                }
            }
        }),
    })
    const { data } = await res.json()
    // console.log(data);
    return Response.json({ data });
}
