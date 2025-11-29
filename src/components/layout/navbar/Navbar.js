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

  return (
    <ScrollNavbar>
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-40 2xl:px-20 py-5">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 flex-shrink-0">
              <Image
                src="/logo1.png"
                width={180}
                height={80}
                priority
                alt="Clinique PMA Fertival"
                className="h-80 lg:h-75 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-12 2xl:gap-16 ml-12 xl:ml-16 2xl:ml-20">
              <NavLink href="/" isActive={isHomePage}>
                Accueil
              </NavLink>
              <NavLink href="/Doctor" isActive={isMedecinsPage}>
                Médecins
              </NavLink>
              <ServicesDropdown isActive={isServicesPage} />
              <NavLink href="/about" isActive={isAboutPage}>
                À propos
              </NavLink>
            </div>
          </div>

          {/* Right Section: CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA Button */}
            <Link
              href="/MedicalBooking"
              className="hidden lg:flex px-8 xl:px-10 py-4 rounded-full font-semibold items-center justify-center gap-4 bg-primary text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
                <span className="text-lg xl:text-xl whitespace-nowrap flex items-center">
                Prendre Rendez-Vous
              </span>
              <div className="w-8 h-8 rounded-full bg-white backdrop-blur-sm flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4 text-primary" strokeWidth={3.5} />
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <NavbarClient>
              <div className="py-2 bg-[var(--color-bg-primary)]">
                <Link
                  href="/"
                  className="relative block px-6 py-4 transition-all duration-300 text-lg text-[var(--color-text-secondary)] hover:bg-gray-50 group overflow-hidden"
                >
                  <span className="relative z-10 inline-block font-medium">Accueil</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
                    isHomePage ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </Link>
                <Link
                  href="/Doctor"
                  className="relative block px-6 py-4 transition-all duration-300 text-lg text-[var(--color-text-secondary)] hover:bg-gray-50 group overflow-hidden"
                >
                  <span className="relative z-10 inline-block font-medium">Médecins</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
                    isMedecinsPage ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </Link>
                <ServicesDropdown isMobile={true} isActive={isServicesPage} />
                <Link
                  href="/about"
                  className="relative block px-6 py-4 transition-all duration-300 text-lg text-[var(--color-text-secondary)] hover:bg-gray-50 group overflow-hidden"
                >
                  <span className="relative z-10 inline-block font-medium">À propos</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
                    isAboutPage ? 'w-full' : 'group-hover:w-full'
                  }`}></span>
                </Link>
                <div className="px-6 py-4 mt-2">
                  <Link
                    href="/MedicalBooking"
                    className="block w-full text-center px-6 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-3 text-base bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary-light)] hover:shadow-lg hover:scale-[1.02] active:scale-95"
                  >
                    <span className="flex items-center">Prendre Rendez-Vous</span>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" strokeWidth={2.5} />
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