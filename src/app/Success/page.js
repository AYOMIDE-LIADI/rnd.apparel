"use client";

import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">
        <AiOutlineCheckCircle className="text-blue-400 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Payment Successful!</h1>
        <p className="text-blue-400 mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        <Link
          href="/Homepage"
          className="inline-block bg-blue-400 text-white font-semibold px-6 py-2 rounded hover:bg-blue-500 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
