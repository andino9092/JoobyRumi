import { ReactNode } from "react";

export interface ProductDisplay {
  node: {
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    id: string;
    images: {
      edges: [
        {
          node: {
            url: string;
            altText: string | null;
          };
        }
      ];
    };
    totalInventory: number;
    tags: string[]
  };
}

export interface ShopAllProps {
  products: ProductDisplay[];
}

export interface ProductNode {
  id: string;
  image: {
    url: string
  }
  title: string
}

export interface ProductPage {
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  id: string;
  images: {
    edges: [
      {
        node: {
          url: string;
          altText: string | null;
        };
      }
    ];
  };
  totalInventory: number;
  description: string;
  descriptionHtml: string;
  tags: string[],
  variants: {
    edges: [
      {
        node: {
          id: string;
          price: {
            amount: string;
          }
          image: {
            url: string;
            altText: string | null;
          }
          title: string
        }
      }
    ]
  }
}

export interface JarsProps {
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  id: string;
  options: {
    name: string,
    values: string[],
  }
  images: {
    edges: [
      {
        node: {
          url: string;
          altText: string | null;
        };
      }
    ];
  };
  totalInventory: number;
  description: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    quantityAvailable: number,
    id: string;
    title: string;
    product: {
      handle: string;
      title: string;
      totalInventory: string | null;
    };
    price: {
      amount: string;
    };
    image: {
      url: string;
    };
  };
}

export interface CartContextType {
  cartLines: any;
  updateCartLines: () => void;
  showCart: boolean;
  setShowCart: (arg: boolean) => void;
  currencyList: ContextCountry[];
  currCurrency: any;
  setCurrency: (arg: any) => void;
}

export interface ContextCountry{
  currency: {
    isoCode: string,
    name: string,
    symbol: string,
  },
  isoCode: string,
  name: string,
  unitSystem: string,
}


export interface CartDisplay {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface CartIdHook {
  cartId: string,
  onCreateCart: () => void,
  clearCart: () => void,
}

export interface StaggeredCarouselProps{
  heading : string,
  children : {
   href: string,
   label: ReactNode | string, 
  }[]
}
