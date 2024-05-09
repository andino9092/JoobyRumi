import { defaultHeaders, fetchURL } from "@/app/utils/serverUtils";


export async function POST(request: Request){
    // const res = await fetch(fetchURL, {
    //     method: 'POST',
    //     headers: defaultHeaders,
    //     body: JSON.stringify({
    //         query: getCart,
    //         variables: { id: "gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSFhGOTVLS0FSMEVFNERQQlozWVRRS0cy" }
    //     }),
    // })
    // console.log(res);
    // console.log("Received request to fetch cart data:", responseData);
    // return Response.json({ data });
    return Response.json({data:'hello'});
}
