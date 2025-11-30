'use client';

import React from 'react';
import Link from 'next/link';
import { supabase as createSupabaseClient } from '@/lib/supabase/client';

export default function FooterServices() {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from('service')
          .select('service_id, name')
          .eq('is_active', true)
          .order('name', { ascending: true })
          .limit(6);

        if (error) throw error;

        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="animate-fade-in-up animation-delay-200">
      <h3 className="text-lg font-semibold mb-5 text-white">
        Services
      </h3>
      <ul className="space-y-3">
        {loading ? (
          <li className="text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
              <span>Chargement...</span>
            </div>
          </li>
        ) : services.length > 0 ? (
          services.map((service) => (
            <li key={service.service_id}>
              <Link
                href={`/services/${service.service_id}`}
                className="text-sm text-gray-300 hover:text-white transition-all duration-300 inline-block relative group"
              >
                <span className="line-clamp-1">{service.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-400">Aucun service disponible</li>
        )}
      </ul>
    </div>
  );
}