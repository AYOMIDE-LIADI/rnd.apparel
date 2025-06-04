"use client"
import React, { useEffect, useState } from 'react'
import { FaRegFaceGrin } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useSidebar } from '../context/SidebarContext';
import { useCounter } from '../context/CartcountContext';
import Link from 'next/link';
import  { useUser } from '../context/UserContext'



const header = () => {
    const { logout } = useUser()
    const {openSideBar} = useSidebar()
    const {cartCount} =useCounter()
    const [scrolled, setScrolled] = useState(false);
    const [hydrated, setHydrated] = useState(false);


        useEffect(() => {
          setHydrated(true);
        }, []);
        
      useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 0);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
  return (
    <div>
         <div
                        className={`flex justify-between items-center fixed z-50 md:w-screen w-screen lg:px-[50px] px-[20px] transition-colors duration-300 ${
                            scrolled ? 'bg-white shadow-md' : 'bg-transparent'
                        }`}
                        >
                        <div className='md:flex items-center text-black gap-[20px] hidden font-semibold'>
                            <p className='cursor-pointer hover:underline'>Women</p>
                            <p className='cursor-pointer hover:underline'>Men</p>
                            <p className='cursor-pointer hover:underline'>Sale</p>
                        </div>
                        <Link href="/Homepage">
                          <div>
                              <p className='text-black font-bold lg:text-[50px] md:text-[50px] text-[20px] md:mt-0 mt-2.5 cursor-pointer'>rnd,apparel</p>
                          </div>
                        </Link>
                        <div className='flex gap-[15px] md:mt-0 mt-2.5 items-center text-black ml-[-30px]'>
                            <Link href="/login">
                              <p className='hover:text-gray-500 cursor-pointer'>Log in</p> 
                            </Link>
                            <FaRegFaceGrin className='hover:text-gray-500 cursor-pointer' size={25} />
                            <IoMdSearch size={25} />
                            <div onClick={openSideBar} className="bg-black text-center rounded-full h-[25px] w-[25px] text-white cursor-pointer">
                            {hydrated ? cartCount : 0}
                            </div>  
                            <Link href='/login' onClick={logout}>
                              <MdExitToApp />
                            </Link>
                        </div>
                    </div>
      
    </div>
  )
}

export default header
