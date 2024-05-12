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
  variants: {
    edges: [
      {
        node: {
          id: string;
          image: {
            url: string
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
    id: string;
    product: {
      handle: string;
      title: string;
      totalInventory: string | null;
    };
  };
  price: {
    amount: string;
  };
  image: {
    url: string;
  };
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
