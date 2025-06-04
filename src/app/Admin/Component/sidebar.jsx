"use client"
import Link from 'next/link'
import React from 'react'
import { useAdmin } from '../context/AdminContext'

const sidebar = () => {
  const {logout} = useAdmin()
  return (
    <div className='text-black h-screen w-[25%] py-[190px] items-center justify-center text-center bg-gray-500 fixed'>
        <div className='font-extrabold text-2xl mb-[40px]'>Admin</div>
        <Link href="/Admin/All_product">
            <div className='font-bold cursor-pointer hover:text-white py-[20px]'>All Product </div>
        </Link>
        <Link href="/Admin/Add_product">
            <div className='font-bold cursor-pointer hover:text-white py-[20px]'>Add New Product </div>
        </Link>
        <Link href="/Admin/Orders">
            <div className='font-bold cursor-pointer hover:text-white py-[20px]'>All orders </div>
        </Link>
        <Link onClick={logout} href="/Admin/login">
            <div className='font-bold cursor-pointer hover:text-red-500 py-[20px]'>Log-out </div>
        </Link>
    </div>
  )
}

export default sidebar
