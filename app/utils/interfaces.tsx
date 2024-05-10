export interface ProductDisplay {
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
}

export interface ProductPage extends ProductDisplay {
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
      node: CartLine
    }[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}
