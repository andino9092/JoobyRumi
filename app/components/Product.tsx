"use client";

export default function Product({}) {
  return (
    <div>
      <button
        onClick={async (e: any) => {
          const req = await fetch("/api/cart", {
            method: "POST",
          })
          .then((res) => res.json());
          console.log(req);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
