"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Map from '@/components/MapComponents/Map';
import Image from 'next/image';

const page = () => {

  const [userCoordinates,setUserCoordinates] = useState({latitude:'',longitude:''})
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher,setSelectedTeacher] = useState(null);

  const defaultCenter = [51.505, -0.09]; // Default coordinates

  const getTeachers = async () => {
    const { data } = await axios.get('/api/teacher/getAllTeachers');
    setTeachers(data.teachers);
  };

  useEffect(()=>{
    getCoordinates();
    getTeachers();
  },[])

  const getCoordinates=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoordinates((prevDetails) => ({
            ...prevDetails,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting coordinates:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const handleSelectTeacher=(teacher)=>{
    setSelectedTeacher(teacher);

  }


  return (
    <div className='flex flex-col items-center py-12 w-full h-full'>
      <div className='w-[90%]'>
          <h2 className='text-2xl font-bold mb-8'>Connect with Teachers Near you!</h2>

          <div className='w-full flex gap-12'>
            <div className='w-3/4 h-full'>
              <Map userCoordinates={[userCoordinates.latitude,userCoordinates.longitude]} selectedTeacher={selectedTeacher}/>
            </div>
            <div className='h-full w-1/4 flex flex-col gap-4'>
              {teachers.map((teacher, index) => (
                <div onClick={()=>handleSelectTeacher(teacher)} key={index} className='bg-slate-400 rounded-xl p-4 cursor-pointer hover:bg-slate-500'>
                  <div className='flex items-center gap-6'>
                    <Image src={teacher.photo} alt={"Teacher Image"} className='w-10 h-10 rounded-full object-cover' width={60} height={60}></Image>
                    <h3 className='text-xl font-semibold mb-4'>{teacher.name}</h3>
                  </div>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    <span className='text-md font-semibold'>Teaching : </span>
                    {teacher.skills?.map((skill, skillIndex) => (
                      <span className='bg-pink-300 py-1 px-2 rounded-xl' key={skillIndex}>{skill}</span>
                    ))}
                  </div>
                  <div className='text-wrap'>
                    Location : {teacher.address}
                  </div>
                </div>
              ))}
            </div>
          </div>

      </div>
    </div>
  )
}

export default page