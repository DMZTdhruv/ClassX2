'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

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
    signInUser()
  }

  const signInUser = async () => {
    const api = `${process.env.NEXT_PUBLIC_API}/auth/signIn`
    setIsLoading(true)
    try {
      const checkUser = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })


      const existingUser = await checkUser.json()
      if (!checkUser.ok) {
        setErrorMessage(existingUser.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }
      Cookies.set('classX_user_token', existingUser.token, {
        expires: 30,
      })
      setMessage(existingUser.message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      console.log(existingUser.token)
      Cookies.set('classX_user_token', existingUser.token, {
        expires: 30,
        secure: true,
        httpOnly: true,
      })
      router.push('/')
    } catch (err: any) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      className={`flex p-[36px]  items-center gap-[8px] justify-center flex-col gradient`}
    >
      <Image
        src={'/assets/ClassX.svg'}
        width={125}
        height={51}
        alt='classX logo'
        unoptimized
      />
      <form
        className='flex items-center flex-col md:w-[30%] sm:w-[50%] w-[100%]  gap-[12px] '
        onSubmit={handleOnSubmit}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Email</p>
          <Input
            type='email'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Email'
            onChange={handleEmail}
            required
          />
        </label>
        <label className='w-full mb-[4px] relative '>
          <p className='mb-[2px]'>Password</p>
          <Input
            type={showPassword ? 'text' : 'password'}
            className='rounded-full relative bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Password'
            onChange={handlePassword}
            required
          />
          <button
            className='show_password cursor-pointer  absolute top-[35px] z-10  right-[12px]'
            onClick={() => setShowPassword(prev => !prev)}
            type='button'
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>
        <Button
          className='rounded-full text-white px-[24px] py-[3px] transition-all'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in '}
        </Button>
      </form>
      {errorMessage && (
        <p className='text-center  error_message'>
          Error: <span className='text-red-500'> {errorMessage}</span>
        </p>
      )}
      {message && (
        <p className='text-center  error_message'>
          Success: <span className='text-green-500'> {message}</span>
        </p>
      )}
      <div className='text-center  error_message'>
        Don&apos;t have an account?
        <Link href={'/auth/sign-up'} className='mt-[10px] ml-[5px]'>
          <span className='text-[#891DCC]'>Sign up</span>
        </Link>
      </div>
    </section>
  )
}

export default SignInPage
