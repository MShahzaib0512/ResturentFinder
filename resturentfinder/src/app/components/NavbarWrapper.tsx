'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide Navbar on the dashboard page
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) {
    return null;
  }

  return <Navbar />;
}
