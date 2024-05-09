const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': String(process.env.ACCESS_TOKEN)
}

const fetchURL = String(process.env.DOMAIN_NAME)

const getCart = `
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
                        product {
                        handle
                        title
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
    const res = await fetch(fetchURL, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
            query: getCart,
            variables: { id: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy" }
        }),
    })
    const responseData = await res.json() 
    const { data } = responseData;
    console.log("Received request to fetch cart data:", data);
    // return Response.json({ data });
    return Response.json(data);
}

// , { params }: { params: { query: string, variables: any }}