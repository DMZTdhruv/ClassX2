import React from 'react'
import SignInForm from '@/components/Forms/SiginForm/SignInForm'
import Styles from "./page.module.scss"
import Image from "next/image"


function page() {
  return (
    <section className={`login_section flex justify-center flex-col md:flex-row items-center  ${Styles.login_section}`}>
      <Image
        src="/assets/classX.svg"
        alt="classX logo"
        width={51}
        height={125}
        unoptimized
        className='w-[30%] mb-3'
      />
      <SignInForm />
    </section>
  )
}

export default page