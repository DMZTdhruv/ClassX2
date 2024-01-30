'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Styles from './page.module.scss'
import Link from 'next/link'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitForm = e => {
    e.preventDefault()
  }

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className={`font-Poppins  flex flex-col gap-3 items-center justify-center md:w-[50vw] w-[80vw]`}
      >
        <label className='w-full'>
          Email:
          <br />
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full rounded-full px-3 py-1.5  mt-2 bg-Primary_gray hover:bg-Primary_gray/50   outline-none border-none'
            required
          />
        </label>
        <label className='w-full'>
          Password:
          <br />
          <input
            type='password'
            placeholder='Enter your password'
            className='w-full rounded-full px-3 py-1.5 mt-2 bg-Primary_gray hover:bg-Primary_gray/50  outline-none border-none '
            required
          />
        </label>
        <button className=' bg-Primary_purple hover:bg-Primary_purple/30 transition-all  px-3 py-1  mt-5  rounded-full'>
          Create account
        </button>
      </form>

      <p>Already have an account? <Link href="/" className='' >Sign in</Link> </p>
    </>
  )
}

export default SignInForm
