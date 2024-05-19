"use client"
import React, { useState } from 'react'
import Link from 'next/link'

import { signOut,useSession } from 'next-auth/react'
import GetTeacherDetailsModal from '../modals/GetTeacherDetailsModal'
import GetDonationDetailsModal from '../modals/GetDonationDetailsModal'
const Sidebar = () => {
    
  const session = useSession();
  
  const [detailsModal,setDetailsModal] = useState(false)
  const [donationModal,setDonationModal] = useState(false)

  if(session.status==="authenticated")
  return (
    <div className='w-[250px] min-h-screen h-full bg-slate-300'>
        <div className=' flex flex-col text-white bg-blue-600  rounded-tr-3xl rounded-br-3xl w-full min-h-screen h-full  items-center px-4 py-8'>
            <div className='text-2xl font-semibold '>
                EduCare
            </div>

            <div className='flex flex-col gap-6 mt-8 w-full'>
              <p className='p-2 rounded-2xl hover:bg-blue-300 hover:text-blue-700 w-full' onClick={()=>setDetailsModal(true)}>Start Tutoring</p>
              <p className='p-2 rounded-2xl hover:bg-blue-300 hover:text-blue-700 w-full' onClick={()=>setDonationModal(true)}>Donate</p>
              <Link href='/viewTeachers' className='p-2 rounded-2xl hover:bg-blue-300 hover:text-blue-700 w-full'>View Teachers</Link>






              <p className='p-2 rounded-2xl hover:bg-blue-300 hover:text-blue-700 w-full' onClick={signOut}>Sign Out</p>
                
            </div>
        </div>
    

    {detailsModal && <GetTeacherDetailsModal setOpenModal={setDetailsModal}/>}
    {donationModal && <GetDonationDetailsModal setOpenModal={setDonationModal}/>}
    </div>
  )

  return null;
}

export default Sidebar