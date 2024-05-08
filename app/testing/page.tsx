import getQuery from "../utils/serverUtils"


export default async function Testing({}){


    const query = `query Products {
        products(first:100){
          edges{
            node{
              title
              handle
              priceRange{
                minVariantPrice{
                  amount
                }
              }
              description
              images(first:2){
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

    

    const products = await getQuery(query)

    return <div>Testing</div>
}
