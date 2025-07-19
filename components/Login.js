'use client'

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '../context/AuthContext';


const fungz = Fugaz_One({ subsets: ["latin"], weight: ['400']});


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] =useState(false)
  const [authenticating, setAuthenticating] =useState(false)
  const {signup, login} = useAuth()

  async function handleSubmit(){
    if (!email || !password || password.length < 6 ) {
      // setErrorMessage("Email and password are required.");
      return "Email and password are required."
    }

    setAuthenticating(true)

    try {

      if (isRegister) {
          console.log('signing up a new user')
          await signup(email, password)
        } else {
          console.log("logging in an existing user")
          await login(email, password)
        }
      } catch (err) {
        console.log(err.message)
        await login(email, password)
      } finally {
        setAuthenticating(false)
      }
   }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
        <h3 className={'text-4xl sm:text-5xl md:text-5xl ' + fungz.className}>
          {isRegister ? 'Register' : 'Log In'}
        </h3>

        <p>You&apos;re one step away!</p>

        <input value={email} onChange={(e) => {setEmail(e.target.value)}} 
        className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none
        duration-200 hover:border-indigo-600 focus:border-indigo-600 '
                placeholder='Email'/>

        <input value={password} onChange={(e) => {setPassword(e.target.value)}}
        className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none
        duration-200 hover:border-indigo-600 focus:border-indigo-600 ' 
                placeholder='Password' type='password'/>

        <div className='max-w-[400px] w-full mx-auto'>
             <Button clickHandler={handleSubmit} 
              text={authenticating ? 'Submitting' : 'Submit' }full />
        </div>

        <p>{isRegister ? 'Already have an account?' : "Don't have an account?" }
          
            <button onClick={() => setIsRegister(!isRegister)} className='textGradient'> 
              {isRegister ? 'Sign In' : 'Sign Up' }
            </button>
          </p>

          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          

    </div>
  )
}
