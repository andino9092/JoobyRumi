"use client";

import { useContext, useState } from "react";
import Button from "./Button";
import { CartContext } from "./CartProvider";
import Accordion from "./Accordion";
import { formatPrice } from "../utils";
import Image from "next/image";

export default function Product({prodict, product, hasVariants, isJooby, description, whatsIncluded, skillLevel}: any) {
  const {cartLines, updateCartLines, showCart, setShowCart} = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
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
      console.log('here' +  req)
      localStorage.setItem("cartid", req.data.cartCreate.cart.id)
    }

    updateCartLines();

    setShowCart(true);
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="flex flex-col max-w-[1600px] md:py-14 md:px-[70px] md:flex-row md:flex-wrap">
        <div className="md:w-7/12 md:h-fit md:flex md:flex-col md:order-1">
          <div className="flex flex-col flex-col-reverse md:flex-row md:w-full">
            {/* <div className="hidden md:block">
              {prodict[currVariant.title].productImages.map((item: any, i: number) => {
                return (
                  <button key={i}>
                    <Image alt='product' key={item} className="rounded-xl" src={item} onClick={() => {setCurrVariant(prev => ({...prev, "full_image": item}))}} width={100} height={100}></Image>
                  </button>
                )
              })}
            </div> */}
            <div className="flex flex-row justify-center mt-3 md:flex-col md:justify-start md:mt-0 md:w-[14.285%]">
              {prodict[currVariant.title].productImages.map((item: any, i: number) => {
                return (
                  <button className="mr-2 md:mr-0 md:mb-3 md:w-full" key={i}>
                    <Image alt='product' key={item} className="rounded-xl border-2 border-joobyDark md:border-0 md:w-full md:object-cover md:object-center" src={item} onClick={() => {setCurrVariant(prev => ({...prev, "full_image": item}))}} width={80} height={80}></Image>
                  </button>
                )
              })}
            </div>
            <div className="w-full md:w-[85.714%] md:aspect-square md:ml-5">
              <img className="object-cover object-center w-full md:rounded-2xl lg:shadow-3xl" src={currVariant.full_image} width={400} height={400}></img>
            </div>
          </div>

          {!isJooby && <div className="hidden md:flex md:bg-joobyLightPink md:h-[300px] md:w-full md:mt-16 md:rounded-3xl min-[950px]:h-[350px]">
              <div className="w-fit m-auto">
                <p className="font-DMSerifDisplay text-2xl mb-2">A Perfect Pair</p>
                <div className="flex">
                  <div className="w-fit">
                    <div className="bg-joobyDark h-40 w-40 rounded-t-xl max-[950px]:h-32 max-[950px]:w-32"></div>
                    <div className="bg-white h-10 w-40 rounded-b-xl flex max-[950px]:w-32">
                      <p className="font-DMSerifDisplay text-joobyDark text-sm my-auto px-4">Jooby Newbie Kit</p>
                    </div>
                  </div>
                  <div className="text-4xl font-joobyDark my-auto px-2">
                    +
                  </div>
                  <div className="w-fit">
                    <div className="bg-joobyDark h-40 w-40 rounded-t-xl max-[950px]:h-32 max-[950px]:w-32"></div>
                    <div className="bg-white h-10 w-40 rounded-b-xl flex max-[950px]:w-32">
                      <p className="font-DMSerifDisplay text-joobyDark text-sm my-auto px-4">Starter Kit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}


        </div>
        
        <div className="flex flex-col order-2 w-full px-[20px] md:w-5/12 md:px-10 lg:px-14">
          <div className="md:order-1">
            <p className="font-DMSerifDisplay font-black text-5xl text-joobyDark mt-5 md:mt-[0px]">{product.title}</p>
            <p className="font-medium text-2xl text-joobyDark pt-2 pb-7 font-DMSerifDisplay">{formatPrice(prodict[currVariant.title].price)}</p>
          </div>

          <div className="md:order-3">
            {hasVariants && 
              <div>
                <div className="flex">
                  <p className="font-bold text-xl text-joobyDark">Color:</p>
                  <p className="font-light ml-2 text-xl text-joobyDark">{currVariant.title}</p>
                </div>
                <div className="pt-1 pb-3 flex flex-row flex flex-row overflow-x-auto no-scrollbar">
                  {product.variants.edges.map((item: any, i: number) => {
                    return (
                      <button 
                        key={i}
                        className="pr-3 shrink-0"
                        onClick={() => {
                          setCurrVariant({
                            "title": item.node.title,
                            "full_image": prodict[item.node.title].productImages[0]
                          })
                          setQuantity(1)
                        }}>
                        <Image height={56} width={56} alt='itemImg' className="object-cover object-center h-[56px] w-[56px] rounded-lg shrink-0" src={item.node.image.url}></Image>
                      </button>
                    )
                  })}
                </div>
              </div>
            }
            <div className="flex justify-between pb-7 w-full flex-wrap">
              <p className="font-bold text-xl text-joobyDark my-auto mr-3 mb-1">Quantity</p>
              <div className="border-[1px] border-joobyDark p-3 rounded-xl flex">
                <CartButton
                  onClick={() => (setQuantity((prev: any) => (prev -  1)))}
                  disabled={quantity <= 1}
                >
                  <span className="text-3xl text-joobyDark">-</span>
                </CartButton>
                  <span className="px-2 mx-3 pt-1 text-2xl text-joobyDark w-10 text-center">{quantity}</span>
                <CartButton
                  onClick={() => (setQuantity((prev: any) => (prev +  1)))}
                  disabled={quantity >= prodict[currVariant.title].totalInventory}
                >
                  <span className="text-3xl text-joobyDark">+</span>
                </CartButton>
              </div>
            </div>
            <Button className={"w-full hover:bg-joobyDark transition-all ease-in-out mb-8"} onClick={() => addProduct(prodict[currVariant.title].variantId)}> ADD TO CART </Button>
          </div>

          {/* <div className="order-3 px-[20px] my-5">
            {!isJooby ? 
            <div className="">
              <div className="" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            :
            <div className="">
              {description && <Accordion title={"Description"}>{description}</Accordion>}
              {whatsIncluded && <Accordion title={"What's Included"}>{whatsIncluded}</Accordion>}
              {skillLevel && <Accordion title={"Skill Level"}>{skillLevel}</Accordion>}
            </div>}
          </div> */}

          <div className="mb-5 md:order-2">
              <div className="" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        {!isJooby && <div className="order-3 flex bg-joobyLightPink h-[350px] w-full md:hidden">
          <div className="w-fit m-auto">
            <p className="font-DMSerifDisplay text-2xl mb-2">A Perfect Pair</p>
            <div className="flex">
              <div className="w-fit">
                <div className="bg-joobyDark h-40 w-40 rounded-t-xl"></div>
                <div className="bg-white h-10 w-40 rounded-b-xl flex">
                  <p className="font-DMSerifDisplay text-joobyDark text-sm my-auto px-4">Jooby Newbie Kit</p>
                </div>
              </div>
              <div className="text-4xl font-joobyDark my-auto px-2">
                +
              </div>
              <div className="w-fit">
                <div className="bg-joobyDark h-40 w-40 rounded-t-xl"></div>
                <div className="bg-white h-10 w-40 rounded-b-xl flex">
                  <p className="font-DMSerifDisplay text-joobyDark text-sm my-auto px-4">Starter Kit</p>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

function CartButton({ onClick, disabled, children }: any) {
  return (
    <button
      className="px-2 disabled:opacity-20"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}