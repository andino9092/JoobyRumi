'use client'

import useSet from "../utils/hooks/useSet";


// Test Client Components



export default function Tester({}){


    const {set, has, add, remove} = useSet([1, 2, 3]);

    console.log(has([1,2,3]));

    return (
        <div>
            
        </div>
    )
}