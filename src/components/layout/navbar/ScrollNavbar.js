'use client';

import React from 'react';

export default function ScrollNavbar({ 
  children, 
  theme = 'theme1', 
  hasBackground = false,
  spacerClassName = '',
  scrolledBgClassName = ''
}) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [showBackground, setShowBackground] = React.useState(false);
  const lastScrollYRef = React.useRef(0);


  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Show background when scrolled down (not at top)
      // Use a small buffer to avoid flickering at the very top
      const shouldShowBackground = currentScrollY > 20;
      setShowBackground(shouldShowBackground);
      
      // Show/hide navbar based on scroll direction
      // Only trigger if scroll difference is significant (e.g., 5px) to avoid jitter
      if (Math.abs(scrollDelta) > 5) {
        if (currentScrollY < 20) {
          // Always show at top
          setIsVisible(true);
        } else if (scrollDelta > 0 && currentScrollY > 100) {
          // Hide when scrolling down (after 100px)
          setIsVisible(false);
        } else if (scrollDelta < 0) {
          // Show when scrolling up
          setIsVisible(true);
        }
      }
      
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasWhiteBackground = showBackground && hasBackground;
  const isTheme1 = theme === 'theme1';

  // Determine background class
  let navBackgroundClass = 'bg-transparent';
  if (hasWhiteBackground) {
    if (scrolledBgClassName) {
      navBackgroundClass = scrolledBgClassName;
    } else {
      navBackgroundClass = isTheme1 
        ? 'bg-white/70 backdrop-blur-lg shadow-sm' 
        : 'bg-[var(--color-primary)]/95 backdrop-blur-lg shadow-sm';
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${navBackgroundClass}`}
        data-scrolled={hasWhiteBackground ? 'true' : 'false'}
        style={{ 
          width: '100%'
        }}
      >
        {children}
      </nav>
      
      {/* Spacer for Theme 1 only - prevents content from being hidden under fixed navbar */}
      {isTheme1 && (
        <div aria-hidden className={`h-14 lg:h-16 ${spacerClassName}`} />
      )}
    </>
  );
}

