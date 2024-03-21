export const metadata = {
  title: 'classX app',
  description: 'An app for students of the college to enhance the student experience',
  manifest: '/manifest.json',
  icons: { apple: '/icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
