"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client';

/**
 * Hook to generate available time slots for a specific date
 * Based on:
 * 1. Service duration (duration_min)
 * 2. Doctor schedule for that day (from DoctorSchedule + exceptions)
 * 3. Existing appointments (remove overlapping slots)
 */
export const useAvailableSlots = (doctorId, serviceId, selectedDate) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateSlots = async () => {
      if (!doctorId || !serviceId || !selectedDate) {
        setAvailableSlots([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const supabase = createSupabaseClient();

        // Get service duration
        const { data: service, error: serviceError } = await supabase
          .from('service')
          .select('duration_min')
          .eq('service_id', serviceId)
          .single();

        if (serviceError || !service) {
          throw new Error(`Erreur lors de la récupération du service: ${serviceError?.message || 'Service introuvable'}, veuillez vérifier votre connexion`);
        }

        const durationMin = service.duration_min || 30; // Default to 30 minutes

        // Get day of week (0 = Sunday, 6 = Saturday)
        const dayOfWeek = selectedDate.getDay();

        // Get doctor's schedule for this day
        const { data: schedule, error: scheduleError } = await supabase
          .from('doctor_schedule')
          .select('start_time, end_time')
          .eq('doctor_id', doctorId)
          .eq('day_of_week', dayOfWeek)
          .single();

        if (scheduleError || !schedule) {
          // No schedule for this day
          setAvailableSlots([]);
          setLoading(false);
          return;
        }

        // Check for exceptions on this date
        const dateStr = selectedDate.toISOString().split('T')[0];
        const { data: exception, error: exceptionError } = await supabase
          .from('doctor_exception')
          .select('is_available, start_time, end_time')
          .eq('doctor_id', doctorId)
          .eq('date', dateStr)
          .single();

        if (exceptionError && exceptionError.code !== 'PGRST116') {
          // PGRST116 = no rows returned, which is fine
          throw new Error(`Erreur lors de la récupération de l'exception: ${exceptionError.message}, veuillez vérifier votre connexion`);
        }

        // Determine working hours for this day
        let workStart, workEnd;
        if (exception && !exception.is_available) {
          // Doctor is not available on this day
          setAvailableSlots([]);
          setLoading(false);
          return;
        } else if (exception && exception.is_available && exception.start_time && exception.end_time) {
          // Use exception hours
          workStart = exception.start_time;
          workEnd = exception.end_time;
        } else {
          // Use regular schedule
          workStart = schedule.start_time;
          workEnd = schedule.end_time;
        }

        // Get existing appointments for this date
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const { data: appointments, error: appointmentError } = await supabase
          .from('appointment')
          .select('start_time, end_time')
          .eq('doctor_id', doctorId)
          .gte('start_time', startOfDay.toISOString())
          .lte('start_time', endOfDay.toISOString());

        if (appointmentError) {
          throw new Error(`Erreur lors de la récupération des rendez-vous: ${appointmentError.message}, veuillez vérifier votre connexion`);
        }

        // Parse time strings (format: "HH:MM:SS" or "HH:MM")
        const parseTime = (timeStr) => {
          const [hours, minutes] = timeStr.split(':').map(Number);
          return hours * 60 + minutes; // Convert to minutes since midnight
        };

        const formatTime = (minutes) => {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        };

        // Generate slots
        const slots = [];
        const workStartMinutes = parseTime(workStart);
        const workEndMinutes = parseTime(workEnd);
        const currentTime = new Date();
        const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        // Create booked time ranges
        const bookedRanges = (appointments || []).map(apt => ({
          start: parseTime(new Date(apt.start_time).toTimeString().slice(0, 5)),
          end: parseTime(new Date(apt.end_time).toTimeString().slice(0, 5))
        }));

        // Generate slots every durationMin minutes
        for (let slotStart = workStartMinutes; slotStart + durationMin <= workEndMinutes; slotStart += durationMin) {
          const slotEnd = slotStart + durationMin;

          // Check if slot is in the past (for today)
          const isToday = selectedDate.toDateString() === currentTime.toDateString();
          if (isToday && slotStart < nowMinutes) {
            continue; // Skip past slots
          }

          // Check if slot overlaps with any existing appointment
          const overlaps = bookedRanges.some(range => {
            return (slotStart < range.end && slotEnd > range.start);
          });

          if (!overlaps) {
            slots.push(formatTime(slotStart));
          }
        }

        setAvailableSlots(slots);
      } catch (err) {
        setError(err.message);
        console.error('Error in useAvailableSlots:', err);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    };

    generateSlots();
  }, [doctorId, serviceId, selectedDate]);

  return { availableSlots, loading, error };
};