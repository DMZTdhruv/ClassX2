import { NextResponse, type NextRequest } from 'next/server'
import { verifyAuth } from './lib/auth'
import { webUrl } from './Constants'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('classX_user_token')?.value || ''
  if (!token) {
    return NextResponse.redirect(new URL(webUrl + '/auth/sign-in'))
  }

  const verifedToken = await verifyAuth(token).catch(err => {
    console.log('Error : ' + err)
  })

  if (!verifedToken) {
    return NextResponse.redirect(new URL(webUrl + '/auth/sign-up'))
  }
  const { user, userProfile } = verifedToken

  if (!user) {
    return NextResponse.redirect(new URL(webUrl + '/auth/sign-up'))
  }

  if (!userProfile) {
    return NextResponse.redirect(new URL(webUrl + '/user/create-user-profile'))
  }
}
export const config = {
  matcher: [
    '/',
    '/upload-post',
    '/message',
    '/explore',
    '/classroom',
    '/post',
    '/post/:path*',
    '/profile',
  ],
}
