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
