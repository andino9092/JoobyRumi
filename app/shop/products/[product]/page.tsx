export default function ProductTemplate({params}: {params: {product: string}}){

    // Fetching
    

    return (
        <div>
            {params.product}
        </div>
    )
}
