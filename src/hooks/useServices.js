"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client'; 

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        const supabase = createSupabaseClient();
        
        console.log('🔍 Fetching services from Supabase...');

        const { data, error: supabaseError } = await supabase
          .from('service')
          .select('*')
          .eq('is_active', true)
          .order('name');

        if (supabaseError) {
          console.error('❌ Supabase error:', supabaseError);
          throw new Error(`Erreur Supabase: ${supabaseError.message}`);
        }

        console.log('✅ Services fetched:', data);

        if (data && data.length > 0) {
          // Transformer les données pour correspondre à notre frontend
          const transformedServices = data.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description || '',
            price: service.price ? `${service.price.toLocaleString('fr-FR')}.00 DA` : null,
            duration_min: service.duration_min,
            badge: service.price ? null : 'Sur devis',
            icon: mapServiceToIcon(service.name),
            rawData: service
          }));
          setServices(transformedServices);
        } else {
          // Fallback vers les données mockées si Supabase ne retourne rien
          console.warn('⚠️ Aucune donnée de Supabase, utilisation du fallback');
          setServices(getFallbackServices());
          setUsingFallback(true);
        }

      } catch (err) {
        console.warn('⚠️ Erreur Supabase, utilisation des données mockées:', err.message);
        setServices(getFallbackServices());
        setUsingFallback(true);
        setError(`Connexion impossible: ${err.message}. Utilisation des données de démonstration.`);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error, usingFallback };
};

// Données mockées de secours
const getFallbackServices = () => [
  {
    id: 1,
    name: 'Fertilité & PMA',
    description: 'FIV, ICSI, IIU, stimulation ovarienne, préservation ovocytaire et spermatique.',
    price: null,
    badge: 'Sur devis',
    icon: 'heart',
    duration_min: 60
  },
  {
    id: 2,
    name: 'Médecine du couple',
    description: 'Approche conjointe homme/femme, accompagnement nutritionnel et psychologique.',
    price: '4,500.00 DA',
    icon: 'users',
    duration_min: 45
  },
  {
    id: 3,
    name: 'Endocrinologie',
    description: 'Troubles hormonaux, thyroïde, diabète, SOPK.',
    price: '3,500.00 DA',
    icon: 'activity',
    duration_min: 30
  },
  {
    id: 4,
    name: 'Urologie & Andrologie',
    description: 'Bilan masculin, troubles érectiles, varicocèle, Mammographie, micro-TESE.',
    price: '3,000.00 DA',
    icon: 'activity',
    duration_min: 30
  },
  {
    id: 5,
    name: 'Imagerie & Laboratoire',
    description: 'Examens, analyses hormonales, spermogrammes, échographies.',
    price: '2,500.00 DA',
    icon: 'microscope',
    duration_min: 15
  },
  {
    id: 6,
    name: 'Téléconsultation',
    description: 'Consultation à distance avec nos spécialistes, sans attendre.',
    price: '2,000.00 DA',
    icon: 'phone',
    duration_min: 30
  }
];

// Fonction pour mapper les noms de services aux icônes
const mapServiceToIcon = (serviceName) => {
  const iconMap = {
    'fertilité': 'heart', 'pma': 'heart',
    'couple': 'users',
    'endocrinologie': 'activity',
    'urologie': 'activity', 'andrologie': 'activity',
    'imagerie': 'microscope', 'laboratoire': 'microscope',
    'téléconsultation': 'phone', 'consultation': 'phone'
  };

  const nameLower = serviceName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (nameLower.includes(key)) return icon;
  }
  return 'heart';
};