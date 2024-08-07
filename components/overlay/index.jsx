"use client"

import React, { useEffect } from 'react'
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

const PaymentOverlay = ({children}) => {

  return (
    <div className={`overlay ${inter.className} `} >
     {children}

     
    </div>
  )
}

export default PaymentOverlay