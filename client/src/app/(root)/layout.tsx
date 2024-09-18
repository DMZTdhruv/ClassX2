import type { Metadata } from 'next';
import '../globals.css';
import TopBar from '@/components/shared/TopBar';
import BottomBar from '@/components/shared/BottomBar';
import SideBar from '@/components/shared/sidebar';
import NextTopLoader from 'nextjs-toploader';
import { AuthContextProvider } from '@/context/AuthContext';
import { ClassXContextProvider } from '@/context/ClassXContext';
import FcmTokenComponent from '@/components/firebase/FcmTokenComponent';
import ClassXSocketContextProvider from '@/context/ClassXSocketContext';

export const metadata: Metadata = {
  title: 'classX app',
  description: 'An app for students of the college to enhance the student expericene',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
};

export default function RootLayout({
  children,
  postModal,
}: Readonly<{
  children: React.ReactNode;
  postModal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#0E0E0E' />
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled'></meta>
      </head>
      <FcmTokenComponent />
      <AuthContextProvider>
        <ClassXSocketContextProvider>
          <ClassXContextProvider>
            <body className='dark sm:flex items-center sm:flex-col bg-[#0d0d0d] font-poppins '>
              <NextTopLoader
                color='rgba(137, 29, 204, 1)'
                shadow='0 4px 18.9px #891DCC'
                showSpinner={false}
              />
              {postModal}
              <TopBar />
              <main className='relative max-w-screen-2xl  main-container w-[100%] text-[12px] lg:text-[14px] flex mainsection'>
                <SideBar />
                <section className='flex-1 w-full '>{children}</section>
              </main>
              <BottomBar />
            </body>
          </ClassXContextProvider>
        </ClassXSocketContextProvider>
      </AuthContextProvider>
    </html>
  );
}
