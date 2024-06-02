import { ReactNode, useState } from "react";
import Link from "next/link";
import NavBarItem from "./NavBarItem";
import ShopSections from "./ShopSections";

interface NavDropDownProps {
  children?: ReactNode;
  label?: string;
  width?: number; // in pixels
  href: string;
}

// Label is name of navbar item
// Children contains dropdown items
export default function NavDropDown({
  children,
  label,
  width,
  href,
}: NavDropDownProps) {
  const [navItemHover, setNavItemHover] = useState<boolean>(false);
  const [dropDownHover, setDropDownHover] = useState<boolean>(false);

  const onMouseOver = (e: any) => {
    setNavItemHover(true);
  };

  const onMouseLeave = (e: any) => {
    if (!dropDownHover) {
      setNavItemHover(false);
    }
  };

  return (
    <>
      <div style={{ width: `${width}px` }}>
        <div id="shop" className="w-max">
          <div className="w-full flex flex-row justify-center">
            <Link href={href}>
              <NavBarItem onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                <h1>{label}</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className={`w-5 h-5 ml-2 ${
                    (navItemHover || dropDownHover) && "rotate-180"
                  } duration-200 transition-all stroke-joobyDark`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </NavBarItem>
            </Link>
            <ShopSections
              sectionHover={dropDownHover}
              setSectionHover={setDropDownHover}
              hover={navItemHover}
              setHover={setNavItemHover}
            >
              {children}
            </ShopSections>
          </div>
        </div>
      </div>
    </>
  );
}
