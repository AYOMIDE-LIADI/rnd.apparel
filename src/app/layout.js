import { League_Spartan } from 'next/font/google';
import "./globals.css";
import SidebarClientWrapper from './SidebarClientWrapper'
import { CounterProvider } from './context/CartcountContext';
import { UserProvider } from './context/UserContext'
import { AdminProvider } from './Admin/context/AdminContext';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-spartan',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'My E-commerce',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body>
        <AdminProvider>
        <UserProvider>
        <CounterProvider>
        <SidebarClientWrapper>
            {children}
        </SidebarClientWrapper>
        </CounterProvider>
        </UserProvider>
        </AdminProvider>
        </body>
    </html>
  );
}

