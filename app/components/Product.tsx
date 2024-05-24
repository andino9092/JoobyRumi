"use client";

import { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartProvider";
import Accordion from "./Accordion";
import { formatPrice } from "../utils";
import Image from "next/image";

export default function Product({prodict, product, hasVariants, isJooby, description, whatsIncluded, skillLevel}: any) {
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

  console.log(description)

  return (
    <div>
      <div className="px-[70px] py-14 grid grid-cols-12 gap-[30px] md:grid-cols-12">
        <div className="col-span-7 grid grid-cols-7 gap-[30px]">
          <div className="">
            {prodict[currVariant.title].productImages.map((item: any, i: number) => {
              return (
                <button key={i}>
                  <Image alt='product' key={item} className="rounded-xl" src={item} onClick={() => {setCurrVariant(prev => ({...prev, "full_image": item}))}} width={100} height={100}></Image>
                </button>
              )
            })}
          </div>
          <img className="col-span-6 w-full object-cover object-center rounded-xl shadow-3xl" src={currVariant.full_image} width={400} height={400}></img>
          <div className="col-span-7 bg-joobyLightPink h-[450px] rounded-xl mt-10 flex">
            <div className="w-fit h-fit m-auto">
              <p className="font-DMSerifDisplay text-2xl py-2">A Perfect Pair</p>
              <div className="flex">
                <div className="">
                  <div className="bg-joobyDark h-60 w-60 rounded-t-xl"></div>
                  <div className="bg-white h-10 w-60 rounded-b-xl flex">
                    <p className="font-DMSerifDisplay my-auto px-5">Jooby Newbie Kit</p>
                  </div>
                </div>
                <div className="text-4xl font-joobyDark my-auto px-5">
                  +
                </div>
                <div className="">
                  <div className="bg-joobyDark h-60 w-60 rounded-t-xl"></div>
                  <div className="bg-white h-10 w-60 rounded-b-xl flex">
                    <p className="font-DMSerifDisplay my-auto px-5">Starter Kit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="mx-auto px-10">
            <p className="font-black text-5xl font-DMSerifDisplay">{product.title}</p>
            <p className="font-medium text-2xl text-stone-500 py-5 font-DMSerifDisplay">{formatPrice(prodict[currVariant.title].price)}</p>
            {hasVariants && 
              <div>
                <div className="flex">
                  <p className="font-bold">Color:</p>
                  <p className="font-light ml-2">{currVariant.title}</p>
                </div>
                <div className="pt-1 pb-7 flex">
                  {product.variants.edges.map((item: any, i: number) => {
                    return (
                      <button 
                        key={i}
                        className="pr-3"
                        onClick={() => {setCurrVariant({
                          "title": item.node.title,
                          "full_image": prodict[item.node.title].productImages[0]
                        })}}>
                        <Image height={56} width={56} alt='itemImg' className="h-14 w-14 rounded-lg" src={item.node.image.url}></Image>
                      </button>
                    )
                  })}
                </div>
              </div>
            }
            <Button className={"w-full hover:bg-joobyDark transition-all ease-in-out"} onClick={() => addProduct(prodict[currVariant.title].variantId)}> ADD TO CART </Button>
            {isJooby ? 
            <div className="mt-10">
              <div className="" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            :
            <div className="mt-10">
              {description && <Accordion title={"Description"}>{description}</Accordion>}
              {whatsIncluded && <Accordion title={"What's Included"}>{whatsIncluded}</Accordion>}
              {skillLevel && <Accordion title={"Skill Level"}>{skillLevel}</Accordion>}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}