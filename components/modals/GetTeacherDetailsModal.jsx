
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const GetTeacherDetailsModal = ({ setOpenModal }) => {

  const session = useSession();
  const userId = session?.data?.user?.id;
  
  const [teacherDetails, setTeacherDetails] = useState({
    address: '',
    phoneNumber: '',
    skills: [],
    latitude:'',
    longitude:''
  });
  const [file, setFile] = useState(null);
 
  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const [skillInput, setSkillInput] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeacherDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload");
  
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dx09c2kwf/image/upload",
        formData
      );
      
      // Get the file URL from Cloudinary response
      const fileUrl = uploadRes.data.url;


      console.log({ teacherDetails });

      const data = await axios.post('/api/teacher/uploadDetails',{
        ...teacherDetails,
        photo:fileUrl,
        userId
      });
      
      console.log(data);
      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error('Error submitting teacher details:', error);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setTeacherDetails((prevDetails) => ({
        ...prevDetails,
        skills: [...prevDetails.skills, skillInput],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (index) => {
    setTeacherDetails((prevDetails) => ({
      ...prevDetails,
      skills: prevDetails.skills.filter((_, i) => i !== index),
    }));
  };

  const getCoordinates=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setTeacherDetails((prevDetails) => ({
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

  return (
    <div className='min-h-screen overflow-y-auto py-12 h-full w-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex items-center justify-center z-50' onClick={()=>setOpenModal(false)}>
      <div onClick={(e) => e.stopPropagation()} className='mt-8 relative flex flex-col p-8 bg-white rounded-2xl shadow-lg'>
        <X
          className='h-6 w-6 absolute top-3 right-3 cursor-pointer'
          onClick={() => setOpenModal(false)}
        />

        <h3 className='text-2xl font-bold'>Add Details</h3>
        <p className='text-gray-300 mt-1'>
          Adding details enables you to get listed on the application and teach students.
        </p>

        <form className='mt-4 flex flex-col gap-2' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Your Photo</label>
            <img 
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              className=" mb-2 mx-auto rounded-full object-cover h-24 w-24" 
              alt="Preview"
            />
            <input 
              type="file"  
              onChange={handleImage} 
              className="mt-2 mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg" 
              accept="image/*"
              multiple={false}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Address (where you will teach)</label>
            <input
              type='text'
              name='address'
              value={teacherDetails.address}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            />
          </div>
          <div className='flex gap-2'>
            <div className='flex flex-col gap-2 w-1/2'>
              <label htmlFor=''>Latitude</label>
              <input
                type='text'
                name='latitude'
                value={teacherDetails.latitude}
                onChange={onChange}
                className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
              />
            </div>
            <div className='flex flex-col gap-2 w-1/2'>
              <label htmlFor=''>Longitude</label>
              <input
                type='text'
                name='longitude'
                value={teacherDetails.longitude}
                onChange={onChange}
                className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
              />
            </div>
            <div className='w-fit h-fit mt-auto p-2 rounded-xl bg-violet-500 text-white hover:bg-violet-700 cursor-pointer px-4' onClick={getCoordinates}>
              Get
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Phone Number</label>
            <input
              type='text'
              name='phoneNumber'
              value={teacherDetails.phoneNumber}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Skills You Can Teach</label>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className='outline-none border border-slate-500 px-4 py-2 rounded-xl w-full'
              />
              <button
                type='button'
                onClick={handleAddSkill}
                className='bg-blue-500 text-white px-2 py-2 rounded '
              >
                <Plus className='h-5 w-5' />
              </button>
            </div>
            <div className='max-h-[100px] overflow-y-auto flex flex-wrap gap-2 max-w-2xl w-full'>
              {teacherDetails.skills.map((skill, index) => (
                <div key={index} className='rounded-xl bg-slate-300 p-2 flex items-center gap-2'>
                  <span>{skill}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveSkill(index)}
                    className='text-red-500'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className='py-3 rounded-xl w-full bg-blue-500 hover:bg-blue-700 text-white text-lg'>Submit Details</button>

        </form>
      </div>
    </div>
  );
};

export default GetTeacherDetailsModal;
