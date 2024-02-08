import type { Metadata } from 'next'
import '../globals.css'
import SideBar from '@/components/shared/sidebar'
import CheckCredentials from '@/components/shared/CredentialCheck'

export const metadata: Metadata = {
  title: 'ClassX',
  description: 'This is a classX app made for the school',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className='dark flex'>
        <CheckCredentials />
        <main className='relative flex'>
          <SideBar />
          {children}
        </main>
      </body>
    </html>
  )
}
