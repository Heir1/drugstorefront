"use client"
import React from 'react'
import { Icon } from '@iconify/react'; // Import Iconify's Icon component

export default function loading() {
  return (
    <div className=" fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[#00000040] z-50 ">
        <div className="w-[8em] h-[8em]  ">
            <Icon icon="svg-spinners:90-ring-with-bg" className="text-[#597EEE] text-[3em]"/>
        </div>
    </div>
  )
}
