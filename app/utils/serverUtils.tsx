

const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': String(process.env.ACCESS_TOKEN)
}

const fetchURL = String(process.env.DOMAIN_NAME)

// Takes query and returns the promised result. 
export default async function getQuery(query: string, variables: any = {}){

    const res = await fetch(fetchURL, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({query, variables}),
    }).then((res) => res.json())

    return res
}