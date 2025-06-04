'use client';

import { SidebarProvider } from './context/SidebarContext';

export default function SidebarClientWrapper({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}