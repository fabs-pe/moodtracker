import React from 'react'
import { Fugaz_One } from 'next/font/google'

const fungz = Fugaz_One({subsets: ["latin"], weight: ['400']});


export default function Button(props) {
    const { google, text, dark, full, clickHandler } = props
  return (
    <button onClick={clickHandler} className={'overflow-hidden duration-200 hover:opacity-65 border-2 border-solid border-emerald-900 rounded-md ' + 
        (dark ? ' text-white bg-emerald-900  ' : ' text-emerald-900  ') +
        (full ? ' grid place-items-center w-full  ' : '')}>

        
        <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fungz.className}>
            {props.text}
        </p>

    </button>
  )
}
