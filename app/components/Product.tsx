"use client";

import Button from "./Button";

export default function Product({product}: any) {

  console.log(product)

  const testingFunction = async() => {
    const req = await fetch("/api/createCart", {
      method: "POST",
    })
    .then((res) => res.json());
    console.log(req);
    return req;
  }

  const addProduct = async() => {
    const req = await fetch(`/api/createCart?variantId=${product.variants.edges[0].node.id}&cartId=${'gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy'}`, {
      method: "POST",
    }).then((res) => res.json());
    console.log(req);
  }
  
  return (
    <div>
      <Button onClick={addProduct}>
        Add to Cart
      </Button>

      <Button
      onClick={testingFunction}
      >
          Test Button
      </Button>
    </div>
  );
}
