"use client"
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({children}) =>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSideBar =()=> setIsSidebarOpen(true)
    const closeSideBar =()=> setIsSidebarOpen(false)

    return (
        <SidebarContext.Provider value={{isSidebarOpen, openSideBar, closeSideBar}}>{children}</SidebarContext.Provider>
    );
}

export const useSidebar =()=> useContext(SidebarContext);