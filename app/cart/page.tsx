import { CartDisplay } from "@/app/utils/interfaces";
import getQuery from "../utils/serverUtils";
import CartItem from "./CartItem";

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

export default async function Cart({}){

    const req = await getQuery(getCartQuery, { id: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy" })
    const cart: CartDisplay = req.data.cart


    // console.log(cart);
    // for (let i = 0; i < cart.lines.edges.length; i++) {
    //     console.log(cart.lines.edges[i].node)
    // }

    return (
        <>
            {cart.lines.edges.map((item) => {
                // console.log(item.node);
                return (
                    <CartItem key={item.node.id} line={item.node}/>
                )
            })}
            Cart section, we make it or we get it from Shopify waka waka
            <div>
                {}
            </div>
        </>
    )
}