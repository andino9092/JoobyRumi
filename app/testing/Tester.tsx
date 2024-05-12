'use client'

import Cart from "../cart/page"



// Test Client Components



export default function Tester({}){

    const testCart = () => {
        document.getElementById('cartContainer')?.setAttribute('style', 'z-index: 10')
        setTimeout(() => {
            document.getElementById('cart')?.setAttribute('style', 'width:500px;')

        }, 150)
        
    }

    return (
        <div>
            <button onClick={testCart}>
                Test Cart
            </button>
        </div>
    )
}