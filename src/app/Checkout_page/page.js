"use client"
import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import Footer from '../component/footer'
import { FaAngleLeft } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import Cartpage from '../component/cartpage'
import Link from 'next/link';
import Image from 'next/image';
import { useCounter } from '../context/CartcountContext';
import {useUser} from '../context/UserContext'
import axios from 'axios';
import { useRouter } from 'next/navigation' 



const page = () => {
    const { cartItems,clearCart,updateCart }= useCounter()    
    const {userId} = useUser()
    const router = useRouter()
    console.log(userId);
    
    const calculateTotal = () =>
        cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.newPrice,
          0
    );

    const [formData, setFormData] = useState({
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        city: '',
        phone: ''
      });
      
      const [errors, setErrors] = useState({});

      const handleChange =(e)=>{
        const {name,value} = e.target;
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
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.phone || formData.phone.length < 7) newErrors.phone = 'Valid phone number is required';

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData ={
            userId : userId,
            customerInfo: formData,
            cartItems: cartItems.map((items)=>({
                name: items.productId.name,         
                newPrice: items.productId.newPrice,    
                images: items.productId.images[2],  
                productId : items.productId._id,
                quantity: items.quantity
            })),
            totalAmount: calculateTotal()
        }
        if (cartItems.length === 0) {
            alert("You cannot checkout with an empty cart.");
            return;
          }
          
        if(validate()){
            try {
                const resp = await axios.post("http://localhost:5000/api/order", orderData);
                if (resp.status === 201){
                    const order_id = resp.data._id
                    setFormData({
                        email: '',
                        country: '',
                        firstName: '',
                        lastName: '',
                        address: '',
                        postalCode: '',
                        city: '',
                        phone: ''
                    })                   
                    router.push(`/Payment/${order_id}`)
                }else{
                    alert("Api error")
                }
            } catch (error) {
                console.log("Order error:", error.response?.data || error.message);
            }
        }else{
            console.log("errorin vaidation");    
        }
    }
    
    useEffect(()=>{
        updateCart()
    },[])

    
      
  return (
    <div>
        <Header/>
        <Cartpage/>
        <form className='py-[60px] px-[50px] text-black'>
            <div className='  pt-[80px] justify-center flex'>
                <div className='border rounded-md h-[40px] w-[300px] relative justify-center flex bg-yellow-300'>
                <Image
                src="/paya.jpg"
                height={50}
                width={200}
                alt='pay_pal'
                />
                <div className='text-[10px] px-1 absolute top-[-8px] bg-white'>
                        <p>Express Checkout</p>
                    </div>
                </div>
            </div>
            <div className='relative mt-[40px]'>
                <hr className='text-black'>
                </hr>
                <p className='text-[10px] top-[-6px] absolute bg-white px-[4px] right-[700px] text-black'>OR</p>
            </div>
            <div className='flex justify-between items-center text-black mt-[15px]'>
                <p className='text-[15px] font-bold'>Contact Information</p>
                <p className='text-[11px]'>Already Have an account? <Link className='text-blue-400' href="/login">login</Link> </p>
            </div>
            <div className='md:flex gap-3.5 w-full'>
                <div className=' md:w-[70%]'>

                <input 
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email'
                    className='w-[90%] text-[12px] rounded-md py-[8px] text-black border px-1.5 mt-3.5'
                />
                {errors.email && <p className="text-red-500 absolute text-[10px] text-xs mt-1">{errors.email}</p>}

                <div className='flex gap-2 items-center text-black my-[30px]'>
                    <input 
                    type='checkbox'
                    />
                    <p className='text-[10px]'>Email me with news and offers</p>
                </div>
                <div>
                    <p className='mb-[10px] font-bold'>Shipping Address</p>
                    <select name='country' value={formData.country} onChange={handleChange} className='text-[13px] w-[90%] py-[8px] border rounded-md'>
                    <option >Country/Region</option>
                    <option value="spain">Spain</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="kenya">Kenya</option>
                    <option value="ghana">Ghana</option>
                    <option value="south-africa">South Africa</option>
                    <option value="egypt">Egypt</option>
                    <option value="morocco">Morocco</option>
                    <option value="uganda">Uganda</option>
                    <option value="spain">Spain</option>
                    <option value="canada">Canada</option>
                    <option value="japan">Japan</option>
                    <option value="germany">Germany</option>
                    <option value="brazil">Brazil</option>
                    <option value="australia">Australia</option>
                    <option value="france">France</option>
                    <option value="united-states">United States</option>
                    </select>
                    {errors.country && <p className="text-red-500 absolute text-[10px] text-xs mt-1">{errors.country}</p>}

                    <div className='md:flex mt-5 mb-1.5'>
                        <div className='w-full'>
                            <input 
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='First name'
                            className='text-[13px] md:w-[88%] w-[90%] py-[8px] px-1.5 border rounded-md'
                            />
                            {errors.firstName && <p className="text-red-500 absolute text-[10px] text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className='w-full md:ml-0 ml-[40px] md:mt-0 mt-5'>
                            <input 
                            name='lastName'
                            value={formData.lastName}
                            placeholder='Last name'
                            onChange={handleChange}
                            className='text-[13px] md:w-[88%] w-[90%] py-[8px] ml-[-40px] px-1.5 border rounded-md'
                            />
                            {errors.lastName && <p className="text-red-500 ml-[-40px] absolute text-[10px] text-xs mt-1 ">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className=''>
                        <input 
                            type='text'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            placeholder='Street and house number'
                            className='w-[90%] text-[12px]  rounded-md py-[8px] text-black border px-1.5 mt-3.5'                        
                            />
                            {errors.address && <p className="text-red-500 absolute text-[10px] text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div className='md:flex mt-5 mb-1.5'>
                        <div className='w-full'>
                            <input 
                            name='postalCode'
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder='Postal code'
                            className='text-[13px] md:w-[88%] w-[90%] py-[8px] px-1.5 border rounded-md'
                            />
                            {errors.postalCode && <p className="text-red-500 absolute text-[10px] text-xs mt-1">{errors.postalCode}</p>}
                        </div>
                        <div className='w-full md:ml-0 ml-[40px] md:mt-0 mt-5'>
                            <input 
                            name='city'
                            value={formData.city}
                            placeholder='City'
                            onChange={handleChange}
                            className='text-[13px] md:w-[88%] w-[90%] py-[8px] ml-[-40px] px-1.5 border rounded-md'
                            />
                            {errors.city && <p className="text-red-500 ml-[-40px] absolute text-[10px] text-xs mt-1 ">{errors.city}</p>}
                        </div>
                    </div>
                    <input 
                        type='number'
                        name='phone'
                        value={formData.phone}
                        placeholder='Phone'
                        className='w-[90%] text-[12px] rounded-md py-[8px] text-black border px-1.5 mt-3.5'
                        onChange={handleChange}
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] text-xs mt-1">{errors.phone}</p>}

                </div>
                <div className='flex justify-between items-center mt-[20px]'>
                    <Link href="/ViewCart_page">
                        <div className='flex gap-1.5 items-center text-blue-400'>
                            <FaAngleLeft size={11}/>
                            <p className='text-[10px]'>Return to cart</p>
                        </div>
                    </Link>
                    <div onClick={handleSubmit} className='bg-blue-400 text-center cursor-pointer rounded-md py-[13px] px-[10px] text-white text-[11px]'>
                            <p>Continue to payment</p>
                    </div>
                </div>
                </div>
                <div className=' md:w-[30%]'>
                    <div className=' mt-[50px]'>
                                        <p className='mb-[20px]'>Order Summary</p>
                                        <hr className='mb-3'></hr>
                                        <div >
                                            <div className='flex justify-between mb-[15px]' >
                                                <p className='text-[14px]'>Subtotal</p>
                                                <p className='text-[14px]'>${calculateTotal()}</p>
                                            </div>
                                            <div className='flex justify-between mb-1' >
                                                <p className='text-[14px]'>Delivery</p>
                                                <p className='text-[14px]'>FREE</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='underline text-[12px] mb-2'>Abuja Federal Capital Territory, Nigeria</p>
                                        </div>
                                        <hr className='my-3'></hr>
                                        <div className='flex justify-between mb-3.5 font-bold' >
                                                <p className='text-[18px]'>TOTAL</p>
                                                <p className='text-[18px]'>${calculateTotal()}</p>
                                        </div>
                                        <div className='items-center flex gap-2 mt-2.5 justify-center'>
                                            <FaLock size={13}/>
                                            <p className='text-[12px]'>Secure Checkout</p>
                                        </div>
                                    </div>
                </div>
            </div>
        </form>
        <Footer/>
    </div>
  )
}

export default page
