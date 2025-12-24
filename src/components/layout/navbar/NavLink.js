/**
 * Navigation Link Component
 * 
 * A reusable link component for the navbar.
 * It handles active state styling and hover effects, dynamically adjusting
 * text and underline colors based on the current theme and scroll state.
 */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavLink({ href, children, isActive, theme = 'theme1' }) {
  const isTheme1 = theme === 'theme1';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const nav = document.querySelector('nav[data-scrolled]');
      setIsScrolled(nav?.getAttribute('data-scrolled') === 'true');
    };

    checkScroll();
    const interval = setInterval(checkScroll, 100);
    return () => clearInterval(interval);
  }, []);

  // When navbar has white background (scrolled), use dark text for theme 2
  const getTextColor = () => {
    if (isActive) {
      return isTheme1 ? 'text-[var(--color-primary)]' : 'text-white';
    }
    if (isTheme1) {
      return 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]';
    }
    // Theme 2: white when transparent, AND white when scrolled (dark bg)
    return 'text-white/80 group-hover:text-white';
  };

  const getUnderlineColor = () => {
    if (isTheme1) return 'bg-[var(--color-primary)]';
    return 'bg-white';
  };
  
  return (
    <Link
      href={href}
      className="relative inline-block group"
    >
      <span className={`text-sm font-medium transition-colors duration-300 ${getTextColor()}`}>
        {children}
      </span>
      {/* Smooth underline animation */}
      <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${getUnderlineColor()} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
}