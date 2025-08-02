'use client'

import React from 'react'
import Button from './Button'
import { useAuth } from '../context/AuthContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Logout() {
    const { logout, currentUser} = useAuth()
    const pathname = usePathname()
    if (!currentUser){
        return null
    }

    if (pathname === '/'){
        // return null
        return (
            <Link href={ '/dashboard'}>
                <Button text="Dashboard" />
            </Link>
            
        )
    }
    
  return (
    <>
        {/* <Link href = { '/journal'}> */}
            {/* <Button text="Journal" />
        </Link> */}

        <Button text='Logout' clickHandler={logout} dark />
  </>
  )
}
