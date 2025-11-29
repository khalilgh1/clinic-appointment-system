"use client";

import { useState, useEffect } from 'react';

// Données mockées temporaires - PAS d'appel HTTP
const mockDoctors = [
  { 
    id: 1,
    name: "Dr Nadir Kedji", 
    specialty: "Gynécologue obstétricien", 
    description: "Expert PMA (20+ ans)", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 2,
    name: "Dr Sadat Nesrine", 
    specialty: "Spécialiste en fertilité", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 3,
    name: "Dr. Selmane", 
    specialty: "Spécialiste en fertilité", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 4,
    name: "Pr Mourad Semrouni", 
    specialty: "Endocrinologue dialektologue", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 5,
    name: "Dr Bouchra Rezig", 
    specialty: "Médecin nutritionniste", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 6,
    name: "Mme Samia Yaker", 
    specialty: "Biologiste de la reproduction", 
    email: "contact@ferival.dz" 
  },
  { 
    id: 7,
    name: "Mme Sabrina Ferrane", 
    specialty: "Embryologiste", 
    email: "contact@ferival.dz" 
  }
];

export const useDoctors = (serviceId = null) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        // SIMULATION sans appel HTTP - utiliser les données mockées directement
        await new Promise(resolve => setTimeout(resolve, 500)); // Petit délai pour l'UX
        
        // Filtrer par service si nécessaire (pour plus tard)
        let filteredDoctors = mockDoctors;
        if (serviceId) {
          // Ici vous pourrez filtrer les médecins par service quand le backend sera prêt
          filteredDoctors = mockDoctors;
        }
        
        setDoctors(filteredDoctors);
      } catch (err) {
        setError(err.message);
        console.error('Error in useDoctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [serviceId]);

  return { doctors, loading, error };
};