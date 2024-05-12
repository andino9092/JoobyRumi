"use client";

import { useRef, useState } from "react";

// Props: Takes in children and function that returns a Promise

// Behavior:
// 1. When user clicks once, it will run the onClick=
// 2. Button is disabled while effect is being run
// Note: We shouldn't let user spam click. Display a loading animation while effect is loading

export default function Button({ children, onClick }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleWrapper = async (...args: any) => {
    return new Promise((resolve, reject) => {
        let res;
        try {
            res = onClick(...args)
        }
        catch{
            reject('Error with event handler')
        }
        resolve(res);
    })
  }

  const handleClick = async (...args: any) => {
    if (!buttonRef.current) {
      return;
    }
    buttonRef.current.disabled = true;
    await handleWrapper(args)
      .then((_: any) => {
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
        }
      })
      .catch((error: string) => {
        console.log(error)
        if (buttonRef.current) {
          buttonRef.current.disabled = false;
        }
      });
  };

  return (
    <div>
      <button ref={buttonRef} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}
