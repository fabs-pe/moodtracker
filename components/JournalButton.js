'use client'

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Button from './Button'

export default function JournalButton() {
    const { currentUser } =useAuth()
    const pathname = usePathname()
    if (!currentUser){
        return null
    }

    if (pathname === '/') {
  return (
    <Link href="/journal">
      <Button text="Journal"  dark/>
    </Link>
  );
} else if (pathname === '/journal') {
  return (
    <Link href="/dashboard">
      <Button text="Dashboard" dark />
    </Link>
  );
}


    // if (pathname === '/' ){
    //     return(
    //     <Link href ={'/journal'}>
    //         <Button text="Journal" />
    //     </Link>
    //     ) 
    // }

    // if(pathname === '/journal'){
    //     <Link href ={'/dashboard'}>
    //         <Button text ="Dashboard" dark />
    //     </Link>
    // }
  return (
    <>
        <Link href = { '/journal'}> 
            <Button text="Journal" />
        </Link>

    </>
  )
}
