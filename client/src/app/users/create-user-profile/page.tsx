'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'

interface Branch {
  _id: string
  branchName: string
}

function SignUpPage() {
  const navigate = useRouter()

  // all states
  const [username, setUsername] = useState<string>('')
  const [enrollmentNo, setEnrollmentNo] = useState<string>('')
  const [branch, setBranch] = useState<string>('')
  const [division, setDivision] = useState<string>('')
  const [semester, setSemester] = useState<number | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [branchNames, setBranchNames] = useState<Branch[]>([])
  const [isSemestersLoading, setIsSemesterLoading] = useState<boolean>(false)
  const [isBranchLoading, setIsBranchLoading] = useState<boolean>(true)

  // all handles
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleEnrollmentNo = (e: ChangeEvent<HTMLInputElement>) => {
    setEnrollmentNo(e.target.value)
  }

  const handleBranch = (value: string) => {
    setBranch(value)
  }

  const handleDivision = (e: ChangeEvent<HTMLInputElement>) => {
    setDivision(e.target.value)
  }

  const handleSemester = (value: string) => {
    const sem = parseInt(value, 10)
    setSemester(sem)
  }

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !username ||
      !enrollmentNo ||
      !branch ||
      !division ||
      semester === undefined
    ) {
      setErrorMessage('Please enter all the details')
      return
    }
    signUpUser()
  }

  useEffect(() => {
    getBranchNames()
  }, [])

  // handling fetches
  const signUpUser = async () => {
    const api = `${process.env.NEXT_PUBLIC_API}/auth/signUp`
    setIsLoading(true)
    try {
      const createUser = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          enrollmentNo,
          branch,
          division,
          semester,
        }),
      })
      const savedUser = await createUser.json()
      console.log(savedUser)
      if (!createUser.ok) {
        setErrorMessage(savedUser.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }
      navigate.push('/users/create-user-profile')
      Cookies.set('classX_user_token', savedUser.token, { expires: 30 })
    } catch (err: any) {
      console.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getBranchNames = async () => {
    const api = `${process.env.NEXT_PUBLIC_API}/branches/get-branch`
    setIsBranchLoading(true)
    try {
      const branches = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('classX_user_token')}`,
        },
      })

      const result = await branches.json()
      setBranchNames(result.data)
      if (!branches.ok) {
        console.error(result.message)
        setErrorMessage(result.message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setIsBranchLoading(false)
    }
  }

  const getSemesterOfBranch = async () => {
    const api = `${process.env.NEXT_PUBLIC_API}`
    setIsSemesterLoading(true)
    try {
    } catch (err) {
    } finally {
      setIsSemesterLoading(false)
    }
  }

  return (
    <div
      className={`flex p-[36px] items-center gap-[8px] justify-center flex-col gradient`}
    >
      <Image
        src={'/assets/ClassX.svg'}
        width={125}
        height={51}
        alt='classX logo'
        unoptimized
      />
      <form
        className='flex items-center flex-col md:w-[30%] sm:w-[50%] w-[100%] gap-[12px]'
        onSubmit={handleOnSubmit}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Username</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Username'
            onChange={handleUsername}
            required
          />
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Enrollment No</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enrollment No'
            onChange={handleEnrollmentNo}
            required
          />
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Branch</p>
          <Select onValueChange={handleBranch} disabled={isBranchLoading}>
            <SelectTrigger className='bg-[#171717] border-none outline-none rounded-full  px-[16px]'>
              <SelectValue
                placeholder={
                  isBranchLoading
                    ? 'Branches are loading..'
                    : 'Select your branch'
                }
              />
            </SelectTrigger>
            <SelectContent className='bg-[#171717]'>
              {branchNames?.map((branch: Branch) => {
                return (
                  <SelectItem
                    key={branch._id}
                    className='bg-[#171717]'
                    value={branch.branchName}
                  >
                    {branch.branchName.toUpperCase()}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </label>

        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Division</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Division'
            onChange={handleDivision}
            required
          />
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Semester</p>
          <Select onValueChange={handleSemester}>
            <SelectTrigger className='bg-[#171717] border-none outline-none rounded-full  px-[16px]'>
              <SelectValue
                className='text-green-500'
                placeholder='Select your semester'
              />
            </SelectTrigger>
            <SelectContent className='bg-[#171717]'>
              <SelectItem className='bg-[#171717]' value='1'>
                1
              </SelectItem>
              <SelectItem className='bg-[#171717]' value='2'>
                2
              </SelectItem>
              <SelectItem className='bg-[#171717]' value='3'>
                3
              </SelectItem>
            </SelectContent>
          </Select>
        </label>

        <Button
          className='rounded-full text-white px-[24px] py-[3px]'
          type='submit'
        >
          {isLoading ? 'Submitting....' : 'Submit'}
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
