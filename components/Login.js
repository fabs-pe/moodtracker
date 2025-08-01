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
  const [authError, setAuthError] = useState(false)
  const [loginErr, setLoginError] = useState(false)
  

  const {signup, login, signInWithGoogle} = useAuth()

  
  
    async function handleSubmit() {
      if (!email) {
        setAuthError('Email is required.');
        return;
      }
      if (!password) {
        setAuthError('Password is required.');
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters long.');
        return;
      }
   
    setAuthenticating(true)

    try {

      if (isRegister) {
          console.log('signing up a new user')
          setLoginError(false)
          await signup(email, password)


        } else {
          console.log("logging in an existing user")
          await login(email, password)
        }
      } catch (err) {
        console.log(err.message)
        setLoginError(true)
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

        <p>{isRegister}</p>

        <p>You&apos;re one step away!</p>

        <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" pattern=".+@example\.com"
        className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-emerald-500 rounded-lg outline-none
        duration-200 hover:border-emerald-600 focus:border-emerald-600 '
                placeholder='Email' required />

        <input value={password} onChange={(e) => {setPassword(e.target.value)}}
        className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-emerald-500  rounded-lg outline-none
        duration-200 hover:border-emerald-600 focus:border-emerald-600  ' 
                placeholder='Password' type='password'/>

        <div className='max-w-[400px] w-full mx-auto'>
             <Button clickHandler={handleSubmit} 
              text={authenticating ? 'Submitting' : 'Submit' }full />
        </div>

        <p>{isRegister ? 'Already have an account?' : "Don't have an account?" }
          
            <button onClick={() => setIsRegister(!isRegister)}  className='textGradient'> 
              {isRegister ? 'Sign In' : 'Sign Up' } 
            </button>
          </p>

          <div className="max-w-[400px] w-full mx-auto">
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-md shadow hover:bg-gray-50 transition duration-150"
            >
              <span className="mr-3">
                <i className="fa-brands fa-google text-lg text-red-500"></i>
              </span>
              <span className="text-gray-700 font-semibold">Sign in with Google</span>
            </button>
          </div>  

          <p className='text-red-600'> {authError ? authError : ' '}</p>
          <p className='text-red-600'> {loginErr? 'Not Registered' : ' '}</p>
        


    </div>
  )
}
