"use client"
import React from 'react'
import Sidebar from '../Component/sidebar'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
import { AiOutlineDelete } from "react-icons/ai";

const page = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/order");
        if (res.status === 200){
            console.log(res.data)
            setOrders(res.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteOrder=async(id)=>{
        try {
            const resp = await axios.delete(`http://localhost:5000/api/order/${id}`)
            if(resp.status === 200){
                alert("order deleted successfully")
                window.location.reload()
            }else{
                alert("Api Error")
            }
        } catch (error) {
            console.log(error.message);  
        }
  }

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className='text-black flex'>
      <Sidebar/>
      <div className=" py-[170px] px-[180px]  items-center relative ml-[400px] min-h-screen p-6  bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Orders Dashboard</h1>

      {orders.length === 0 ? (
  <p>No orders available.</p>
) : (
  <div className="grid gap-6">
    {orders.map((order, index) => (
      <div
        key={order._id || index}
        className="bg-white p-6 rounded-xl shadow-md relative" // ✅ Make this relative for absolute positioning
      >
        {/* 🗑️ Delete Button */}
        <button
          onClick={() => handleDeleteOrder(order._id)}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800"
          title="Delete Order"
        >
          <AiOutlineDelete size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-2">Order #{index + 1}</h2>

        <div className="mb-4">
          <h3 className="font-bold text-gray-700">Customer Info</h3>
          <p><span className="font-medium">Name:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
          <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
          <p><span className="font-medium">Phone:</span> {order.customerInfo.phone}</p>
          <p><span className="font-medium">Address:</span> {order.customerInfo.address}, {order.customerInfo.postalCode}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-gray-700 mb-1">Cart Items</h3>
          <ul className="space-y-2">
            {order.cartItems?.map((item, i) => (
              <li
                key={i}
                className="bg-gray-50 p-2 rounded border flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  {item?.images && (
                    <Image
                      src={`http://localhost:5000/uploads/${item.images}`}
                      alt="image"
                      height={90}
                      width={100}
                      className="border border-black"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.name || "Product"}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-green-600 whitespace-nowrap">
                  ₦{item.newPrice * item.quantity}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">Total: ₦{order.totalAmount}</p>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
    </div>
  )
}

export default page
