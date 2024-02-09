'use client'

import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import useCoookieProvider from '@/hooks/useCoookieProvider'

interface JwtPayload {
  userID: string
}

export default function CheckCredentials() {
  const { cookie } = useCoookieProvider() || ''
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<boolean>(false)
  const [user, setUser] = useState<boolean>(false)
  const [prevPage, setPrevPage] = useState<string | null>(null)
  const api = process.env.NEXT_PUBLIC_API

  useEffect(() => {
    const { userID }: JwtPayload = jwtDecode(cookie)
    checkUser(userID)
  }, [])

  const checkUser = async (userId: string) => {
    try {
      const response = await fetch(`${api}/auth/check-user?userID=${userId}`, {
        method: 'GET',
      })
      const { user, userProfile } = await response.json()
      setUser(user)
      setProfile(userProfile)

      if (user && userProfile) {
        router.push('/home')
      }
    } catch (error) {
      console.error('Error during fetch:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || !profile) {
    return (
      <section className='h-[100vh] top-0 left-0  fixed w-[100%] z-[1000] flex items-center justify-center gradient'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <Image
            src='/assets/classX.svg'
            alt='Class-X logo'
            width={200}
            height={0}
            style={{
              height: 'auto',
            }}
            className={`${isLoading && 'animate-pulse'}`}
            unoptimized
          />
          {isLoading ? (
            <p className={`${isLoading && 'animate-pulse'}`}>
              Checking user details...
            </p>
          ) : !user ? (
            <p>
              You don't have an account{' '}
              <Link
                href='/auth/sign-up'
                className='text-[#891DCC] hover:underline'
              >
                Sign up
              </Link>
            </p>
          ) : (
            !profile && (
              <div className='flex flex-col justify-center gap-2 items-center'>
                <p>Oops you don't have an user profile account</p>
                <Button type='button' className='text-white rounded-md'>
                  <Link href='users/create-user-profile'>
                    Create user profile
                  </Link>
                </Button>
              </div>
            )
          )}
        </div>
      </section>
    )
  }
}
