"use client";

import { useState, useEffect } from 'react';

// Données mockées temporaires - PAS d'appel HTTP
const mockServices = [
  {
    id: 1,
    name: 'Fertilité & PMA',
    description: 'FIV, ICSI, IIU, stimulation ovarienne, préservation ovocytaire et spermatique.',
    price: null,
    badge: 'Sur devis',
    icon: 'heart'
  },
  {
    id: 2,
    name: 'Médecine du couple',
    description: 'Approche conjointe homme/femme, accompagnement nutritionnel et psychologique.',
    price: '4,500.00 DA',
    icon: 'users'
  },
  {
    id: 3,
    name: 'Endocrinologie',
    description: 'Troubles hormonaux, thyroïde, diabète, SOPK.',
    price: '3,500.00 DA',
    icon: 'activity'
  },
  {
    id: 4,
    name: 'Urologie & Andrologie',
    description: 'Bilan masculin, troubles érectiles, varicocèle, Mammographie, micro-TESE.',
    price: '3,000.00 DA',
    icon: 'activity'
  },
  {
    id: 5,
    name: 'Imagerie & Laboratoire',
    description: 'Examens, analyses hormonales, spermogrammes, échographies.',
    price: '2,500.00 DA',
    icon: 'microscope'
  },
  {
    id: 6,
    name: 'Téléconsultation',
    description: 'Consultation à distance avec nos spécialistes, sans attendre.',
    price: '2,000.00 DA',
    icon: 'phone'
  }
];

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // SIMULATION sans appel HTTP - utiliser les données mockées directement
        await new Promise(resolve => setTimeout(resolve, 500)); // Petit délai pour l'UX
        setServices(mockServices);
      } catch (err) {
        setError(err.message);
        console.error('Error in useServices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};