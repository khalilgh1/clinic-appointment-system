"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to manage doctor's availability
 * @param {string} doctorId - ID of sekected doctor
 * @param {Date} selectedDate - Date selected (optionnelle)
 */
export const useDoctorAvailability = (doctorId, selectedDate = null) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO : replace by real API calls
  const mockDoctorSchedules = {
    '1': { // Dr Nadir Kedji
      workingDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      workingHours: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30'],
      breaks: ['12:00-14:00'],
      unavailableDates: [] //  congés
    },
    '2': { // Dr Sadat Nesrine
      workingDays: [1, 3, 5], // Lundi, Mercredi, Vendredi
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30'],
      breaks: ['12:00-13:00'],
      unavailableDates: []
    },
    '3': { // Dr. Selmane
      workingDays: [2, 3, 4, 6], // Mardi, Mercredi, Jeudi, Samedi
      workingHours: ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00'],
      breaks: ['12:00-13:30'],
      unavailableDates: []
    },
    '4': { // Pr Mourad Semrouni
      workingDays: [1, 2, 4, 5], // Lundi, Mardi, Jeudi, Vendredi
      workingHours: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '14:30', '15:00', '15:30', '16:00'],
      breaks: ['11:30-14:30'],
      unavailableDates: []
    },
    '5': { // Dr Bouchra Rezig
      workingDays: [1, 2, 3, 4, 5], // Lundi à Vendredi
      workingHours: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
      breaks: ['12:00-14:00'],
      unavailableDates: []
    },
    '6': { // Mme Samia Yaker
      workingDays: [1, 2, 3, 4, 5, 6], // Lundi à Samedi
      workingHours: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'],
      breaks: ['12:00-14:00'],
      unavailableDates: []
    },
    '7': { // Mme Sabrina Ferrane
      workingDays: [2, 3, 4, 5, 6], // Mardi à Samedi
      workingHours: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30'],
      breaks: ['11:30-13:00'],
      unavailableDates: []
    }
  };

  // get Dates available for the selected doctor
  useEffect(() => {
    if (!doctorId) {
      setAvailableDates([]);
      return;
    }

    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const schedule = mockDoctorSchedules[doctorId];
        if (!schedule) {
          setAvailableDates([]);
          return;
        }

        const dates = generateAvailableDates(schedule);
        setAvailableDates(dates);
      } catch (err) {
        setError("Erreur lors du chargement des dates disponibles");
        console.error('Error fetching available dates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, [doctorId]);

  // get créneaux for specific date
  useEffect(() => {
    if (!doctorId || !selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }

    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulation API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const schedule = mockDoctorSchedules[doctorId];
        if (!schedule) {
          setAvailableTimeSlots([]);
          return;
        }

        const timeSlots = generateAvailableTimeSlots(schedule, selectedDate);
        setAvailableTimeSlots(timeSlots);
      } catch (err) {
        setError("Erreur lors du chargement des horaires");
        console.error('Error fetching time slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [doctorId, selectedDate]);

  return {
    availableDates,
    availableTimeSlots,
    loading,
    error
  };
};

// Fonction pour générer les dates disponibles basées sur le planning du médecin
const generateAvailableDates = (schedule) => {
  const availableDates = [];
  const today = new Date();
  
  // Générer 60 jours à partir d'aujourd'hui
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Vérifier si le médecin travaille ce jour
    const dayOfWeek = date.getDay(); // 0=dimanche, 1=lundi, etc.
    const isWorkingDay = schedule.workingDays.includes(dayOfWeek);
    
    // Vérifier si la date n'est pas dans les congés
    const isUnavailable = schedule.unavailableDates.some(unavailableDate => 
      unavailableDate.toDateString() === date.toDateString()
    );
    
    if (isWorkingDay && !isUnavailable) {
      availableDates.push(new Date(date));
    }
  }
  
  return availableDates;
};

// Fonction pour générer les créneaux horaires disponibles
const generateAvailableTimeSlots = (schedule, selectedDate) => {
  // Vérifier si le médecin travaille ce jour
  const dayOfWeek = selectedDate.getDay();
  if (!schedule.workingDays.includes(dayOfWeek)) {
    return [];
  }

  // Filtrer les créneaux déjà réservés (simulation)
  const bookedSlots = getBookedSlots(selectedDate);
  
  return schedule.workingHours.filter(slot => !bookedSlots.includes(slot));
};

// Simulation des créneaux réservés
const getBookedSlots = (date) => {
  // Simuler quelques créneaux réservés aléatoirement
  const randomBookedSlots = [];
  const allSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  
  // 20% reserved créneaux
  allSlots.forEach(slot => {
    if (Math.random() < 0.2) {
      randomBookedSlots.push(slot);
    }
  });
  
  return randomBookedSlots;
};