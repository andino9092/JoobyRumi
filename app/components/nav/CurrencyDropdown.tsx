


import {
  useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { AnimatePresence } from "framer-motion";
import { CartContext } from "../CartProvider";
import { CartContextType, ContextCountry } from "@/app/utils/interfaces";
  

interface CurrencyDropdownProps {}

export default function CurrencyDropdown({}) {
  const { currencyList, currCurrency, setCurrency } =
    useContext<CartContextType>(CartContext);
  const [showDrop, setShowDrop] = useState<boolean>(false);
  // console.log(currencyList);

  const handleClick = (e: any) => {
    if (e.target.id != 'currencyDropdown'){
      setShowDrop(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {

      window.document.addEventListener('click', handleClick);
    }

    return () => {
      if (typeof window != undefined) {
        window.document.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div>
      <div
        id='currencyDropdown'
        onClick={() => {
          setShowDrop((prev) => !prev);
        }}
        className="absolute right-10 top-5 text-lg font-sans font-thin flex justify-center"
      >
        {currCurrency.name} | {currCurrency.currency.symbol}{" "}
        {currCurrency.currency.isoCode}
        <AnimatePresence>
          {showDrop && (
            <ul className="absolute overflow-y-scroll z-20 bg-joobyWhite min-w-max h-[200px] translate-y-10">
              {currencyList.map((item: ContextCountry, i: any) => {
                return (
                  <li className="p-4 hover:bg-joobyLightPink" key={i}>
                    {item.name} | {item.currency.symbol} {item.currency.isoCode}
                  </li>
                );
              })}
            </ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}