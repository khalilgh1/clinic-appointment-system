'use client';

import React from 'react';

export default function ScrollNavbar({ children }) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)] shadow-lg transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {children}
      </nav>

      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      {/* Height: h-24 (96px) + py-5 top (20px) + py-5 bottom (20px) = 136px mobile */}
      {/* Height: h-28 (112px) + py-5 top (20px) + py-5 bottom (20px) = 152px desktop */}
      <div aria-hidden className="h-[85px] lg:h-[95px]" />
    </>
  );
}

