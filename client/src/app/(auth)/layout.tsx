import type { Metadata } from 'next'
import '../globals.css'
import { AuthContextProvider } from '@/context/AuthContext'


export const metadata: Metadata = {
  title: 'classX app',
  description:
    'An app for students of the college to enhance the student expericene',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#0E0E0E' />
      </head>
      <body className='dark'>
        <AuthContextProvider>
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  )
}
