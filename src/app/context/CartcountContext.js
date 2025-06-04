"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from './UserContext';

const CounterContext = createContext()

export const CounterProvider = ({ children }) => {
  const { userId } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!userId) {
      setCartCount(0);
      return;
    }
    const storedCount = localStorage.getItem(`cartCount_${userId}`);
    setCartCount(storedCount ? parseInt(storedCount, 10) : 0);
    setIsHydrated(true);
  }, [userId]);
  
  useEffect(() => {
    if (isHydrated && userId) {
      localStorage.setItem(`cartCount_${userId}`, cartCount.toString());
    }
  }, [cartCount, isHydrated, userId]);

  useEffect(() => {
    if (isHydrated && userId && cartCount !== undefined) {
      localStorage.setItem(`cartCount_${userId}`, cartCount.toString());
    }
  }, [cartCount, isHydrated, userId]);
  
  const updateCart = (items) => {
    const validItems = Array.isArray(items) ? items : [];
    setCartItems(validItems);
    const total = validItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };
  


  const addToCart = (quantity = 1) => {
    setCartCount((prev) => prev + quantity);
  };

  const removeFromCart = (quantity = 1) => {
    setCartCount((prev) => (prev - quantity >= 0 ? prev - quantity : 0));
  };

  const clearCart = ()=>{
    setCartItems([])
    setCartCount(0);
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
      localStorage.removeItem(`cartCount_${userId}`);
    }
  }

    
    return (
        <CounterContext.Provider value={{ cartCount, addToCart,removeFromCart,setCartCount,cartItems,setCartItems,updateCart,clearCart }}>
          {children}
        </CounterContext.Provider>
      );
}

export const useCounter =()=> useContext(CounterContext)