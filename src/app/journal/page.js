'use client'

import React, { useEffect, useState } from 'react'
import Editor from '../../../components/Editor'
import Main from '../../../components/Main';
import { useAuth } from '../../../context/AuthContext';
import Loading from '../../../components/Loading';
import Login  from '../../../components/Login'
import Dashboard from '../../../components/Dashboard';
import { Fugaz_One } from 'next/font/google';

const fungz = Fugaz_One({ subsets: ["latin"], weight: ['400']});




// export const metadata = {
//   title: "Mood ⋅ Journal ",
// };

export default function JournalPage() {

  const {currentUser, loading, userDataObj } = useAuth()
   const [data, setData] = useState({})
  
  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }


  return (
    <Main>
          <div className='py-4 md:py-12 flex flex-col gap-8 sm:gap-10 '>
        <h1 className={'text-5xl sm:text-text-5xl md:text-5xl text-center ' + fungz.className}>
            <span className='textGradient'>MyJournal</span> helps you track your 
            <span className='textGradient'> daily</span> thoughts!
        </h1>
        <p className='text-lg sm:text:xl md:text-2xl text-center w-full mx-auto max-w-[700px] '>
           Record your thougths and review
            <span className='font-semibold'> when needed</span>
        </p>
        </div>
      <div className='flex flex-col items-center gap-2 flex-1  border-emerald-800 border-solid purpleShadowBox'>
        <Editor />
      </div>
    </Main>
  )
}
