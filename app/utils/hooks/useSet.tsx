import { useState } from "react"

export default function useSet(initialSet: any){


    const [set, setState] = useState<any>(new Set(initialSet))
    
    const has = (...args: any) => {
        if (Array.isArray(args[0])){
            const otherSet = new Set(args[0])
            console.log(otherSet)
            return set.isSupersetOf(otherSet)
        }
        else{
            return set.has(args[0]);
        }
    }

    const add = (val: any) => {
        setState((prev: any) => [...prev, val])
    }

    const remove = (val: any) => {
        set.delete(val)
    }


    return {set, has, add, remove}

}