interface ProductDisplay{
    title: string,
    handle: string,
    priceRange: {
        minVariantPrice: {
            amount: string,
        }
    },
    id: string,
    images: {
        edges: {
            url: string,
            altText: string | null
        }
    }
    totalInventory: number,

}