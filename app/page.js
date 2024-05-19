"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const session = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session.status==="unauthenticated"){
      router.replace('/login');
    }
    console.log(session)
  },[session])
  return (
    <main className="min-h-screen h-full w-full flex flex-col bg-slate-300">
      
      <div className="h-full min-h-screen p-8">
        hello
      </div>
    </main>
  );
}
