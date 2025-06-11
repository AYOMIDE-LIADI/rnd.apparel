"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import Link from 'next/link'
const page = () => {
    const { login } = useUser();


    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [error, setError]= useState({
         email:"",
         password:""
    })
    const [wrongCredentials,  setWrongCredentials] = useState(false)
    const handleChange =(e)=>{
        const {name,value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setError(prev => ({
            ...prev,
            [name]: '', 
          }));
    };
    const formValidate=()=>{
        const newErrors ={}

        if(formData.email ===""){
            newErrors.email = "Email is required"
        }
        if(formData.password ===""){
            newErrors.password = "Password is required"
        }
        setError(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formValidate()){
            try {
                const resp = await axios.post("https://rnd-backend-1.onrender.com/api/users/login", formData)
                if(resp.status === 200){
                    login(resp.data.data.userId);
                    console.log(resp.data.data.userId);
                    window.location.href="/Homepage"
                }
            } catch (error) {
                if (error.response && error.response.status === 401 || 404){
                    setWrongCredentials(true)
                }else{
                    console.error("Api error", error.message)
                }
            }
        }else{
            console.log("error in vaidation");    
        }
    }
  return (
    <div className="text-black justify-center items-center flex h-screen">
    <div className='shadow-2xl rounded-e-full md:py-[50px] py-[38px]'>
        <p className="text-center md:pb-[30px] pb-[16px] font-extrabold text-[24px]">Log in</p>
        <div>
            <form onSubmit={handleSubmit} className="flex gap-[20px] relative px-[90px] py-[30px]">
                <div>
                    <p className="md:mb-[15px] mb-[13px] md:text-[16px] text-[11px] py-1">Email</p>  
                    <p className="md:mb-[15px] mb-[8px] md:text-[16px] text-[11px] py-1">Password</p>
                </div>
                <div className='flex flex-col'>
                    <div className='relative md:mb-4'>
                        <input  className="border md:text-[16px] text-[11px] md:mb-[1px] mb-[8px] py-1 px-2" type="email" name="email" value={formData.email} onChange={handleChange}/>
                        {error.email&&<p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{error.email}</p>}
                    </div>
                    <div className='relative'>
                        <input className="border md:text-[16px] text-[11px] md:mb-[15px] mb-[8px] py-1 px-2" type="password" name="password" value={formData.password} onChange={handleChange}/>
                        {error.password&&<p  className='text-red-700 md:text-[10px] text-[7px] absolute md:bottom-0 bottom-[-2px]'>{error.password}</p>}   
                    </div>
                </div>
                {
                    wrongCredentials&&(
                            <p className='text-red-500 text-[10px] absolute bottom-[25px] right-[220px]'>invalid credentials</p>
                    )
                }

                <p className='absolute bottom-[-35px] right-[175px] text-[9px]'>Don't have an account? <Link href='/Signup' className='text-yellow-400'> Sign in</Link></p>  
                
                <button className="absolute bottom-[-10px] right-[190px] bg-amber-400 md:text-[16px] text-[11px] rounded-3xl py-[5px] md:px-[10px] px-[5px] cursor-pointer hover:text-white">Login</button>
            </form>
        </div>
    </div>
    
</div>
  )
}

export default page
