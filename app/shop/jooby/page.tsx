


// Jooby Products

const joobyQuery = `query Products {
    products(first:100, query: "tag:jooby"){
      edges{
        node{
          title
          priceRange{
            minVariantPrice{
              amount
            }
          }
          handle
          images(first:10){
            edges{
              node{
                url
                altText
              }
            }
          }
          totalInventory
        }
      }
    }
  }`
  
export default async function JoobyStore({}){



    return (
        <div>
          Jooby Products
        </div>
    )
}