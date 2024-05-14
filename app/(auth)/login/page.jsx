"use client"

import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import Link from 'next/link'

import bg from '@/assets/register-bg.jpg'

import * as z from 'zod'
import axios from 'axios'

import { signIn,useSession } from 'next-auth/react';

const page = () => {

  const router = useRouter();

  const [credentials,setCredentials] = useState({email:'',password:'',role:'Student'});

  const [error,setError]= useState('');
  const [loading,setLoading]= useState(false);
  
  const session = useSession();

  const formSchema = z.object({
    
    email:z.string().min(1,{
        message:"Email is required"
    }),
    password:z.string().min(1,{
        message:"Password is required"
    }),
    role:z.string().min(1,{
        message:"Role is required"
    })
  })


  useEffect(()=>{
    if(session.status==="authenticated"){
        router.replace('/');
    }
  },[session,router])

  const onchange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const onsubmit = async (e)=>{
    setLoading(true);
    e.preventDefault();

    const response = formSchema.safeParse({
        ...credentials
    });
  
    // check for errors
    if (!response.success) {
        const { errors } = response.error;
        setError(errors[0].message) 
    }

    try {
        const res = await signIn("credentials",{
            redirect:false,
            ...credentials
        });

        if(res?.error){
            setError("Invalid Credentials");
            if(res?.url){
                router.replace('/');
            }
        }

    } catch (error) {
        console.log(error);
        setError("We are facing some Issues, Please try again Later.")
    }

    setLoading(false);
  }


  return (
    <div className='min-h-screen w-full relative'>
        <Image src={bg}  alt='children studying' className='h-full w-full absolute top-0 left-0 brightness-75'></Image>

        <form className='p-8 w-[90%] md:w-[30%] bg-white rounded-xl z-50 absolute  left-[50%] translate-x-[-50%]  md:translate-x-[0%] md:left-[10%] top-[60%] md:top-[50%] translate-y-[-50%]' onSubmit={onsubmit}>

            <h2 className='font-bold text-3xl text-[#756AB6]'>Login Today</h2>
            <p className='mb-8 mt-2 text-gray-400 font-semibold'>Welcome to the Skill Development App!</p>

            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Email</label>
                <input type="email" name='email' value={credentials.email} placeholder='username@gmail.com' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
                <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Role</label>
                <select name='role' value={credentials.role} onChange={onchange} className='w-full p-2 outline-none rounded-xl border-gray-500 border-2'>
                    <option value="Student">Student</option>
                    <option value="Teacher">Volunteer Teacher</option>
                </select>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Password</label>
                <input type="password" name='password' value={credentials.password} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            
            <button className='bg-[#FF4081] hover:bg-[#cf275f] cursor-pointer text-white py-2 text-lg w-full rounded-xl mt-6 ' type='submit'>Login</button>
            <p className='mt-2 text-center'> Dont have an account? <Link href='/register' className='font-semibold'>Register here</Link> </p>
        </form>
    </div>
  )
}

export default page