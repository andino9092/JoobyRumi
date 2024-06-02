import { useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../CartProvider";
import { CartContextType, ContextCountry } from "@/app/utils/interfaces";

interface CurrencyDropdownProps {}

export default function CurrencyDropdown({ setShowDrawer }: any) {
  const { currencyList, currCurrency, setCurrency } =
    useContext<CartContextType>(CartContext);
  const [showDrop, setShowDrop] = useState<boolean>(false);
  // console.log(currencyList);

  const handleClick = (e: any) => {
    if (e.target.id != "currencyDropdown") {
      setShowDrop(false);
    }
  };

  useEffect(() => {
    if (typeof window != undefined) {
      window.document.addEventListener("click", handleClick);
    }

    return () => {
      if (typeof window != undefined) {
        window.document.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (

      <div className=" relative sm:flex-row sm:right-10  sm:text-joobyDark  font-DMSerifDisplay font-thin sm:flex sm:justify-center">
        <div
          id="currencyDropdown"
          onClick={() => {
            setShowDrop((prev) => !prev);
          }}
          className="sm:hover:cursor-pointer sm:border-b-2 sm:border-joobyDark"
        >
          {currCurrency.name} ({currCurrency.currency.isoCode}{" "}
          {currCurrency.currency.symbol})
        </div>
        <AnimatePresence>
          {showDrop && (
            <motion.ul className="absolute sm:-left-20 sm:-bottom-[210px] text-base sm:text-sm bottom-[25px] -left-2 overflow-y-scroll z-20 bg-joobyWhite text-joobyDark shadow-lg min-w-max h-[200px]">
              {currencyList.map((item: ContextCountry, i: any) => {
                return (
                  <li
                    onClick={(e: any) => {
                      setCurrency(item);
                      if (setShowDrawer) {
                        setShowDrawer(false);
                      }
                    }}
                    className="p-4 py-6 hover:bg-joobyLightPink"
                    key={i}
                  >
                    {item.name} | {item.currency.symbol} {item.currency.isoCode}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
  );
}
