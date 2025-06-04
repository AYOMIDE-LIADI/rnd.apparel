"use client"
import React, { useState } from 'react'
import Sidebar from '../Component/sidebar'
import axios from 'axios'
import {useAdmin} from '../context/AdminContext'
const page = () => {
  const  { admin } =useAdmin() 
  

  const [form, setForm] = useState({
    userId: admin,
    name: '',
    oldPrice: '',
    newPrice: '',
    description: '',
    category: '',
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  
  
  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Product name is required';
    if (!form.oldPrice) newErrors.oldPrice = 'Old price is required';
    if (!form.newPrice) newErrors.newPrice = 'New price is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!admin) {
      alert("Admin ID is not loaded yet. Please wait.");
      return;
    }
  
    if (!validate()) return;
  
    const formData = new FormData();
    formData.append('userId', admin._id);
    formData.append('name', form.name);
    formData.append('oldPrice', form.oldPrice);
    formData.append('newPrice', form.newPrice);
    formData.append('description', form.description);
    formData.append('category', form.category);
  
    images.forEach((image) => {
      formData.append('images', image); 
    });
  
    try {
      const resp = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (resp.status === 200 || resp.status === 201) {
        alert('Product added successfully');
        setForm({
          name: '',
          oldPrice: '',
          newPrice: '',
          description: '',
          category: '',
        });
        setImages([]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert(error?.response?.data?.message || 'Something went wrong.');
    }
  };
  
  
  
  return (
    <div className='text-black flex'>
        <Sidebar/>
        <form className='py-[170px] px-[180px] items-center relative ml-[400px]'>
        <p className='font-bold text-center justify-center text-2xl mb-4'>Add Product</p>
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
                    <input name='name' value={form.name} type='text' placeholder='Enter Product Name' className='py-1 border px-1.5 w-[430px] text-[14px]' onChange={handleChange}/>
                    {errors.name && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.name}</p>}
                  </div>
                  <div className='py-2.5'>
                    <input name='oldPrice' value={form.oldPrice} type='Number' placeholder='OldPrice' className='py-1 border px-1.5 w-[430px] text-[14px]' onChange={handleChange}/>
                     {errors.oldPrice && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.oldPrice}</p>}
                  </div>
                  <div className='py-2.5'>
                    <input name='newPrice' value={form.newPrice} type='Number' placeholder='NewPrice' className='py-1 border px-1.5 w-[430px] text-[14px] 'onChange={handleChange}/>
                    {errors.newPrice && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.newPrice}</p>}
                  </div>
                  <div className='py-2.5'>
                    <input name='description' value={form.description} type='text' placeholder='Enter Description' className='py-1 border px-1.5 w-[430px] text-[14px] 'onChange={handleChange}/>
                    {errors.description && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.description}</p>}
                  </div>
                  <div className='py-2.5'>
                    <input
                    type='file'
                    name='images'
                    multiple
                    accept='image/*'
                    onChange={handleImageChange}
                    className='py-1 border px-1.5 w-[430px] text-[14px] cursor-pointer'
                    />
                    {errors.images && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.images}</p>}
                  </div>
                  <div className='py-2.5'>
                    <input name='category' value={form.category} type='text' placeholder='Enter category' className='py-1 border px-1.5 w-[430px] text-[14px] cursor-pointer' onChange={handleChange}/>
                    {errors.category && <p className='text-red-500 text-sm absolute text-[10px] mt-0.5'>{errors.category}</p>}
                  </div>
              </div>
            </div>
            <button onClick={handleSubmit} className=' bg-gray-500 rounded-xl py-1.5 px-2 absolute bottom-[100px] right-[50px]'> Submit</button>
        </form>
    </div>
  )
}

export default page
