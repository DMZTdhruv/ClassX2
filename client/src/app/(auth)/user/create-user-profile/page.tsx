'use client'

import { MdDeleteOutline } from 'react-icons/md'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGenerateLink } from '@/hooks/useGenerateLink'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import Image from 'next/image'
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  ChangeEventHandler,
} from 'react'
import { SanityImageAssetDocument } from '@sanity/client'
import { Textarea } from '@/components/ui/textarea'
import useCreateUserProfile from '@/hooks/user/useCreateUserProfile'
import { Api } from '@/Constants'

interface Branch {
  _id: string
  branchName: string
}

interface SemesterNumber {
  _id: string
  semesterNumber: number
}

function SignUpPage() {
  const { generateUrl, getUrl } = useGenerateLink()
  const { loading, errorMessage, message, createUserProfile } =
    useCreateUserProfile()

  // all states of single value
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [enrollmentNo, setEnrollmentNo] = useState<string>('')
  const [division, setDivision] = useState<string>('')
  const [userBranch, setUserBranch] = useState<string>('')
  const [userSemester, setUserSemester] = useState<number | undefined>(
    undefined
  )
  const [userProfileImageDemoLink, setUserProfileImageDemoLink] = useState<
    SanityImageAssetDocument | undefined
  >(undefined)

  const [clientErrors, setClientErrors] = useState<string>('')
  const [isPrivate, setIsPrivate] = useState<boolean>(false)

  // all states of array
  const [semesters, setSemesters] = useState<SemesterNumber[]>([])
  const [branchNames, setBranchNames] = useState<Branch[]>([])

  // all states of error

  // all states of loading
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSemestersLoading, setIsSemesterLoading] = useState<boolean>(true)
  const [isBranchLoading, setIsBranchLoading] = useState<boolean>(true)
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)

  // all handles
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleBio: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBio(e.target.value)
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

  const handleImageUpload = async (e: FormEvent<HTMLInputElement>) => {
    setIsUploadingImage(true)
    try {
      const url = await generateUrl(e)
      setUserProfileImageDemoLink(url)
    } catch (err: any) {
      setClientErrors(err.message)
      setTimeout(() => {
        setClientErrors('')
      }, 5000)
    } finally {
      setIsUploadingImage(false)
    }
  }

  useEffect(() => {
    getBranchNames()
  }, [])

  const getBranchNames = async () => {
    setIsBranchLoading(true)
    try {
      const branches = await fetch(`${Api}/branches/get-branch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const result = await branches.json()
      if (!branches.ok) {
        throw new Error(result.message)
      }

      setBranchNames(result.data)
    } catch (err: any) {
      console.log(err.message)
      setClientErrors(err.Message)
      setTimeout(() => {
        setClientErrors('')
      }, 5000)
    } finally {
      setIsBranchLoading(false)
    }
  }

  const getSemesterOfBranch = async (branchName: string) => {
    setIsSemesterLoading(true)
    try {
      const getSemester = await fetch(
        `${Api}/branches/get-semester?branchName=${branchName}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      const result = await getSemester.json()
      if (!getSemester.ok) {
        throw new Error(result.message)
      }

      setSemesters(result.data.semesters)
    } catch (err: any) {
      setClientErrors(`${err.message}`)
      setTimeout(() => {
        setClientErrors('')
      }, 5000)
      console.error(err)
    } finally {
      setIsSemesterLoading(false)
    }
  }

  const createProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserProfile(
      name,
      username,
      bio,
      userProfileImageDemoLink,
      enrollmentNo,
      userBranch,
      division,
      userSemester,
      isPrivate,
      getUrl
    )
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
        onSubmit={createProfile}
      >
        <div className='w-full flex gap-[12px] items-center'>
          <div className='w-[80%] flex flex-col gap-[12px] flex-grow-1'>
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
          </div>
          <div className='rounded-full p-[12px] h-[125px] w-[125px]  bg-slate-800  aspect-square  '>
            {userProfileImageDemoLink?.url ? (
              <div className='h-full w-full relative'>
                <img
                  src={userProfileImageDemoLink?.url}
                  alt='user-image'
                  className='h-full w-full object-cover rounded-full'
                />
                <button
                  onClick={() => setUserProfileImageDemoLink(undefined)}
                  className='bg-slate-800 rounded-full p-1 absolute right-2 bottom-0 '
                >
                  <MdDeleteOutline size={23} />
                </button>
              </div>
            ) : (
              <>
                <label className='w-full text-[12px]  h-full border-dashed border-2 border-slate-500 rounded-full flex items-center justify-center'>
                  <div className='flex flex-col justify-center items-center'>
                    <AiOutlineCloudUpload />
                    <p> {isUploadingImage ? 'Uploading...' : 'Upload image'}</p>
                  </div>
                  <Input
                    type='file'
                    className='hidden h-0 w-0'
                    onChange={handleImageUpload}
                  />
                </label>
              </>
            )}
          </div>
        </div>
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
          <p className='mb-2'>Bio</p>
          <Textarea
            className='rounded-xl bg-[#171717] border-none outline-none px-[16px]'
            placeholder='Enter your post description here'
            onChange={handleBio}
            value={bio}
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
          {loading ? 'Submitting....' : 'Submit'}
        </Button>
      </form>
      {(errorMessage || clientErrors )&& (
        <p className='text-center  error_message'>
          Error: <span className='text-red-500'> {errorMessage || clientErrors}</span>
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
