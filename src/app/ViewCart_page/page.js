"use client"
import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import Footer from '../component/footer'
import { AiOutlineDelete } from "react-icons/ai";
import Image from 'next/image';
import { FiTag } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import Cartpage from '../component/cartpage'
import Link from 'next/link';
import { useUser } from '../context/UserContext'



const page = () => {
    const [cartItems, setCartItems] = useState([]);
    const { userId } = useUser();
    console.log(cartItems);
    
    useEffect(()=>{
        const fetchCart = async () => {
            try {
              const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
              const data = await res.json();
              if (data.success) {
                setCartItems(data.cart.items);
              }
            } catch (err) {
              console.error("Error fetching cart:", err);
            }
          };
          fetchCart()
    },[userId])
    const handleDelete = async (productId) => {
        try {
          const res = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
          
          if (res.data.success) {
            fetchCart(); 
          }else{
            console.log("Api Error");
            
          }
        } catch (err) {
          console.log("Error deleting item:", err.response?.data || err.message);
        }
      }; 
      const calculateTotal = () => {
        return cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.newPrice,
          0
        );
      };
  return (
    <div className='text-black'>
        <Header/>
        <Cartpage/>
        <div className='px-[50px] py-[120px]'>
            <div className=' md:flex items-center gap-[60px]'>
                <div className='md:w-[70%]'>
                    <p className='mb-[20px]'>My cart</p>
                    <hr className='mb-3'></hr>
                    {
                        cartItems.map((items)=>{
                            return(

                    <div key={items.productId._id} className='flex justify-between mb-2.5'>
                        <div>
                            <div className='flex gap-3.5 items-center'>
                                
                                                    <div >
                                                        {
                                                                items?.productId?.images?.[2] && (
                                                               <Image
                                                                src={`http://localhost:5000/uploads/${items.productId.images[2]}`}
                                                                alt='image'
                                                                height={230}
                                                                width={100}
                                                                className='border border-black'
                                                               />

                                                           ) 
                                                        }
                                                    </div>
                                                    <div className=' w-full relative'>
                                                        <p className='text-black text-[14px] mb-1.5'>{items.productId.name}</p>
                                                        <p className='text-black text-[12px] mb-1'>${items.productId.newPrice}</p>
                                                        <p className='text-black text-[12px] mb-1'>Color: Forest Green</p>
                                                        <p className='text-black text-[12px] mb-1'>Size: Medium</p>
                                                        
                                                    </div>
                                </div>
                        </div>
                        <div className='flex  items-center gap-[20px] relative'>
                                <div><p className='text-[14px] pr-[40px] ml-[70px]'>${items.productId.newPrice}</p></div>
                                <AiOutlineDelete onClick={()=> handleDelete(items.productId._id)} size={22} className=' cursor-pointer absolute right-[-12px]'/>
                        </div>
                    </div>
                            )
                        })
                    }
                    <hr className='my-3 px-[50px]'></hr>
                    <div className='flex gap-2 items-center mb-3'>
                        <FiTag/>
                        <p className='text-[13px]'>Enter a Promo Code</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <CiStickyNote/>
                        <p className='text-[13px]'>Add a note</p>
                    </div>

                </div>
                <div className='md:w-[22%] mt-[50px]'>
                    <p className='mb-[20px]'>Order Summary</p>
                    <hr className='mb-3'></hr>
                    <div >
                        <div key={calculateTotal()} className='flex justify-between mb-[15px]' >
                            <p className='text-[14px]'>Subtotal</p>
                            <p className='text-[14px]'>${calculateTotal().toFixed(2)}</p>
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
                            <p className='text-[18px]'>${calculateTotal().toFixed(2)}</p>
                    </div>
                    <Link href="/Checkout_page">
                        <div className='border rounded-md w-full items-center cursor-pointer hover:text-gray-700 text-white bg-black text-center py-[12px] mt-[7px]'>
                            <p className='text-[14px]'>Checkout</p>
                        </div>
                    </Link>
                    <div className='items-center flex gap-2 mt-2.5 justify-center'>
                        <FaLock size={13}/>
                        <p className='text-[12px]'>Secure Checkout</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default page
