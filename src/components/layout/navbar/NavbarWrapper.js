/**
 * Navbar Wrapper
 * 
 * A client component wrapper that fetches the current pathname.
 * It passes the current path to the main Navbar component to enable
 * route-specific logic, such as theme switching and active link highlighting.
 */
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const currentPath = usePathname();
  return <Navbar currentPath={currentPath} />;
}

