"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/sidebar'
import {useAdmin} from '../../context/AdminContext'
import { useParams } from 'next/navigation'
import axios from 'axios'

const page = () => {
  const  { admin } =useAdmin() 
  const {id}= useParams()
  

  const [existingImages, setExistingImages] = useState([]);

  const [form, setForm] = useState({
          userId: admin,
          name: '',
          oldPrice: '',
          newPrice: '',
          description: '',
          category: '',
        });
        
        const [images, setImages] = useState([])
       const [errors, setErrors] = useState({});
     
       const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
      };
     
     
      const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
      };
     
       const validate = () => {
         let newErrors = {};
         if (!form.name) newErrors.name = "Product name is required";
         if (!form.oldPrice) newErrors.oldPrice = "Old price is required";
         if (!form.newPrice) newErrors.newPrice = "New price is required";
         if (!form.description) newErrors.description = "Description is required";
         if (images.length === 0 && existingImages.length === 0) {newErrors.images = "At least one image is required";}            
         if (!form.category) newErrors.category = "Category is required";
     
         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
       };
     
      
       const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!validate())return;
  
        const formData = new FormData();
        formData.append('userId', admin);
        formData.append('name', form.name);
        formData.append('oldPrice', form.oldPrice);
        formData.append('newPrice', form.newPrice);
        formData.append('description', form.description);
        formData.append('category', form.category);
        images.forEach(image => formData.append('images', image)); 
        
          
          try {
            const resp = await axios.put(`http://localhost:5000/api/products/${id}`,formData,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            
            if(resp.status=== 200){
              alert("Editted Successfully")
              window.location.href = "/Admin/All_product";
            }else{
              console.log("error in Api")
            }
            
          } catch (error) {
            console.log(error.message)
          }
        
        }
    
      useEffect(()=>{
          const getProductInfo =async()=>{
            try {
                const resp = await axios.get(`http://localhost:5000/api/products/${id}`)
                const product = resp.data
                setForm({
                  userId: admin,
                  name: product.name,
                  oldPrice: product.oldPrice,
                  newPrice: product.newPrice,
                  description: product.description,
                  category: product.category,
                })

                const imageList = Array.isArray(product.images)
                ? product.images
                : product.images.split(',').map(img => img.trim());

              setExistingImages(imageList);

            } catch (error) {
              console.log(error.message)
            }
          }
          getProductInfo()
      },[id])

  return (
    <div className='text-black flex'>
        <Sidebar/>
        <form className='py-[170px] px-[180px]  items-center relative ml-[400px]'>
            <p className='font-bold text-center justify-center text-2xl mb-4'>Edit Product</p>
            <div className='flex gap-[70px] items-center'>
              <div>
                <p className='font-semibold py-3.5 mt-0.5'>Name</p>
                <p className='font-semibold py-3.5 mt-0.5'>Old Price</p>
                <p className='font-semibold py-3.5 mt-0.5'>New Price</p>
                <p className='font-semibold py-3.5 mt-0.5'>Description</p>
                <p className='font-semibold py-3.5 mt-0.5'>Image</p>
                <p className='font-semibold py-3.5 mt-0.5'>Category</p>
              </div>
              <div>
                <div className='py-2.5'>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Enter Product Name'
                    className='py-1 border px-1.5 w-[430px] text-[14px]'
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.name}</p>
                  )}
                </div>

                <div className='py-2.5'>
                  <input
                    type='number'
                    name='oldPrice'
                    value={form.oldPrice}
                    onChange={handleChange}
                    placeholder='OldPrice'
                    className='py-1 border px-1.5 w-[430px] text-[14px]'
                  />
                  {errors.oldPrice && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.oldPrice}</p>
                  )}
                </div>

                <div className='py-2.5'>
                  <input
                    type='number'
                    name='newPrice'
                    value={form.newPrice}
                    onChange={handleChange}
                    placeholder='NewPrice'
                    className='py-1 border px-1.5 w-[430px] text-[14px]'
                  />
                  {errors.newPrice && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.newPrice}</p>
                  )}
                </div>

                <div className='py-2.5'>
                  <input
                    type='text'
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    placeholder='Enter Description'
                    className='py-1 border px-1.5 w-[430px] text-[14px]'
                  />
                  {errors.description && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.description}</p>
                  )}
                </div>

                <div className='py-2.5'>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleImageChange}
                    className='py-1 border px-1.5 w-[430px] text-[14px] cursor-pointer'
                  />
                  {errors.images && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>
                      {errors.images}
                    </p>
                  )}

                  {/* Show preloaded existing images */}
                  {existingImages.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {existingImages.map((img, index) => (
                        <img
                          key={index}
                          src={`http://localhost:5000/uploads/${img}`}
                          alt="Uploaded"
                          className="w-[80px] h-[80px] object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>


                <div className='py-2.5'>
                  <input
                    type='text'
                    name='category'
                    value={form.category}
                    onChange={handleChange}
                    placeholder='Enter category'
                    className='py-1 border px-1.5 w-[430px] text-[14px] cursor-pointer'
                  />
                  {errors.category && (
                    <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.category}</p>
                  )}
                </div>
            </div>

            </div>
            <button onClick={handleSubmit} className=' bg-gray-500 rounded-xl py-1.5 px-2 absolute bottom-[100px] right-[50px]'> Submit</button>
        </form>
    </div>
  )
}

export default page
