"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/sidebar'
import Image from 'next/image'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';

const page = () => {

    const [deleteModal, setDeleteModal] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null);

    const openModal =(id)=>{
        setProductToDelete(id)
        setDeleteModal(true)
    }

    const [allProducts, setallProducts] = useState([])

    useEffect(()=>{
        const getAllProducts =async ()=>{
            try {
                const resp = await axios.get("https://rnd-backend-1.onrender.com/api/products")
                if (resp.status === 200){
                    setallProducts(resp.data)
                }else{
                    console.log("error in getting product");
                }
            } catch (error) {
                console.log(error.message);  
            }
        }
        getAllProducts()
    },[])

    const deleteProduct =async()=>{
        try {
            const resp = await axios.delete(`https://rnd-backend-1.onrender.com/api/products/${productToDelete}`)
            if (resp.status === 200){
                setallProducts(prev => prev.filter(product => product._id !== productToDelete));
                setDeleteModal(false)
            }else{
                console.error("API error: Unable to delete product.");
                alert("Failed to delete the product.");            }
        } catch (error) {
            console.error("Delete error:", error.message);
            alert("Something went wrong while deleting the product.");        }
    }

    
  return (
    <div className='flex '>
      <Sidebar/>
        <div className='text-black py-[70px] px-[70px] gap-[60px] grid grid-cols-3 ml-[400px]'>
            { allProducts.length > 0 ?
                (allProducts.map(allproduct =>{
                    const firstImage = Array.isArray(allproduct.images)
                    ? allproduct.images[0]?.trim()
                    : allproduct.images?.split(',')[0]?.trim();
                     return(<div key={allproduct._id} className='bg-gray-400 rounded-xl h-[390px] w-[270px] py-2.5 px-2.5 cursor-pointer'>
                        <div className='flex flex-col items-center'>
                            <Image
                            alt='image'
                            height={150}
                            width={150}
                            src={
                                firstImage
                                ? `https://rnd-backend-1.onrender.com/uploads/${firstImage.trim()}`
                                : "/fallback.jpg"
                            }
                            />
                            <div className='text-[13px] mt-3.5 text-center '>
                                <p className='py-0.5'>Name: {allproduct.name}</p>
                                <div className='flex gap-1.5 items-center justify-center py-0.5'>
                                    <p>Price:</p>
                                    <p className='line-through'>${allproduct.oldPrice}</p>
                                    <p>${allproduct.newPrice}</p>
                                </div>
                                <p className='break-words py-0.5 w-full max-w-[300px] truncate'>Description:{allproduct.description}</p>
                                <p className='break-words py-0.5 w-full max-w-[300px] truncate'>Category:{allproduct.category}</p>

                                <div className='flex gap-[20px] items-center justify-center mt-1.5'>
                                    <Link  href={`/Admin/Edit_product/${allproduct._id}`}>
                                        <FaEdit className='cursor-pointer ' size={15}/>
                                    </Link>
                                    <MdDelete onClick={()=>openModal(allproduct._id)} className='cursor-pointer ' size={15}/>
                                </div>
                            </div>
                        </div>
                    </div>)
                })): (
                    <p className='text-center font-bold'>No Product Added</p>
                  )} 
            {
                deleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center opacity-85 justify-center">
                    <div className="absolute inset-0 bg-black opacity-100"></div>

                    <div className="relative bg-white rounded-2xl shadow-lg w-[320px] p-6 text-center">
                        <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</h2>
                        <p className="text-sm text-gray-700 mb-6">
                        Are you sure you want to delete this item? This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-4">
                        <button
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setDeleteModal(false)}
                        >
                            No
                        </button>
                        <button onClick={deleteProduct} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Yes
                        </button>
                        </div>
                    </div>
                    </div>

                                    )
                                }

                            </div>
                        </div>
                    )
                    }

export default page
