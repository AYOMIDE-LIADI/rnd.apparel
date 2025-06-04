"use client"
import axios from 'axios'
import React, { useState } from 'react'
import {useAdmin} from '../context/AdminContext'
const page = () => {
  
  const {login} = useAdmin()

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

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (formValidate()) {
          try {
            const resp = await axios.post("http://localhost:5000/api/users/login", formData);
            if (resp.status === 200) {
              const user = resp.data.data;
              if (user.role === "admin") {
                login(user);
                window.location.href = "/Admin/All_product";
              } else {
                setWrongCredentials("Access denied. Admin only.");
              }
            }
          } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                setWrongCredentials("Invalid email or password.");
            } 
            else {
                console.log("Api error", error.message)
            }
          }
        } else {
          console.log("Validation error");
        }
      };
      
      
  return (
    <div className="text-black justify-center items-center flex h-screen">
        <div className='shadow-2xl rounded-e-full py-[20px]'>
            <p className="text-center pb-[30px] font-extrabold text-[24px]">Log in</p>
            <div>
                <form onSubmit={handleSubmit} className="flex gap-[20px] relative px-[90px] py-[30px]">
                    <div>
                        <p className="mb-[15px] py-1">Email</p>  
                        <p className="mb-[15px] py-1">Password</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='relative mb-4'>
                            <input  className="border py-1 px-2" type="email" name="email" value={formData.email} onChange={handleChange}/>
                            {error.email&&<p className='text-red-700 text-[10px] absolute  bottom-[-15px]'>{error.email}</p>}
                        </div>
                        <div className='relative'>
                            <input className="border mb-[15px] py-1 px-2" type="password" name="password" value={formData.password} onChange={handleChange}/>
                            {error.password&&<p className='text-red-700 text-[10px] absolute bottom-0'>{error.password}</p>}   
                        </div>
                    </div>
                    {
                        wrongCredentials&&(
                                <p className='text-red-500 text-[10px] absolute bottom-[25px] right-[220px]'>{wrongCredentials}</p>
                        )
                    }
                    <button className="absolute bottom-[-10px] right-[190px] bg-amber-400 rounded-3xl py-[5px] px-[10px] cursor-pointer hover:text-white">Login</button>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default page
