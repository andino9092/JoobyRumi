import Image from "next/image"


interface LoadingProps{
    className: string,
    width?: number,
    height?: number
}


export default function Loading({className, width, height}: LoadingProps){

    return (
        <div>

            <img alt='loadingImg' src='/loading.jpg' className={className}></img>

        </div>
    )
}