
"use client"
import React, { useState } from 'react'
import { SidebarProvider } from './context/SidebarContext';
import Link from 'next/link';

export default function Home({Component, pageProps}) {

  const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          password: '',
        });
      
        const [errors, setErrors] = useState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          password: '',
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevState) => ({
              ...prevState,
              [name]: value
          }));
      };
      
        const validate = () => {
          const newErrors = {};
          if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
          if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
          if (!formData.email) newErrors.email = 'Email is required';
          else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
          if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
          if (!formData.address.trim()) newErrors.address = 'Address is required';
          if (!formData.password) newErrors.password = 'Password is required';
          else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      
          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          if(validate()){
              try {
                  alert("form submitted")
                  window.location.href="/login"
                  console.log(formData);
                  
              } catch (error) {
                  alert("form not submitted")
              }
          }else{
              console.log("error in validation");
          }
        };
  return (
    
    <div className="text-black justify-center items-center flex h-screen ">
      <div className="shadow-2xl p-6 rounded-e-full">
          <p className="text-center pb-[30px] font-extrabold text-[24px]">Sign Up</p>
      <div>
        <form onSubmit={handleSubmit} className="flex gap-[20px] relative px-[90px] py-[30px]">
          <div>
             <p className="mb-[15px] py-1">First Name</p>
             <p className="mb-[15px] py-1">Last Name</p>
             <p className="mb-[15px] py-1">Email</p>
             <p className="mb-[15px] py-1">Phone</p>
             <p className="mb-[15px] py-1">Address</p>
             <p className="mb-[15px] py-1">Password</p>
          </div>
          <div className="flex flex-col">
          <div className='relative'>
                <input  className="border mb-[15px] py-1 px-2" type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                {errors.firstName&& <p className='text-red-700 text-[10px] absolute bottom-0'>{errors.firstName}</p>}
            </div>
            <div className='relative'>
                <input className="border mb-[15px] py-1 px-2" type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                {errors.lastName&& <p className='text-red-700 text-[10px] absolute bottom-0'>{errors.lastName} </p>}
            </div>
            <div className='relative'>
                <input className="border mb-[15px] py-1 px-2" type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email&& <p className='text-red-700 text-[10px] bottom-0 absolute'>{errors.email}</p>}
            </div>
            <div className='relative'>
                <input className="border mb-[15px] py-1 px-2" type="text" name="phone" value={formData.phone} onChange={handleChange}/>
                {errors.phone&& <p className='text-red-700 text-[10px]  bottom-0 absolute'>{errors.phone}</p>}
            </div>
            <div className='relative'>
                <input className="border mb-[15px] py-1 px-2" type="text" name="address" value={formData.address} onChange={handleChange}/>
                {errors.address&& <p className='text-red-700 text-[10px]  bottom-0 absolute'>{errors.address}</p>}
            </div>
           <div className='relative'>
            <input className="border mb-[15px] py-1 px-2" type="password" name="password" value={formData.password} onChange={handleChange}/>
            {errors.password&& <p className='text-red-700 text-[10px] absolute bottom-0'>{errors.password}</p>}
           </div>
          <p className='text-[10px]'>Already have an account? <Link className='cursor-pointer text-yellow-500' href="/login">Log in</Link> </p>

          </div>
          <button className="absolute bottom-[-10px] right-[190px] bg-amber-400 rounded-3xl py-[5px] px-[10px] cursor-pointer hover:text-white">Submit</button>
        </form>
      </div>
      </div>
    </div>
  );
}
