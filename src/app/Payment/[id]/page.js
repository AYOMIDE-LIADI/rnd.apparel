"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PaystackButton } from 'react-paystack';
import { useUser } from "@/app/context/UserContext";
import { useCounter } from "@/app/context/CartcountContext";

const PaymentPage = () => {
  const publicKey = "pk_test_153e029f307ec0edd0b45d5dfa67b81aad71b005"
  const router = useRouter()
  const {userId} = useUser()
  const {clearCart} = useCounter()
  const {id} = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const amount = order?.totalAmount * 100
  const email = order?.customerInfo.email


  useEffect(() => {
    if (!id) return;
    
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`https://rnd-backend-1.onrender.com/api/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  
  const componentProps = {
    email,
    amount,
    metadata: {
      name: `${order?.customerInfo.firstName} ${order?.customerInfo.lastName}`,
      phone: order?.customerInfo.phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: async() =>{
      try {
         await axios.delete(`https://rnd-backend-1.onrender.com/api/cart/clear/${userId}`)
         clearCart();
         localStorage.removeItem(`cartCount_${userId}`);
         router.push("/Success")
      } catch (error) {
        
      }
    },
    onClose: () => alert("Payment closed without completion."),
  };


  if (loading) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-red-500">Order not found.</div>;
  }

  return (
    <div className="min-h-screen text-black bg-gray-100 flex justify-center items-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Payment for Order #{id?.slice(-6)}
        </h1>

        <div className="space-y-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Customer Info</h2>
            <p><strong>Name:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
            <p><strong>Email:</strong> {order.customerInfo.email}</p>
            <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
            <p><strong>Address:</strong> {order.customerInfo.address}, {order.customerInfo.postalCode}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Items</h2>
            <ul className="space-y-2">
              {order.cartItems.map((item, i) => (
                <li key={i} className="flex justify-between border p-2 rounded items-center bg-gray-50">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-blue-600 whitespace-nowrap">
                    ₦{item.newPrice * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right text-lg font-bold">
            Total: ₦{order.totalAmount}
          </div>
        </div>
        <PaystackButton {...componentProps} className="bg-blue-400 w-full hover:bg-blue-500 text-white py-2 px-4 rounded mt-4" />
      </div>
    </div>
  );
};

export default PaymentPage;
