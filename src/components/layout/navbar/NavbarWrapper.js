'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const currentPath = usePathname();
  return <Navbar currentPath={currentPath} />;
}

