/**
 * Main Navbar Component
 * 
 * This is the primary navigation bar for the application.
 * It determines the current theme (light or dark) based on the current route
 * and renders the appropriate navigation elements, including the logo,
 * desktop links, and the mobile menu toggle.
 */
import Link from 'next/link';
import Image from 'next/image';
import NavbarClient from './NavbarClient';
import ServicesDropdown from './ServicesDropdown';
import ScrollNavbar from './ScrollNavbar';
import { ArrowRight } from 'lucide-react';
import NavLink from './NavLink';

export default function Navbar({ currentPath = '/' }) {
  // Dynamic detection of services page
  const isServicesPage = currentPath.startsWith('/services');
  const isHomePage = currentPath === '/';
  const isMedecinsPage = currentPath === '/Doctor';
  const isAboutPage = currentPath === '/about';
  const isAppointmentPage = currentPath.startsWith('/MedicalBooking');

  // Determine theme: Theme 1 for Doctor, Appointment | Theme 2 for Home, About,Services
  const isTheme1 = isMedecinsPage || isAppointmentPage;
  const theme = isTheme1 ? 'theme1' : 'theme2';

  // Logo based on theme
  const logoSrc = isTheme1 ? '/logo.png' : '/logofooter.png';

  // Custom backgrounds for specific pages
  let spacerClassName = '';
  let scrolledBgClassName = '';

  if (isAppointmentPage) {
    spacerClassName = 'bg-[var(--color-bg-primary)]';
    scrolledBgClassName = 'bg-[var(--color-bg-primary)]/95 backdrop-blur-lg shadow-sm';
  } else if (isMedecinsPage) {
    spacerClassName = 'bg-white';
    scrolledBgClassName = 'bg-white/95 backdrop-blur-lg shadow-sm';
  }

  return (
    <ScrollNavbar
      theme={theme}
      hasBackground={true}
      spacerClassName={spacerClassName}
      scrolledBgClassName={scrolledBgClassName}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 lg:py-5">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 relative z-50">
              <Image
                src={logoSrc}
                width={isTheme1 ? 100 : 120}
                height={isTheme1 ? 40 : 50}
                priority
                alt="Clinique PMA Fertival"
                className={`${isTheme1 ? 'h-25 lg:h-30' : 'h-25 lg:h-30'} w-auto object-contain`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 2xl:gap-8 ml-6 xl:ml-8 2xl:ml-10">
              <NavLink href="/" isActive={isHomePage} theme={theme}>
                Accueil
              </NavLink>
              <NavLink href="/Doctor" isActive={isMedecinsPage} theme={theme}>
                Médecins
              </NavLink>
              <ServicesDropdown isActive={isServicesPage} theme={theme} />
              <NavLink href="/about" isActive={isAboutPage} theme={theme}>
                À propos
              </NavLink>
            </div>
          </div>

          {/* Right Section: CTA Button + Mobile Menu */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Desktop CTA Button */}
            <Link
              href="/MedicalBooking"
              className={`hidden lg:flex px-5 xl:px-6 py-2 rounded-full font-medium text-sm items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 ${isTheme1
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-[var(--color-text-secondary)]'
                }`}
            >
              <span className="whitespace-nowrap">
                Prendre Rendez-Vous
              </span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5 ${isTheme1
                ? 'bg-white'
                : 'bg-[var(--color-primary)]'
                }`}>
                <ArrowRight
                  className={`w-3 h-3 ${isTheme1 ? 'text-[var(--color-primary)]' : 'text-white'}`}
                  strokeWidth={3}
                />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <NavbarClient theme={theme}>
              <div className="py-2 bg-[var(--color-bg-primary)]">
                <Link
                  href="/"
                  className={`relative block px-6 py-4 transition-all duration-300 group overflow-hidden text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] ${isHomePage ? 'text-[var(--color-primary)]' : ''
                    }`}
                >
                  <span className="relative z-10 inline-block font-small">Accueil</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 bg-[var(--color-primary)] ${isHomePage ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                </Link>
                <Link
                  href="/Doctor"
                  className={`relative block px-6 py-4 transition-all duration-300 group overflow-hidden text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] ${isMedecinsPage ? 'text-[var(--color-primary)]' : ''
                    }`}
                >
                  <span className="relative z-10 inline-block font-medium">Médecins</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 bg-[var(--color-primary)] ${isMedecinsPage ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                </Link>
                <ServicesDropdown isMobile={true} isActive={isServicesPage} theme={theme} />
                <Link
                  href="/about"
                  className={`relative block px-6 py-4 transition-all duration-300 group overflow-hidden text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] ${isAboutPage ? 'text-[var(--color-primary)]' : ''
                    }`}
                >
                  <span className="relative z-10 inline-block font-medium">À propos</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 bg-[var(--color-primary)] ${isAboutPage ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                </Link>
                <div className="px-6 py-4 mt-2">
                  <Link
                    href="/MedicalBooking"
                    className={`block w-full text-center px-6 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-3 text-base hover:shadow-lg hover:scale-[1.02] active:scale-95 ${isTheme1
                      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary-light)]'
                      : 'bg-white text-[var(--color-text-secondary)] hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center">Prendre Rendez-Vous</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-1 ${isTheme1 ? 'bg-white' : 'bg-[var(--color-primary)]'
                      }`}>
                      <ArrowRight
                        className={`w-4 h-4 ${isTheme1 ? 'text-[var(--color-primary)]' : 'text-white'}`}
                        strokeWidth={2.5}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </NavbarClient>
          </div>
        </div>
      </div>
    </ScrollNavbar>
  );
}