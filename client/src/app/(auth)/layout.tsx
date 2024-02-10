import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'ClassX',
  description: 'This is a classX app made for the college',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='dark'>
        <main>{children}</main>
      </body>
    </html>
  )
}

