import { CartDisplay } from "@/app/utils/interfaces";


export default function Cart({}){
    const fetchCart = async() => {
        const datum = await fetch('http://localhost:3000/api/cart/');
        console.log(datum);
        return datum;
    }
    const data = fetchCart();

    return (
        <div>
            Cart section, we make it or we get it from Shopify
            <div>
                {}
            </div>
        </div>
    )
}