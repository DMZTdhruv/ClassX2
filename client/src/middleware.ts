import { NextResponse, type NextRequest } from 'next/server'
import { verifyAuth } from './lib/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('classX_user_token')?.value || ''
  const verifedToken = await verifyAuth(token).catch(err => {
    console.log(err)
  })

  const api = process.env.NEXT_WEBURL;
  if(!verifedToken) {
    return NextResponse.redirect(new URL(api + '/auth/sign-up'))
  }
  console.log(verifedToken)
  const { user, userProfile } = verifedToken

  if (!user) {
    return NextResponse.redirect(new URL(api + '/auth/sign-up'))
  }

  if (!userProfile) {
    return NextResponse.redirect(new URL(api + '/user/create-user-profile'))
  }
}

export const config = {
  matcher: ['/', '/upload-post', '/message', '/explore', '/classroom'],
}