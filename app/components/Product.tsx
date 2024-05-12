"use client";

import Button from "./Button";

export default function Product({}) {

  const testingFunction = async() => {
    const req = await fetch("/api/createCart", {
      method: "POST",
    })
    .then((res) => res.json());
    console.log(req);
    return req;
  }
  
  return (
    <div>
      <button
        onClick={async (e: any) => {
          const req = await fetch("/api/createCart", {
            method: "POST",
          })
          .then((res) => res.json());
          console.log(req);
        }}
      >
        Add to Cart
      </button>

      <Button
      onClick={testingFunction}
      >
          Test Button
      </Button>
    </div>
  );
}
