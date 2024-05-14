"use client"

import React from 'react'
import Link from 'next/link'

import { signOut,useSession } from 'next-auth/react'
const Navbar = () => {

  const session = useSession();
  return (
    <div className='flex items-center justify-between bg-blue-600 text-white py-4 px-12'>
        <Link href="/" className='font-semibold text-2xl'>EduCare</Link>

        <div className='flex items-center gap-8 text-lg'>
            <Link href="">Home</Link>
            
            {
              session.data?.user?.email &&
              <p onClick={signOut}>Logout</p>
            }
        </div>
    </div>
  )
}

export default Navbar