'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa6'
import useSignUpUser from '@/hooks/auth/useSignUpUser'

function SignUpPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [completeDetails, setCompleteDetails] = useState<string>('')

  const { loading, message, errorMessage, signUp } = useSignUpUser()

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      setCompleteDetails('Please enter the details')
      return
    }
    await signUp(email, password)
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
          className='rounded-full text-white px-[24px] py-[3px]'
          type='submit'
        >
          {loading ? 'Creating account..' : 'Create account'}
        </Button>
      </form>
      {(errorMessage || completeDetails) && (
        <p className='text-center  error_message'>
          Error:{' '}
          <span className='text-red-500'>
            {' '}
            {errorMessage || completeDetails}
          </span>
        </p>
      )}
      <div className='text-center  error_message'>
        Already have an account?{' '}
        <Link href={'/auth/sign-in'} className='mt-[10px]'>
          <span className='text-[#891DCC]'>Sign in</span>
        </Link>
      </div>
    </section>
  )
}

export default SignUpPage
