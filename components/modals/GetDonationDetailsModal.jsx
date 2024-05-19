
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const GetDonationDetailsModal = ({ setOpenModal }) => {

  const session = useSession();
  const userEmail = session?.data?.user?.email;
  
  const [donationDetails, setDonationDetails] = useState({
    address: '',
    phoneNumber: '',
    latitude:'',
    longitude:'',
    itemName:'',
    itemQuantity:'',
    itemCondition:'',
    itemImage:''
  });

  const [file, setFile] = useState(null);
 
  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  
  const onChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails((prevDetails) => ({
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


      console.log({ donationDetails });

      const data = await axios.post('/api/donation/uploadDetails',{
        ...donationDetails,
        itemImage:fileUrl,
        userId:session?.data?.user?.id
      });
      
      console.log(data);
      // Close the modal after submission
      setOpenModal(false);
    } catch (error) {
      console.error('Error submitting teacher details:', error);
    }
  };

  const getCoordinates=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDonationDetails((prevDetails) => ({
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
    <div className='min-h-screen overflow-y-auto h-full w-screen bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 flex items-center justify-center' onClick={()=>setOpenModal(false)}>
      <div onClick={(e) => e.stopPropagation()} className=' relative flex flex-col p-8 bg-white rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto scroll-hidden'>
        <X
          className='h-6 w-6 absolute top-3 right-3 cursor-pointer'
          onClick={() => setOpenModal(false)}
        />

        <h3 className='text-2xl font-bold'>Add Details</h3>

        <form className='mt-4 flex flex-col gap-2' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Add Item Photo</label>
            <img 
              src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              className=" mb-2 mx-auto rounded-lg h-24 w-full object-contain" 
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
            <label htmlFor=''>What are you donating?</label>
            <input
              type='text'
              name='itemName'
              value={donationDetails.itemName}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Item Quantity</label>
            <input
              type='text'
              name='itemQuantity'
              value={donationDetails.itemQuantity}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>What is the condition?</label>
            <select
              name='itemCondition'
              value={donationDetails.itemCondition}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            >
              <option value='Good Condition'>Good condition</option>
              <option value='Usable Condition'>Usable condition</option>
              <option value='Not Great'>Not great</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor=''>Address (Pickup Spot)</label>
            <input
              type='text'
              name='address'
              value={donationDetails.address}
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
                value={donationDetails.latitude}
                onChange={onChange}
                className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
              />
            </div>
            <div className='flex flex-col gap-2 w-1/2'>
              <label htmlFor=''>Longitude</label>
              <input
                type='text'
                name='longitude'
                value={donationDetails.longitude}
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
              value={donationDetails.phoneNumber}
              onChange={onChange}
              className='outline-none border border-slate-500 px-4 py-2 rounded-xl'
            />
          </div>
          

          <button className='py-3 rounded-xl w-full bg-blue-500 hover:bg-blue-700 text-white text-lg'>Submit Details</button>

        </form>
      </div>
    </div>
  );
};

export default GetDonationDetailsModal;
