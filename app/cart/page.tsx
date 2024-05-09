import { CartDisplay } from "@/app/utils/interfaces";
import getQuery from "../utils/serverUtils";


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

export default async function Cart({}){

    const req = await getQuery(getCartQuery, { id: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy" })
    const cart: CartDisplay = req.data.cart

    console.log(cart);

    return (
        <div>
            Cart section, we make it or we get it from Shopify
            <div>
                {}
            </div>
        </div>
    )
}