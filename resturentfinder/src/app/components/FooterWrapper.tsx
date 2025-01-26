'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide Navbar on the dashboard page
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) {
    return null;
  }

  return <Footer />;
}
