"use client"
import React, { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import Image from 'next/image';
import Headers from '../component/header';
import Footer from '../component/footer';
import Link from 'next/link';
import Cartpage from '../component/cartpage'
import axios from 'axios';
import {useCounter} from "../context/CartcountContext"


const page = () => {
    const [products, setProducts]= useState([])
    const {setCartCount} =useCounter()

    useEffect(()=>{
        const getProduct = async ()=>{
            try {
                const resp = await axios.get('https://rnd-backend-1.onrender.com/api/products')
                if (resp.status === 200) {
                    setProducts(resp.data);
                    const storedUserId = localStorage.getItem("userId"); 
                    if (storedUserId) {
                        const savedCount = localStorage.getItem(`cartCount_${storedUserId}`);
                        setCartCount(savedCount ? parseInt(savedCount) : 0);
                    } else {
                      setCartCount(0);
                    }
            
                  }else{
                    console.log("Api error")
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getProduct()
    },[])
    
return (
<div className='font-spartan relative '>
    <div className='relative bg-center min-h-[100svh] bg-no-repeat lg:bg-cover md:bg-cover  ' style={{ backgroundImage: "url('/bg.avif')" }}>
        <Headers />
        <Cartpage/>
        <div className=' absolute md:bottom-[70px] bottom-[180px] px-[50px]'>
            <p className='text-black md:text-[50px] text-[23px] md:mb-0 mb-[25px]'>Start with the basics</p>
            <div className='flex items-center gap-3'>
                <div className='bg-white text-black items-center py-2 px-[10px] rounded-md cursor-pointer'>Shop Women</div>
                <div className='bg-white text-black items-center py-2 px-[10px] rounded-md cursor-pointer'>Shop Men</div>
            </div>
        </div>
    </div>
    <div className="overflow-hidden whitespace-nowrap py-3.5">
    <div className="scroll-left flex items-center gap-8 ">
        {[...Array(20)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 text-black">
            <p className="text-[40px]">Up to 70% off</p>
            <GoDotFill className="text-[20px]" />
            <p className="text-[40px]">Shop Sale</p>
            <GoDotFill className="text-[20px]" />
        </div>
        ))}
    </div>
    </div>
    <hr className='border border-black'></hr>
    <div className='flex justify-between text-black md:px-[50px] px-[30px] mt-[30px] items-center'>
        <p className='md:text-[30px] text-[20px]'>Shop by category</p>
        <div className='flex gap-4 text-[15px]'>
            <p className='hover:underline cursor-pointer'>Women</p>
            <p className='hover:underline cursor-pointer'>Men</p>
        </div>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-4 sm:px-6 lg:px-[50px]'>
    {products.length > 0 ? (
products.map((product) => {
const firstImage =
  Array.isArray(product.images)
    ? typeof product.images[2] === 'string'
      ? product.images[2]
      : product.images[2]?.url
    : null;

const imageUrl = firstImage || '/pic11.avif';

return (
  <Link key={product._id} href={`/Single_product_page/${product._id}`}>
    <div className='relative lg:h-[450px] md:h-[450px] h-[150px]'>
      <Image
        src={imageUrl}
        height={400}
        width={400}
        alt='image'
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-transparent hover:bg-gray-700/30 transition duration-300'></div>
      <div className='bg-white md:text-[18px] text-[11px] lg:rounded-xl rounded-sm text-center md:py-2 py-1 md:px-9 px-1 text-black cursor-pointer absolute top-1/2 left-1/2 transform md:top-[50%] md:left-[50%] md:transform -translate-x-1/2 -translate-y-1/2 lg:top-[200px] lg:left-[230px] lg:transform-none'>
        <p>Tops</p>
      </div>
    </div>
  </Link>
);
})
) : (
<p className="md:text-[40px] text-[20px] text-black text-center justify-center items-center">
No Product Available
</p>
)}



    </div>
    <div className='text-black px-[50px] mt-[30px] items-center'>
        <p className='text-[30px]'>Latest Arivals</p>
    </div>
    <div className='overflow-hidden w-full pt-[50px] pb-[150px] px-[50px]'>
        <div className='scroll-container flex gap-[30px] w-max'>
                {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip.jpg'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <div className='absolute top-[20px] left-[20px] bg-white rounded-md py-1 text-[13px] px-[7px] text-center text-black'>40% off</div>
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Women Oversized Sweat Shirt</p>
                    <div className='flex gap-2'>
                        <p className='text-black text-[14px] line-through'>$85.00</p>
                        <p className='text-red-400 text-[14px]'>$51.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip1.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Drawstring linen pant</p>
                    <div>
                        <p className='text-black text-[14px]'>$81.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip2.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <div className='absolute top-[20px] left-[20px] bg-white rounded-md py-1 text-[13px] px-[7px] text-center text-black'>70% off</div>
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Bucket Hat</p>
                    <div className='flex gap-2'>
                        <p className='text-black text-[14px] line-through'>$15.00</p>
                        <p className='text-red-400 text-[14px]'>$7.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip3.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <div className='absolute top-[20px] left-[20px] bg-white rounded-md py-1 text-[13px] px-[7px] text-center text-black'>30% off</div>
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Unisex Oversized T-shirt</p>
                    <div className='flex gap-2'>
                        <p className='text-black text-[14px] line-through'>$40.00</p>
                        <p className='text-red-400 text-[14px]'>$27.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip4.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Men's cotton short </p>
                    <div>
                        <p className='text-black text-[14px]'>$80.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip5.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <div className='absolute top-[20px] left-[20px] bg-white rounded-md py-1 text-[13px] px-[7px] text-center text-black'>Best seller</div>
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Ribbed Socks </p>
                    <div>
                        <p className='text-black text-[14px]'>$7.00</p>
                    </div>
                    </div>

                    <div className='relative min-w-[400px] cursor-pointer'>
                    <Image src={'/pip6.avif'} height={400} width={400} alt='image' className='w-full h-full object-cover' />
                    <div className='absolute top-[20px] left-[20px] bg-white rounded-md py-1 text-[13px] px-[7px] text-center text-black'>30% off</div>
                    <p className='text-black text-[14px] mt-[15px] mb-[8px]'>Women's crewneck sweater</p>
                    <div className='flex gap-2'>
                        <p className='text-black text-[14px] line-through'>$120.00</p>
                        <p className='text-red-400 text-[14px]'>$84.00</p>
                    </div>
                    </div>
                </React.Fragment>
                ))}
        </div>
    </div>
    <div className='relative bg-center bg-no-repeat bg-cover h-[500px]  items-center flex  justify-center' style={{ backgroundImage: "url('/gif.avif')" }}>
        <div className='flex flex-col items-center gap-4'>
        <p className='text-black md:text-[50px] text-[23px]  text-center'>30%-70% On Selected Styles</p>
        <div className='button bg-white text-black items-center py-2 px-[10px] mt-[50px] w-[150px] rounded-md text-center cursor-pointer'>Shop Sale</div>
        </div>
    </div>
    <div className='px-[50px] sm:items-center md:justify-center py-[100px] text-black' >
        <p className='md:text-[40px] text-[20px]'>Subscribe and save 10%</p>
        <p>on your first order</p>
        <div className='pt-[30px]'>
            <input
                type="email"
                placeholder="Enter your Email"
                className="border border-black lg:w-[460px] md:w-[460px] w-[200px] rounded-md px-3 py-2 text-[14px] placeholder:text-gray-400"
            />
            <div className='mt-[20px] items-center gap-2 flex'>
                <input type='checkbox'/>
                <p>Yes, Subscribe me to your newsletter</p>
            </div>
            <div className='button bg-black text-white items-center py-2.5 px-[13px] mt-[50px] w-[150px] rounded-md text-center cursor-pointer'>Subscribe</div>


        </div>
    </div>
    <Footer/>
    <div className='w-screen bg-black/50 absolute'>
        <div className='bg-white'>

        </div>
    </div>
</div>
)
}

export default page
