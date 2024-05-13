"use client";

import { useContext } from "react";
import Button from "./Button";
import { CartContext } from "./CartProvider";

export default function Product({product}: any) {

  const {cartLines, updateCartLines, showCart, setShowCart} = useContext(CartContext)


  const testingFunction = async() => {
    const req = await fetch("/api/createCart", {
      method: "POST",
    })
    .then((res) => res.json());
    console.log(req);
    return req;
  }


  const addProduct = async() => {
    let cartid = localStorage.getItem("cartid");

    if (cartid != null){
      const req = await fetch(`/api/addLine?cartId=${cartid}&merchandiseId=${product.variants.edges[0].node.id}&quantity=${1}`, {
        method: "POST",
      }).then((res) => res.json());
    } else {
      const req = await fetch(`/api/createCart?merchandiseId=${product.variants.edges[0].node.id}&quantity=${1}`, {
        method: "POST",
      }).then((res) => res.json());
      localStorage.setItem("cartid", req.data.cartCreate.cart.id)
    }

    updateCartLines();

    setShowCart(true);
  }

  const refreshCart = () => {
    localStorage.removeItem("cartid");
    updateCartLines();
  }
  
  return (
    <div>
      <Button 
        onClick={addProduct}>
        Add to Cart
      </Button>

      {/* <Button
      onClick={testingFunction}
      >
          Test Button
      </Button>
      <Button onClick={refreshCart}>
          Refresh Cart
      </Button> */}
    </div>
  );
}
