"use client";

import { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartProvider";
import { formatPrice } from "../utils";

export default function Product({prodict, product, hasVariants}: any) {
  const {cartLines, updateCartLines, showCart, setShowCart} = useContext(CartContext)
  const [currVariant, setCurrVariant] = useState({
    "title": product.variants.edges[0].node.title,
    "full_image": prodict[product.variants.edges[0].node.title].productImages[0]
  })

  const addProduct = async(variantId: string) => {
    let cartid = localStorage.getItem("cartid");

    if (cartid != null){
      const req = await fetch(`/api/addLine?cartId=${cartid}&merchandiseId=${variantId}&quantity=${1}`, {
        method: "POST",
      }).then((res) => res.json());
    } else {
      const req = await fetch(`/api/createCart?merchandiseId=${variantId}&quantity=${1}`, {
        method: "POST",
      }).then((res) => res.json());
      console.log(req)
      localStorage.setItem("cartid", req.data.cartCreate.cart.id)
    }

    updateCartLines();

    setShowCart(true);
  }

  return (
    <div>
      <div className="px-[70px] pt-12 grid grid-cols-12 gap-[30px]">
        <div className="col-span-7 grid grid-cols-7 gap-[30px]">
          <div className="">
            {prodict[currVariant.title].productImages.map((item: any) => {
              return (
                <button>
                  <img key={item} className="rounded-xl" src={item} onClick={() => {setCurrVariant(prev => ({...prev, "full_image": item}))}} width={100} height={100}></img>
                </button>
              )
            })}
          </div>
          <img className="col-span-6 w-full object-cover object-center rounded-xl shadow-3xl" src={currVariant.full_image} width={400} height={400}></img>
        </div>
        <div className="col-span-5">
          <div className="mx-auto px-10">
            <p className="font-black text-6xl">{product.title}</p>
            <p className="font-medium text-2xl text-stone-500 py-5">{formatPrice(prodict[currVariant.title].price)}</p>
            {hasVariants && 
              <div>
                <div className="flex">
                  <p className="font-bold">Color:</p>
                  <p className="font-light ml-2">{currVariant.title}</p>
                </div>
                <div className="pt-1 pb-7 flex">
                  {product.variants.edges.map((item: any) => {
                    return (
                      <button 
                        className="pr-3"
                        onClick={() => {setCurrVariant({
                          "title": item.node.title,
                          "full_image": prodict[item.node.title].productImages[0]
                        })}}>
                        <img className="h-14 w-14 rounded-lg" src={item.node.image.url}></img>
                      </button>
                    )
                  })}
                </div>
              </div>
            }
            <Button onClick={() => addProduct(prodict[currVariant.title].variantId)}> ADD TO CART </Button>
          </div>
        </div>
      </div>
    </div>
  );
}