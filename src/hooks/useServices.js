"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client';

/**
 * Custom hook to fetch services from Supabase
 * Provides services data with loading and error states
 * @returns {Object} Services data and state information
 */
export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabase = createSupabaseClient();

        // Fetch active services from database
        const { data, error: supabaseError } = await supabase
          .from('service')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (supabaseError) {
          throw new Error(`Erreur de connexion: ${supabaseError.message}, veuillez vérifier votre connexion`);
        }

        if (data && data.length > 0) {
          // Transform database data for frontend
          const transformedServices = data.map(service => ({
            id: service.service_id,
            name: service.name,
            description: service.description || '',
            price: service.price ? `${service.price.toLocaleString('fr-FR')}.00 DA` : null,
            duration_min: service.duration_min,
            badge: service.price ? null : 'Sur devis',
            icon: service.icon,
            rawData: service
          }));
          setServices(transformedServices);
        } else {
          setServices([]);
        }

      } catch (err) {
        setError(`Connexion impossible: ${err.message}`);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};