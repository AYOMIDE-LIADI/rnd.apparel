"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";
import { useCounter } from "../context/CartcountContext";
import { useUser } from '../context/UserContext'
import axios from "axios";


const CartPage = () => {
    const { cartCount,cartItems,setCartCount, addToCart, removeFromCart,updateCart } = useCounter();
    const { isSidebarOpen, closeSideBar } = useSidebar();
    const { userId } = useUser();
    
  const fetchCart = async () => {
    try {
      const res = await fetch(`https://rnd-backend-1.onrender.com/api/cart/${userId}`);
      const data = await res.json();
      if (data.success) {
        updateCart(data.cart.items);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };
  
  const handleIncrease = async (productId) => {
    try {
      const response = await axios.post("https://rnd-backend-1.onrender.com/api/cart/add", {
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
  
      const data = response.data;
  
      if (data.success) {
        fetchCart();
        addToCart()
      }
    } catch (err) {
      console.log("Error adding to cart:", err.response?.data || err.message);
    }
  };
  

  const handleDecrease = async (productId) => {
    const item = cartItems.find((i) => i.productId._id === productId);
    if (item.quantity <= 1) return;
  
    try {
      await axios.post("https://rnd-backend-1.onrender.com/api/cart/add", {
        userId,
        items: [
          {
            productId,
            quantity: -1, 
          },
        ],
      });
  
      fetchCart(); 
      removeFromCart()
    } catch (err) {
      console.log("Error reducing cart:", err.response?.data || err.message);
    }
  };
  

  
  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(`https://rnd-backend-1.onrender.com/api/cart/${userId}/${productId}`);
      if (res.data.success) {
        fetchCart(); 
      }else{
        console.log("Api Error"); 
      }
    } catch (err) {
      console.log("Error deleting item:", err.response?.data || err.message);
    }
  };
  

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      fetchCart();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isSidebarOpen]);

  useEffect(()=>{
    if(cartItems.length < 1){
      setCartCount(0)
    }else {
      const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  },[cartItems])

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productId.newPrice,
      0
    );
  };

  console.log(cartItems);
  
  
  return (
    <div>
      {isSidebarOpen && (
        <div
          onClick={closeSideBar}
          className="closeit h-[654px] w-full bg-black/50 fixed mt-[75px] z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="main bg-white md:w-[440px] w-[350px] md:h-full border right-0 absolute p-[20px] text-black"
          >
            <div className="flex gap-1.5 items-center mb-3.5">
              <p className="text-[20px] font-medium">Cart</p>
              <p className="text-[14px]">{cartCount} item(s)</p>
            </div>
            <hr />
            <div className="h-[430px] overflow-y-auto">
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <div
        key={item.productId._id}
        className="flex gap-3.5 items-center my-2.5"
      >
        <div>
          {item?.productId?.images?.[2] && (
            <Image
              src={item.productId.images[2].trim()}
              alt="product-image"
              height={230}
              width={100}
              className="border border-black"
            />
          )}
        </div>

        <div className="pt-[22px] w-full relative">
        <p className="text-black text-[14px] mb-1.5">
          {item?.productId?.name || 'Loading...'}
        </p>


          <div className="flex gap-2.5 items-center">
            {item.productId.oldPrice && (
              <p className="text-black text-[12px] mb-1 line-through">
                ${item.productId.oldPrice}
              </p>
            )}
            <p className="text-black text-[12px] mb-1">
              ${item.productId.newPrice}
            </p>
          </div>

          <p className="text-black text-[12px] mb-1">
            Quantity: {item.quantity}
          </p>

          <div className="flex justify-between items-center">
            <div className="border rounded-md w-[80px] items-center flex justify-between px-[8px] mt-2.5">
              <p
                className="text-[25px] cursor-pointer"
                onClick={() => handleDecrease(item.productId._id)}
              >
                -
              </p>
              <p className="text-[15px]">{item.quantity}</p>
              <p
                className="text-[25px] cursor-pointer"
                onClick={() => handleIncrease(item.productId._id)}
              >
                +
              </p>
            </div>

            <div className="text-[14px] pr-[40px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={item.quantity * item.productId.newPrice}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  ${(item.quantity * item.productId.newPrice).toFixed(2)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <AiOutlineDelete
            onClick={() => handleDelete(item.productId._id)}
            className="absolute right-0 top-[25px] cursor-pointer"
          />
        </div>
      </div>
    ))
  ) : (
    <p className="mt-2.5 font-bold">No Item Added</p>
  )}
</div>

            <hr />
            <div className="flex justify-between text-black text-[20px] py-[10px]">
              <p>SubTotal</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={calculateTotal()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  ${calculateTotal().toFixed(2)}
                </motion.p>
              </AnimatePresence>
            </div>
            <Link href="/Checkout_page">
              <div className="border rounded-md w-full items-center cursor-pointer hover:border-0 text-center py-[12px]">
                <p className="text-[14px]">Checkout</p>
              </div>
            </Link>
            <Link href="/ViewCart_page">
              <div className="border rounded-md w-full items-center cursor-pointer hover:text-gray-700 text-white bg-black text-center py-[12px] mt-[7px]">
                <p className="text-[14px]">View Cart</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
