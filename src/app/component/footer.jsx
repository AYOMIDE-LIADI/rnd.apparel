import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaRegCopyright } from "react-icons/fa6";

const footer = () => {
  return (
    <div>
        <div className='text-black px-[50px] py-[50px] bg-gray-200'>
                    <div className='lg:flex gap-[150px] md:grid md:grid-cols-2'>
                        <div className='w-[350px]'>
                            <p className='text-[20px] '>rnd.apparel</p>
                            <p className='text-[13px] mt-[10px]'>This is the space to introduce visitors to the business or brand.
                                 Briefly explain who's behind it, what it does 
                                and what makes it unique. Share its core values
                                 and what this site has to offer.
                            </p>
                            <div className='flex items-center gap-2.5 text-black mt-[30px]'>
                                <FaFacebookF/>
                                <FaTiktok/>
                                <FaInstagram/>
                                <FaYoutube/>
                            </div>
                            
                            <div className="relative w-[460px] mt-[40px]">
                            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                placeholder="Enter Search Term"
                                className="border border-black lg:w-[403px] md:w-[303px] w-[300px] pl-10 rounded-md px-3 py-2 text-[14px] placeholder:text-gray-400"
                            />
                            </div>
        
                        </div>
                        <div>
                             <p className='text-[25px] '>Categories</p>
                             <p className='text-[16px] mt-[10px] font-bold'>Women</p>
                             <p className='text-[13px] '>Tops</p>
                             <p className='text-[13px] '>Bottoms</p>
                             <p className='text-[16px] mt-[10px] font-bold'>Men</p>
                             <p className='text-[13px] '>Tops</p>
                             <p className='text-[13px] '>Bottoms</p>
                             <p className='text-[13px]'>Accesories</p>
                             <p className='text-[13px] '>Sale</p>
                        </div>
                        <div>
                             <p className='text-[25px] '>Contact</p>
                             <p className='text-[13px] '>500 Terry Francine Street San Francisco, CA 94158 info@mysite.comTel: 123-456-7890</p>
                             <p className='text-[25px] mt-[10px]'>Shop Policies</p>
                             <p className='text-[13px] '>Shipping Policy</p>
                             <p className='text-[13px] '>Refund Policy</p>
        
                        </div>
                        <div>
                             <p className='text-[25px] '>Newsletter</p>
                             <p className='text-[13px] '>Subscribe to our newsletter and get 10% off your first order</p>
                             <input
                                type="email"
                                placeholder="Enter your Email"
                                className="border border-black lg:w-[403px] md:w-[303px] w-[300px]  rounded-md px-3 py-2 mt-3.5 text-[14px] placeholder:text-gray-400"
                            />
                            <div className='mt-[20px] items-center gap-2 flex'>
                                <input type='checkbox'/>
                                <p className='text-[13px]'>Yes, Subscribe me to your newsletter</p>
                            </div>
                            <div className='button bg-black text-white items-center py-2 px-[6px] mt-[20px] w-[100px] rounded-md text-center cursor-pointer'>Subscribe</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-[12px] text-black mt-[20px]'>
                        <p className='underline cursor-pointer'>Terms and Conditions</p>
                        <p className='underline cursor-pointer'>Privacy Policy</p>
                        <div className='underline cursor-pointer'>Accessibility Statement</div>
                        <div className='items-center flex gap-2'>
                            <FaRegCopyright />
                            <p>2035 by Liadi Ayomide Daniel</p>
                        </div>
                    </div>
                </div>
      
    </div>
  )
}

export default footer
