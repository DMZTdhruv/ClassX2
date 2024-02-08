import React from 'react'
import Image from 'next/image'
import './index.css'

function index() {
  return (
    <section className='h-[50px] topbar  justify-between  px-[16px] flex items-center fixed top-0  w-full '>
      <Image
        src={`assets/classX.svg`}
        height={15}
        width={0}
        alt={'classX logo'}
        style={{
          height: '20px',
          width: 'auto',
        }}
      />

      <Image
        src={`assets/sidebar/message.svg`}
        height={15}
        width={0}
        alt={'classX logo'}
        style={{
          height: '20px',
          width: 'auto',
        }}
      />
    </section>
  )
}

export default index
