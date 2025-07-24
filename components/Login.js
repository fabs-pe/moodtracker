'use client'

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '../context/AuthContext';


const fungz = Fugaz_One({ subsets: ["latin"], weight: ['400']});



export default function Login() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')    // New state for live email validation error
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [authError, setAuthError] = useState('')      // Changed to string for error messages
  const [loginErr, setLoginError] = useState(false)

  const { signup, login } = useAuth()

  function validateEmail(value) {
    if (!value) return 'Email is required.'
    const pattern = /^[^\s@]+@[^\s@]+\.com$/
    const domainPattern = /.+@example\.com$/
    if (!pattern.test(value) || !domainPattern.test(value)) {
      return 'Please enter a valid email address ending with @example.com'
    }
    return ''
  }

  // Live validation on email change
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Run live validation and set email error state
    const validationError = validateEmail(value)
    setEmailError(validationError)

    // Clear auth errors if user fixes input
    if (validationError) {
      setAuthError('')
      setLoginError(false)
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    // Run final validation
    const emailValidationError = validateEmail(email)
    if (emailValidationError) {
      setAuthError(emailValidationError)
      return
    }
    if (!password) {
      setAuthError('Password is required.')
      return
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters long.')
      return
    }

    setAuthError('')
    setLoginError(false)
    setAuthenticating(true)

    try {
      if (isRegister) {
        console.log('signing up a new user')
        await signup(email, password)
      } else {
        console.log('logging in an existing user')
        await login(email, password)
      }
    } catch (err) {
      console.log(err.message)
      setLoginError(true)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-5xl ' + (fungz?.className || '')}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>

      <p>{isRegister.toString()}</p>

      <p>You&#39;re one step away!</p>

      <input
        value={email}
        onChange={handleEmailChange}
        type='email'
        pattern='.+@example\.com'
        className={`w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid rounded-full outline-none duration-200 
          ${emailError ? 'border-red-600' : 'border-indigo-400'} hover:border-indigo-600 focus:border-indigo-600`}
        placeholder='Email'
        required
      />

      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setAuthError('')
          setLoginError(false)
        }}
        className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600'
        placeholder='Password'
        type='password'
      />

      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : 'Submit'} full />
      </div>

      <p>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsRegister(!isRegister)} className='textGradient'>
          {isRegister ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      {/* Show submit-time validation or other auth errors */}
      <p className='text-red-600'>{authError || ' '}</p>

      {/* Show login/auth failure errors */}
      <p className='text-red-600'>{loginErr ? 'Authentication failed. Please try again.' : ' '}</p>

            {/* Show live email validation error */}
      <p className='text-red-600 text-sm mt-1 min-h-[1.25rem]'>
        {emailError || ' '}
      </p>
    </div>
  )
}

