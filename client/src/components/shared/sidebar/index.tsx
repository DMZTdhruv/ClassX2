import React from 'react'
import { sideBarData } from '@/constants'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function SideBar(props: any) {
  return (
    <section className='h-[100vh] font-poppins  px-[40px] realtive  w-[304px] border-r-2 border-r-slate-800 '>
      <div className='h-[150px] flex items-center'>
        <Image
          src={`/assets/ClassX.svg`}
          height={25}
          width={0}
          alt='classX'
          style={{
            width: 'auto',
          }}
        />
      </div>
      <div className='flex gap-[20px] translate-x-[-10px] flex-col'>
        {sideBarData.map(links => {
          return (
            <Link
              className='flex gap-[11px] py-[5px] px-[10px] rounded-md hover:bg-slate-900/80 transition-all cursor-pointer'
              href={links.routes}
              key={links.id}
            >
              <Image
                src={`/assets/sidebar/${links.icon}`}
                width={24}
                height={24}
                alt={links.name}
                unoptimized
              />
              <span className='font-semibold text-[20.42px]  '>
                {links.name}
              </span>
            </Link>
          )
        })}
      </div>
      <Button
        type='button'
        className='text-whte font-bold absolute bottom-[41px]'
      >
        Log out
      </Button>
    </section>
  )
}

export default SideBar

