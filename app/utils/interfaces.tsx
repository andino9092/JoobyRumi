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

export interface CartDisplay {
    id: string;
    checkoutUrl: string;
    lines: {
      edges: [
        node: {
          id: string;
          quantity: Number;
          merchandise: {
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
        }
      ]
    };
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      }
    };
}