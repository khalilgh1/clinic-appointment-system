"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch services from Supabase
  React.useEffect(() => {
    async function fetchServices() {
      try {
        // Simulated services - replace with actual Supabase call
        const mockServices = [
          { name: 'Fertilité & PMA', href: '/services/fertilite-pma' },
          { name: 'Endocrinologie', href: '/services/endocrinologie' },
          { name: 'Urologie', href: '/services/urologie' },
          { name: 'Téléconsultation', href: '/services/teleconsultation' }
        ];
        
        setServices(mockServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <footer className="bg-[#1a4d4d] text-white ">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-40 2xl:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* About Section */}
          <div className="space-y-0">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/jsp.png"
                width={100}
                height={16}
                alt="Clinique PMA Fertival"
                className="h-auto w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/80 leading-relaxed">
              Nous offrons des informations de santé fiables, des conseils d'experts et des outils numériques pour vous accompagner tout au long de votre parcours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="/medecins"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link 
                  href="/services"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Services</h3>
            {loading ? (
              <p className="text-xs text-white/70">Chargement...</p>
            ) : (
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={service.href}
                      className="text-xs text-white/70 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-3 text-white">Contact</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+213XXXXXXXXX"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  +213 XXX XXX XXX
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:contact@fertival.dz"
                  className="text-xs text-white/70 hover:text-white transition-colors duration-300"
                >
                  contact@fertival.dz
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white/80 font-medium">
                  Du Samedi à Jeudi: 7h - 21h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-center text-xs text-white/60">
            Copyright © FERTIVAL 2025
          </p>
        </div>
      </div>
    </footer>
  );
}