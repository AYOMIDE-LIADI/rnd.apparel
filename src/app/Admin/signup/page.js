"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const page = () => {

    const [formData, setFormData] = useState({
        userId: uuidv4(),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: "admin"
      });
    
      const [errors, setErrors] = useState({
        userId: uuidv4(),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: "admin",
      });
      const [wrongCredentials,  setWrongCredentials] = useState(false)
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prev => ({
          ...prev,
          [name]: '', 
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try {
                const resp = await axios.post("https://rnd-backend-1.onrender.com/api/users/register/admin", formData)
                if(resp.status === 201 || resp.status === 200){
                  console.log("Registration Successful");
                  window.location.href = "/Admin/login";
                  console.log(resp);
                }
            } catch (error) {
              if(error.response && error.response.status === 400){
                setWrongCredentials(error.response.data.msg)
              }
              console.error("API Error:", error.response?.data?.message || error.message);
              }
        }else{
            console.log("error in validation");
        }
      };
      return (
        <div className="text-black justify-center items-center flex h-screen">
        <div className="shadow-2xl md:p-6 p-4 rounded-e-full">
        <p className="text-center pb-[30px] font-extrabold text-[24px]">Sign Up</p>
        <div>
          <form onSubmit={handleSubmit} className="flex gap-[20px] relative px-[90px] py-[30px]">
            <div>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] text-[11px] py-1">First Name</p>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] md:mt-0 mt-[12px] text-[11px] py-1">Last Name</p>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] md:mt-0 mt-[12px] text-[11px] py-1">Email</p>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] md:mt-0 mt-[12px] text-[11px] py-1">Phone</p>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] md:mt-0 mt-[12px] text-[11px] py-1">Address</p>
               <p className="md:mb-[15px] mb-[8px] md:text-[16px] md:mt-0 mt-[12px] text-[11px] py-1">Password</p>
            </div>
            <div className="flex flex-col">
                <div className='relative'>
                    <input  className="border md:mb-[15px] mb-[8px] md:text-[16px] text-[11px] py-1 px-2" type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
                    {errors.firstName&& <p className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.firstName}</p>}
                </div>
                <div className='relative'>
                    <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
                    {errors.lastName&& <p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.lastName} </p>}
                </div>
                <div className='relative'>
                    <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email&& <p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.email}</p>}
                </div>
                <div className='relative'>
                    <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="text" name="phone" value={formData.phone} onChange={handleChange}/>
                    {errors.phone&& <p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.phone}</p>}
                </div>
                <div className='relative'>
                    <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="text" name="address" value={formData.address} onChange={handleChange}/>
                    {errors.address&& <p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.address}</p>}
                </div>
               <div className='relative'>
                <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="password" name="password" value={formData.password} onChange={handleChange}/>
                {errors.password&& <p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{errors.password}</p>}
               </div>
               {
                            wrongCredentials&&(
                                    <p className='text-red-500 text-[10px] absolute bottom-[25px] right-[220px] '>{wrongCredentials} </p>
                            )
               }
    
            <p className='text-[10px]'>Already have an account? <Link className='cursor-pointer text-yellow-400' href="/login">Log in</Link> </p>
            </div>
    
            <button className="absolute bottom-[-10px] right-[190px] bg-amber-400 md:text-[16px] text-[11px] rounded-3xl py-[5px] md:px-[10px] px-[5px] cursor-pointer hover:text-white">Submit</button>
          </form>
        </div>
        </div>
      </div>
      )
}

export default page
