"use client";

import { useState, useEffect } from 'react';

/**
 * Hook to manage doctor's availability for booking
 * Provides available dates and time slots based on doctor's schedule
 * @param {string} doctorId - Selected doctor ID
 * @param {Date} selectedDate - Optional specific date for time slots
 * @returns {Object} Availability data with loading and error states
 */
export const useDoctorAvailability = (doctorId, selectedDate = null) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available dates for selected doctor
  useEffect(() => {
    if (!doctorId) {
      setAvailableDates([]);
      return;
    }

    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with real API call
        // For now, show connection error
        throw new Error("Connection to server failed. Please try again later.");
        
      } catch (err) {
        setError("Connexion impossible. Veuillez réessayer plus tard.");
        setAvailableDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, [doctorId]);

  // Fetch time slots for specific date
  useEffect(() => {
    if (!doctorId || !selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }

    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with real API call
        // For now, show connection error
        throw new Error("Connection to server failed. Please try again later.");
        
      } catch (err) {
        setError("Connexion impossible. Veuillez réessayer plus tard.");
        setAvailableTimeSlots([]);
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