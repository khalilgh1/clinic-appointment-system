'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import './admin.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden md:block bg-primary text-white w-max md:w-64 lg:w-72 h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 w-full">
        {/* Constrain content width and center to avoid 'zoomed' feeling */}
        <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}