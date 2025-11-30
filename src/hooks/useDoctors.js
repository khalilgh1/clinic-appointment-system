"use client";

import { useState, useEffect } from 'react';
import { supabase as createSupabaseClient } from '../lib/supabase/client';

export const useDoctors = (serviceId = null) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!serviceId) {
          setDoctors([]);
          setLoading(false);
          return;
        }

        const supabase = createSupabaseClient();

        // Step 2: Query DoctorServices to find doctors who provide the selected service
        // Then filter only active doctors
        const { data: doctorServices, error: doctorServicesError } = await supabase
          .from('doctor_services')
          .select('doctor_id')
          .eq('service_id', serviceId);

        if (doctorServicesError) {
          throw new Error(`Erreur lors de la récupération des médecins: ${doctorServicesError.message}`);
        }

        if (!doctorServices || doctorServices.length === 0) {
          setDoctors([]);
          setLoading(false);
          return;
        }

        // Get unique doctor IDs
        const doctorIds = [...new Set(doctorServices.map(ds => ds.doctor_id))];

        // Query Doctor table for active doctors
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('doctor')
          .select('doctor_id, name, email, description, profile_picture, specialty_name')
          .in('doctor_id', doctorIds)
          .eq('is_active', true);

        if (doctorsError) {
          throw new Error(`Erreur lors de la récupération des médecins: ${doctorsError.message}`);
        }

        // Transform data to match frontend format
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
        console.error('Error in useDoctors:', err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [serviceId]);

  return { doctors, loading, error };
};