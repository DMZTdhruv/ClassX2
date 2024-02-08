import type { Metadata } from 'next'
import '../globals.css'
import SideBar from '@/components/shared/sidebar'
import CheckCredentials from '@/components/shared/CredentialCheck'
import BottomBar from '@/components/shared/BottomBar'
import TopBar from '@/components/shared/TopBar'

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
      <body className='dark sm:flex sm:flex-col bg-[#0E0E0E]'>
        <CheckCredentials />
        <TopBar />
        <main className='relative main-container w-[100%]  px-[16px] flex mainsection'>
          <SideBar />
          <section className='flex-1 w-full'>
            {children}
          </section>
        </main>
        <BottomBar />
      </body>
    </html>
  )
}
