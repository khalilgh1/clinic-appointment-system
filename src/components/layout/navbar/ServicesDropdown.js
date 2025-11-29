'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ServicesDropdown({ isMobile = false, isActive = false }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const pathname = usePathname();
  const timeoutRef = React.useRef(null);

  // Fetch services from Supabase
  React.useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient();
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
      <div className="border-t border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full flex items-center justify-between px-6 py-4 transition-all duration-300 hover:bg-gray-50 group overflow-hidden"
        >
          <span className={`relative z-10 text-lg font-medium transition-colors duration-300 ${
            isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]'
          }`}>
            Services
          </span>
          <ChevronDown 
            size={18} 
            className={`relative z-10 text-gray-500 transition-all duration-300 ${
              isOpen ? 'rotate-180' : ''
            } ${isActive ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}`}
          />
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
            isActive ? 'w-full' : 'group-hover:w-full'
          }`}></span>
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gray-50 py-2">
            {loading ? (
              <div className="px-10 py-3 text-lg text-gray-500">Chargement...</div>
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="flex items-center justify-between px-10 py-3 text-lg font-medium text-gray-600 hover:text-[var(--color-primary)] hover:bg-white transition-all duration-200 group"
                >
                  <span className="flex-1">{service.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              ))
            ) : (
              <div className="px-10 py-3 text-lg text-gray-500">Aucun service disponible</div>
            )}
          </div>
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
        <span className={`text-base lg:text-lg xl:text-xl font-medium transition-colors duration-300 ${
          isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-light)] group-hover:text-[var(--color-primary)]'
        }`}>
          Services
        </span>
        <ChevronDown 
          size={16} 
          className={`inline-block ml-1 transition-all duration-300 ${
            isOpen ? 'rotate-180' : ''
          } ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-light)] group-hover:text-[var(--color-primary)]'}`}
        />
        <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
          isActive || isOpen ? 'w-full' : 'w-0 group-hover:w-full'
        }`}></span>
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-2">
          {loading ? (
            <div className="px-4 py-3.5 text-lg text-gray-500">Chargement...</div>
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex items-center justify-between px-4 py-3.5 text-lg font-medium text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <span className="flex-1 leading-relaxed">{service.name}</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0 ml-2" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-3.5 text-lg text-gray-500">Aucun service disponible</div>
          )}
        </div>
      </div>
    </div>
  );
}