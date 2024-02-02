'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import Style from './page.module.css'
import Link from 'next/link'

function SignUpPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Please enter the details')
      return
    }
    signUpUser()
  }

  const signUpUser = async () => {
    const api = `${process.env.NEXT_PUBLIC_API}/auth/signUp `
    try {
      const createUser = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const savedUser = await createUser.json()
      console.log(savedUser)

      if (!createUser.ok) {
        setErrorMessage(savedUser.message)
      }
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <div
      className={`flex p-[36px]  items-center gap-[8px] justify-center flex-col  ${Style.gradient}`}
    >
      <Image
        src={'/assets/ClassX.svg'}
        width={125}
        height={51}
        alt='classX logo'
        unoptimized
      />
      <form
        className='flex items-center flex-col w-[100%] gap-[12px] '
        onSubmit={handleOnSubmit}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]' >Email</p>
          <Input
            type='email'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Email'
            onChange={handleEmail}
            required
          />
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]' >Password</p>
          <Input
            type='password'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Password'
            onChange={handlePassword}
            required
          />
        </label>
        <Button
          className='rounded-full text-white px-[24px] py-[3px]'
          type='submit'
        >
          Create account
        </Button>
      </form>
      {errorMessage && (
        <p className='text-center  error_message'>
          Error: <span className='text-red-500'> {errorMessage}</span>
        </p>
      )}
      <p className='text-center  error_message'>
        Already have an account?{' '}
        <Link href={'/auth/sign-in'} className='mt-[10px]'>
          <span className='text-[#891DCC]'>Sign in</span>
        </Link>
      </p>
    </div>
  )
}

export default SignUpPage
