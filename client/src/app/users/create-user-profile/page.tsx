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
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react'

interface Branch {
  _id: string
  branchName: string
}

interface SemesterNumber {
  _id: string
  semesterNumber: number
}

function SignUpPage() {
  const navigate = useRouter()

  // all states of single value
  const [name,setName] = useState<string>('');
  const [username, setUsername] = useState<string>('')
  const [enrollmentNo, setEnrollmentNo] = useState<string>('')
  const [division, setDivision] = useState<string>('')
  const [userBranch, setUserBranch] = useState<string>('')
  const [userSemester, setUserSemester] = useState<number | undefined>(undefined)
  
  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(undefined)
  const [message, setMessage] = useState<string>('')

  // all states of array
  const [semesters, setSemesters] = useState<SemesterNumber[]>([])
  const [branchNames, setBranchNames] = useState<Branch[]>([])

  // all states of error
  const [errorMessage, setErrorMessage] = useState<string>('')

  // all states of loading
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSemestersLoading, setIsSemesterLoading] = useState<boolean>(true)
  const [isBranchLoading, setIsBranchLoading] = useState<boolean>(true)

  // all handles
  const handleName = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleEnrollmentNo = (e: ChangeEvent<HTMLInputElement>) => {
    setEnrollmentNo(e.target.value)
  }

  const handleBranch = (value: string) => {
    setUserBranch(value)
    getSemesterOfBranch(value)
  }

  const handleDivision = (e: ChangeEvent<HTMLInputElement>) => {
    setDivision(e.target.value)
  }

  const handleSemester = (value: string) => {
    const sem = parseInt(value, 10)
    setUserSemester(sem)
  }

  const handleIsPrivateAccount = (value: string) => {
    const booleanValue = value.toLowerCase() === 'true'
    setIsPrivate(booleanValue)
  }

  useEffect(() => {
    getBranchNames()
  }, [])

  // handling fetches
  const createUserProfile = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault()
    if (
      !name ||
      !username ||
      !enrollmentNo ||
      !userBranch ||
      !division ||
      userSemester === undefined ||
      isPrivate === undefined
    ) {
      setErrorMessage('Please enter all the details')
      return
    }
    const userDetails = {
      name: name,
      username: username,
      enrollmentNumber: enrollmentNo,
      branchName: userBranch,
      semesterNumber: userSemester,
      divisionName: division,
      isPrivate: isPrivate,
    }

    const api = `${process.env.NEXT_PUBLIC_API}/users/create-user-profile`
    console.log(userDetails)
    try {
      const createUser = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('classX_user_token')}`,
        },
        body: JSON.stringify(userDetails),
      })

      const user = await createUser.json()

      if (!createUser.ok) {
        console.error(
          `${user.message}`
        )
        setErrorMessage(
          `${user.message}`
        )
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }

      const { message } = await user
      setMessage(message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (err: any) {
      console.error(err.Message)
      setErrorMessage(err.Message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } finally {
      setIsLoading(false);
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
      if (!branches.ok) {
        console.log(result.Message)
        setErrorMessage(result.Message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }

      setBranchNames(result.data)
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setIsBranchLoading(false)
    }
  }

  const getSemesterOfBranch = async (branchName: string) => {
    const api = `${process.env.NEXT_PUBLIC_API}/branches/get-semester?branchName=${branchName}`
    setIsSemesterLoading(true)

    try {
      const getSemester = await fetch(api, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('classX_user_token')}`,
        },
      })

      if (!getSemester.ok) {
        const result = await getSemester.json()
        console.log(
          `${result.message}`
        )
        setErrorMessage(
          `${result.message}`
        )
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }

      const result = await getSemester.json()
      console.log(result)
      setSemesters(result.data.semesters)
      console.log(semesters)
    } catch (err) {
      console.error(err)
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
        onSubmit={createUserProfile}
      >
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>name</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enter full name'
            onChange={handleName}
            required
          />
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Username</p>
          <Input
            type='text'
            className='rounded-full bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enter a unique username'
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
          <Select onValueChange={handleSemester} disabled={isSemestersLoading}>
            <SelectTrigger className='bg-[#171717] border-none outline-none rounded-full  px-[16px]'>
              <SelectValue
                className='text-green-500'
                placeholder='Select your semester'
              />
            </SelectTrigger>
            <SelectContent className='bg-[#171717]'>
              {semesters?.map((semester: SemesterNumber) => {
                return (
                  <SelectItem
                    key={semester._id}
                    className='bg-[#171717]'
                    value={semester.semesterNumber.toString()}
                  >
                    {semester.semesterNumber}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </label>
        <label className='w-full mb-[4px]'>
          <p className='mb-[2px]'>Private account</p>
          <Select onValueChange={handleIsPrivateAccount}>
            <SelectTrigger className='bg-[#171717] border-none outline-none rounded-full  px-[16px]'>
              <SelectValue placeholder='Private account?' />
            </SelectTrigger>
            <SelectContent className='bg-[#171717]'>
              <SelectItem className='bg-[#171717]' value='true'>
                True
              </SelectItem>
              <SelectItem className='bg-[#171717]' value='false'>
                False
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
      {message && (
        <p className='text-center  error_message'>
          Success: <span className='text-green-500'> {message}</span>
        </p>
      )}

    </div>
  )
}

export default SignUpPage
