import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardFade from "./components/DashboardFade";
import getQuery from "./utils/serverUtils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JoobyRumi",
  description: "Joobyrumi specializes in crafting high-quality kits and handmade jewelry using stainless steel and exquisite beads, catering to a diverse audience.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const currencyQuery = `query getLocalization($countryCode: CountryCode!) @inContext(country: $countryCode) {
  localization {
    availableCountries {
      currency {
        isoCode
        name
        symbol
      }
      isoCode
      name
      unitSystem
    }
    country {
      currency {
        isoCode
        name
        symbol
      }
      isoCode
      name
      unitSystem
    }
  }
}`;

const collectionsQuery = `query {
  collections(first: 20) {
    edges {
      node {
        handle
        title
      }
    }
  }
}`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const res = await getQuery(currencyQuery, {
    countryCode: 'JP',
  });

  const collections = await getQuery(collectionsQuery)

  // console.log(res.data.localization.availableCountries);
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body
        className={
          inter.className + " relative  bg-joobyWhite"
        }
      >
        <CartProvider context={res.data.localization}>
          <Navbar collections={collections.data.collections.edges}></Navbar>
          <div className="pt-[68px] sm:pt-0 overflow-auto">
            {children}
          </div>
        </CartProvider>
        <div className="hidden sm:block">
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
