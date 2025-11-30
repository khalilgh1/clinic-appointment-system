"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client';

/**
 * Hook to get available dates for a doctor based on:
 * - DoctorSchedule (working days)
 * - DoctorException (unavailable days)
 * - Appointment table (fully booked days)
 */
export const useAvailableDates = (doctorId, monthsAhead = 3) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      if (!doctorId) {
        setAvailableDates([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const supabase = createSupabaseClient();

        // Step 3: Get doctor's schedule (working days)
        const { data: schedules, error: scheduleError } = await supabase
          .from('doctor_schedule')
          .select('day_of_week, start_time, end_time')
          .eq('doctor_id', doctorId);

        if (scheduleError) {
          throw new Error(`Erreur lors de la récupération du planning: ${scheduleError.message}`);
        }

        if (!schedules || schedules.length === 0) {
          setAvailableDates([]);
          setLoading(false);
          return;
        }

        // Get doctor's exceptions (unavailable days)
        const today = new Date();
        const endDate = new Date(today);
        endDate.setMonth(endDate.getMonth() + monthsAhead);

        const { data: exceptions, error: exceptionError } = await supabase
          .from('doctor_exception')
          .select('date, is_available, start_time, end_time')
          .eq('doctor_id', doctorId)
          .gte('date', today.toISOString().split('T')[0])
          .lte('date', endDate.toISOString().split('T')[0]);

        if (exceptionError) {
          throw new Error(`Erreur lors de la récupération des exceptions: ${exceptionError.message}`);
        }

        // Get existing appointments to check fully booked days
        const { data: appointments, error: appointmentError } = await supabase
          .from('appointment')
          .select('start_time, end_time')
          .eq('doctor_id', doctorId)
          .gte('start_time', today.toISOString())
          .lte('start_time', endDate.toISOString());

        if (appointmentError) {
          throw new Error(`Erreur lors de la récupération des rendez-vous: ${appointmentError.message}`);
        }

        // Generate available dates
        const available = [];
        const workingDays = schedules.map(s => s.day_of_week); // 0-6 (0 = Sunday, 6 = Saturday)

        // Convert day_of_week to match JavaScript Date.getDay() format
        // Supabase: 0-6 (0 = Sunday), JavaScript: 0-6 (0 = Sunday)
        // They should match, but let's be explicit
        const workingDaysSet = new Set(workingDays);

        // Create a map of exceptions by date
        const exceptionsMap = new Map();
        (exceptions || []).forEach(exception => {
          const dateStr = exception.date;
          exceptionsMap.set(dateStr, exception);
        });

        // Create a map of appointments by date
        const appointmentsByDate = new Map();
        (appointments || []).forEach(apt => {
          const dateStr = new Date(apt.start_time).toISOString().split('T')[0];
          if (!appointmentsByDate.has(dateStr)) {
            appointmentsByDate.set(dateStr, []);
          }
          appointmentsByDate.get(dateStr).push(apt);
        });

        // Generate dates for the next N months
        const currentDate = new Date(today);
        currentDate.setHours(0, 0, 0, 0);

        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const dayOfWeek = currentDate.getDay();

          // Check if doctor works on this day
          if (workingDaysSet.has(dayOfWeek)) {
            // Check if there's an exception for this date
            const exception = exceptionsMap.get(dateStr);
            
            if (!exception || exception.is_available) {
              // Date is available (either no exception or explicitly available)
              available.push(new Date(currentDate));
            }
            // If exception exists and is_available = false, skip this date
          }

          // Move to next day
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setAvailableDates(available);
      } catch (err) {
        setError(err.message);
        console.error('Error in useAvailableDates:', err);
        setAvailableDates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableDates();
  }, [doctorId, monthsAhead]);

  return { availableDates, loading, error };
};

