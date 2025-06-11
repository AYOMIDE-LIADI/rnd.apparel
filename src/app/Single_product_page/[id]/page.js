"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import Image from 'next/image'
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterestP } from "react-icons/fa6";
import { useCounter } from '../../context/CartcountContext'
import Cartpage from '../../component/cartpage'
import { useRouter } from 'next/navigation';
import axios from 'axios'
import {useUser} from '../../context/UserContext'
import { useParams } from 'next/navigation'


const page = () => {
    const router = useRouter()
    const {addToCart} = useCounter() 
    const [count, setCount] = useState(1); 
    const increase = () => setCount(prev => prev + 1);
    const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));
    const {userId} = useUser()
    const {cartCount,setCartCount} = useCounter()
    const {id} = useParams()
    
    
    const [selectedColor, setSelectedColor] = useState('');


    const [description, setDescription] = useState({
        color : "",
        size : "",
    })
    const [error, setError] = useState({
        color : "",
        size : "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDescription((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setError(prev => ({
            ...prev,
            [name]: '', 
          }));
    };
    const handleChangeForColour = (field, value) => {
        setSelectedColor(value)
        setDescription(prev => ({
          ...prev,
          [field]: value,
        }));
      
        setError(prev => ({
          ...prev,
          [field]: '', 
        }));
      };
      

    const formValidate =()=>{
        const newErrors ={}

        if (description.color === ""){
            newErrors.color = "pick a colour"
        }
        if (description.size === ""){
            newErrors.size = "pick a size"
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if (formValidate()) {
            try {
                handleAddToCart();
                console.log("Item added to cart");
            } catch (error) {
                console.log(error);
            }
            return true;
        } else {
            console.log("error in validation");
            return false;
        }
    };
    

    const handleBuyNowSubmit = (e) => {
        e.preventDefault();
        if (formValidate()) {
            try {
                handleAddToCart(); 
                router.push('/Checkout_page'); 
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Error in validation");
        }
    };
    
    const product = {
        userId,
        items: [
            {
                productId: id,
                quantity: count,
            },
        ],
    };
    

    const addToCart1 = async () => {
        const user = localStorage.getItem("userId")
        if (!user){
            alert("Please login to add item to cart");
            return;
        }
        try {
          const resp = await axios.post("https://rnd-backend-1.onrender.com/api/cart/add",product);      
          if (resp.status===200) {
            alert("Added to cart successfully!");
            addToCart(count); 
          }
        }catch (err) {
           console.log(err.message);
           
          }
          
      };

      const [singleProduct, setSingleProduct]= useState({})  
          
      useEffect(()=>{
        const getSingleProduct =async()=>{
            try {
                const resp = await axios.get(`https://rnd-backend-1.onrender.com/api/products/${id}`)
                if (resp.status === 200){
                    setSingleProduct(resp.data)
                    const setUserId = localStorage.getItem("userId")
                    if(setUserId){
                        const count = localStorage.getItem(`cartCount_${setUserId}`)
                        setCartCount(count ? parseInt(count): 0)
                    }else{
                        setCartCount(0)
                    }
                }else{
                    console.log("error in Api");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
            getSingleProduct()
      },[id])

      const handledoubleFunction = async (e) => {
        e.preventDefault();
        const isValid = handleSubmit(); 
        if (isValid) {
            await addToCart1();
        }
    };
    
  return (
    <div className='relative'>
        <Header />
        <Cartpage/>
        <div className="container px-[50px] text-black pt-[90px]">
            <p className='text-[14px] mb-5'>Home - {singleProduct.name}</p>
            <div className='md:flex md:gap-[40px] mb-[40px]'>
            <div>
            <div className='md:flex gap-3.5 items-center mb-3.5'>
                {singleProduct?.images?.[0] && (
                <Image
                    src={singleProduct.images[0].trim()}
                    width={450}
                    height={400}
                    alt="image-0"
                />
                )}
                {singleProduct?.images?.[1] && (
                <Image
                    src={singleProduct.images[1].trim()}
                    width={450}
                    height={400}
                    alt="image-1"
                    className='md:mt-0 mt-4'
                />
                )}
            </div>

            {singleProduct?.images?.[3] && (
                <Image
                src={singleProduct.images[3].trim()}
                width={450}
                height={400}
                alt="image-3"
                />
            )}
            {singleProduct?.images?.[4] && (
                <Image
                src={singleProduct.images[4].trim()}
                width={450}
                height={400}
                alt="image-4"
                />
            )}
            </div>

                <form  className='md:w-[450px] md:mt-0 mt-6'>
                    <p className='text-[30px] mb-2.5'>{singleProduct.name}</p>
                    <p className='text-[9px] text-gray-500 mb-2.5'>SKU: 2375563872942324</p>
                    <div className='flex gap-2.5 items-center text-[25px] mb-3.5'>
                        <p className='text-gray-500 line-through '>${singleProduct.oldPrice}</p>
                        <p>${singleProduct.newPrice}</p>
                    </div>
                    <p className='text-[13px]'>{singleProduct.description}
                    </p>
                    <p className='text-[13px] mt-[20px]'>Colour</p>
                    <div className="flex gap-1.5 mt-2">
                        <div
                            className={`border rounded-md bg-green-500 h-[18px] w-[18px] cursor-pointer ${selectedColor === 'green' ? 'border-black border-4' : 'border-black hover:border-4 hover:border-gray-300'}`}
                            onClick={() => handleChangeForColour('color', 'green')}
                        ></div>
                        <div
                            className={`border rounded-md bg-amber-400 h-[18px] w-[18px] cursor-pointer ${selectedColor === 'amber' ? 'border-black border-4' : 'border-black hover:border-4 hover:border-gray-300'}`}
                            onClick={() => handleChangeForColour('color', 'amber')}
                        ></div>
                        <div
                            className={`border rounded-md bg-red-500 h-[18px] w-[18px] cursor-pointer ${selectedColor === 'red' ? 'border-black border-4' : 'border-black hover:border-4 hover:border-gray-300'}`}
                            onClick={() => handleChangeForColour('color', 'red')}
                        ></div>
                    </div>
                    {error.color&& <p className='text-red-700 text-[10px] mt-[3px] absolute'>{error.color}</p>}

                    <p className='text-[13px] mt-[20px]'>Size</p>
                    <select name='size' value={description.size}  className='text-[11px] w-full border py-1.5 px-0.5 rounded-md mt-2' onChange={handleChange}>
                        <option hidden>Select</option>
                        <option value="small">S</option>
                        <option value="medium">M</option>
                        <option value="large">L</option>
                    </select>
                    {error.size&& <p className='text-red-700 text-[10px] mt-[3px] absolute'>{error.size}</p>}

                    <p className='text-[13px] mt-[20px]'>Quantity</p>
                    <div className='border rounded-md w-[80px] items-center flex justify-between px-[8px] mt-2.5'>
                        <p className='text-[20px] cursor-pointer' onClick={decrease}>-</p>
                        <p className='text-[16px]'>{count}</p>
                        <p className='text-[20px] cursor-pointer' onClick={increase}>+</p>
                    </div>
                    <button onClick={(e) => handledoubleFunction(e)} className='border rounded-md w-full items-center cursor-pointer hover:text-white hover:bg-black text-center py-[15px] mt-[20px]'>
                        <p className='text-[18px]'>Add to Cart</p>
                    </button>
                    <button onClick={handleBuyNowSubmit} className='border rounded-md w-full items-center cursor-pointer hover:bg-gray-700 text-white bg-black text-center py-[15px] mt-[20px]'>
                            <p className='text-[18px]'>Buy Now</p>
                    </button>
                    
                    <div className='items-center flex gap-2 mt-[30px]'>
                        <FaFacebookF className='cursor-pointer'/>
                        <FaPinterestP className='cursor-pointer'/>
                        <IoLogoWhatsapp className='cursor-pointer'/>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
      
    </div>
  )
}

export default page
