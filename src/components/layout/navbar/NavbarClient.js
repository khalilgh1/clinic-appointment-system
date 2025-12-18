'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function NavbarClient({ children, theme = 'theme1' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const isTheme1 = theme === 'theme1';

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const checkScroll = () => {
      const nav = document.querySelector('nav[data-scrolled]');
      setIsScrolled(nav?.getAttribute('data-scrolled') === 'true');
    };

    checkScroll();
    const interval = setInterval(checkScroll, 100);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Portal for mobile menu
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const menuContent = (
    <div
      className={`lg:hidden fixed inset-0 bg-[var(--color-bg-primary)] z-[100] transition-all duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {/* Menu Content - positioned below navbar */}
      <div className="min-h-screen flex flex-col relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-[var(--color-text-secondary)] hover:opacity-80 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X size={28} />
        </button>
        <div className="flex-1 pb-10 pt-14">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden transition-all duration-300 p-1.5 hover:opacity-80 rounded-lg active:scale-95 ${
          isTheme1
            ? 'text-[var(--color-primary)]'
            : 'text-white'
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mounted && typeof document !== 'undefined' 
        ? require('react-dom').createPortal(menuContent, document.body) 
        : null}
    </>
  );
}