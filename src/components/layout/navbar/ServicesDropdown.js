/**
 * Services Dropdown
 * 
 * A dynamic dropdown component for displaying available services.
 * It fetches the list of active services from Supabase and displays them
 * in a dropdown menu on desktop or a collapsible list on mobile.
 */
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { supabase as createSupabaseClient } from '@/lib/supabase/client';

export default function ServicesDropdown({ isMobile = false, isActive = false, theme = 'theme1' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const timeoutRef = React.useRef(null);
  const isTheme1 = theme === 'theme1';

  React.useEffect(() => {
    const checkScroll = () => {
      const nav = document.querySelector('nav[data-scrolled]');
      setIsScrolled(nav?.getAttribute('data-scrolled') === 'true');
    };

    checkScroll();
    const interval = setInterval(checkScroll, 100);
    return () => clearInterval(interval);
  }, []);

  // Fetch services from Supabase
  React.useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from('service')
          .select('service_id, name')
          .eq('is_active', true)
          .order('name', { ascending: true });

        if (error) throw error;

        // Transform to include href based on service_id or name
        const transformedServices = data.map(service => ({
          name: service.name,
          href: `/services/${service.service_id}` // or use slugified name
        }));

        setServices(transformedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  // Close dropdown when pathname changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Desktop hover handlers with delay
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // 300ms delay before closing
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <div className="border-t border-gray-100 py-4">
        <div className="px-6 mb-1">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className={`w-full flex items-center justify-between font-medium text-lg transition-colors duration-200 ${isTheme1 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
              }`}
            aria-expanded={isOpen}
            aria-controls="mobile-services-list"
          >
            <span>Services</span>
            <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div id="mobile-services-list" className={`${isOpen ? 'block' : 'hidden'} space-y-1 px-0`}>
          {loading ? (
            <div className="px-6 py-2 text-gray-500">Chargement...</div>
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex items-center justify-between px-6 py-3 text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 transition-all duration-200 group"
              >
                <span className="flex-1 text-base">{service.name}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
              </Link>
            ))
          ) : (
            <div className="px-6 py-2 text-gray-500">Aucun service disponible</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="relative">
        <span className={`text-sm font-medium transition-colors duration-300 ${isActive
            ? isTheme1 ? 'text-[var(--color-primary)]' : 'text-white'
            : isTheme1
              ? 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'
              : 'text-white/80 group-hover:text-white'
          }`}>
          Services
        </span>
        <ChevronDown
          size={14}
          className={`inline-block ml-1 transition-all duration-300 ${isOpen ? 'rotate-180' : ''
            } ${isActive
              ? isTheme1 ? 'text-[var(--color-primary)]' : 'text-white'
              : isTheme1
                ? 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'
                : 'text-white/80 group-hover:text-white'
            }`}
        />
        <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isTheme1 ? 'bg-[var(--color-primary)]' : 'bg-white'
          } ${isActive || isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="p-2">
          {loading ? (
            <div className="px-4 py-3.5  text-gray-500">Chargement...</div>
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <span className="flex-1 leading-relaxed">{service.name}</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0 ml-2" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-3.5  text-gray-500">Aucun service disponible</div>
          )}
        </div>
      </div>
    </div>
  );
}