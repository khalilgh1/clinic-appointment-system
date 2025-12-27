"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client';

/**
 * Custom hook to fetch doctors based on selected service
 * Queries doctor_services junction table and filters active doctors
 * @param {number|null} serviceId - ID of selected service
 * @returns {Object} Doctors data with loading and error states
 */
export const useDoctors = (serviceId = null) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        // Return empty array if no service selected
        if (!serviceId) {
          setDoctors([]);
          setLoading(false);
          return;
        }

        const supabase = createSupabaseClient();

        // Query doctor_services junction table for doctors providing this service
        const { data: doctorServices, error: doctorServicesError } = await supabase
          .from('doctor_services')
          .select('doctor_id')
          .eq('service_id', serviceId);

        if (doctorServicesError) {
          throw new Error(`Erreur lors de la récupération des médecins: ${doctorServicesError.message}, veuillez vérifier votre connexion`);
        }

        // Return empty array if no doctors provide this service
        if (!doctorServices || doctorServices.length === 0) {
          setDoctors([]);
          setLoading(false);
          return;
        }

        // Extract unique doctor IDs from junction table results
        const doctorIds = [...new Set(doctorServices.map(ds => ds.doctor_id))];

        // Fetch active doctors from doctor table
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('doctor')
          .select('doctor_id, name, email, description, profile_picture, specialty_name')
          .in('doctor_id', doctorIds)
          .eq('is_active', true);

        if (doctorsError) {
          throw new Error(`Erreur lors de la récupération des médecins: ${doctorsError.message}, veuillez vérifier votre connexion`);
        }

        // Transform database data to frontend format
        const transformedDoctors = (doctorsData || []).map(doctor => ({
          id: doctor.doctor_id,
          name: doctor.name,
          specialty: doctor.specialty_name || '',
          description: doctor.description || '',
          email: doctor.email,
          profilePicture: doctor.profile_picture
        }));

        setDoctors(transformedDoctors);
      } catch (err) {
        setError(err.message);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [serviceId]);

  return { doctors, loading, error };
};