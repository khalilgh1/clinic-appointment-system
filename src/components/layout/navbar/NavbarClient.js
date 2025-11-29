'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function NavbarClient({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-[var(--color-primary)] hover:text-[var(--color-secondary-light)] transition-all duration-300 p-2 hover:bg-gray-50 rounded-lg active:scale-95"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu - Fixed spacing */}
      <div
        className={`lg:hidden fixed top-[134px] sm:top-[148px] left-0 right-0 bg-[var(--color-bg-primary)] shadow-2xl transition-all duration-300 ease-in-out overflow-hidden max-h-[calc(100vh-148px)] overflow-y-auto ${
          isOpen ? 'opacity-100 visible translate-y-[-49px]' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        {children}
      </div>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}