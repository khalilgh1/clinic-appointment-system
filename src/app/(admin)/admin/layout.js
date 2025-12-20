'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './sidebar';
import './admin.css';
import { Menu, X, LogOut } from 'lucide-react';
import { logout } from './(auth)/login/actions';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:block bg-primary text-white md:w-64 lg:w-72 h-screen fixed">
        <Sidebar />
      </aside>

      {/* Mobile hamburger button (moved to right) */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded bg-primary text-white shadow"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile full-screen menu overlay with slide-in animation */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 bg-white text-black p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-2">
            <X />
          </button>
        </div>

        <nav className={`mt-8 flex flex-col gap-4 transition-opacity duration-200 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/admin/overview" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded hover:bg-gray-100">
            Tableau de bord
          </Link>
          <Link href="/admin/appointments" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded hover:bg-gray-100">
            Rendez-vous
          </Link>
          <Link href="/admin/doctors" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded hover:bg-gray-100">
            Médecins
          </Link>
          <Link href="/admin/services" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded hover:bg-gray-100">
            Services
          </Link>
        </nav>

        <div className={`mt-auto transition-opacity duration-200 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}>
          <form action={logout} className="w-full">
            <button type="submit" className="w-full px-4 py-3 rounded bg-red-600 text-white flex items-center gap-2 justify-center">
              <LogOut />
              Déconnexion
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 w-full min-h-screen md:ml-64 lg:ml-72">
        {/* Constrain content width and center to avoid 'zoomed' feeling */}
        <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}