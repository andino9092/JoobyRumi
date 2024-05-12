'use server'

import { cookies } from 'next/headers'

async function createCookie(data:string) {
  cookies().set({
    name: 'cartid',
    value: data,
    httpOnly: true,
    path: '/',
  })
}

// async function getCookie() {
//   cookies().set({
//     name: 'cartid',
//     value: data,
//     httpOnly: true,
//     path: '/',
//   })
// }