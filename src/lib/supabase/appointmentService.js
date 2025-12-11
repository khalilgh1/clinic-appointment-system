// lib/supabase/appointmentService.js
import { supabase } from './client';

export const appointmentService = {
  // Create appointment
  async createAppointment(appointmentData) {
    try {
      // First, let's get the service duration
      const { data: service, error: serviceError } = await supabase()
        .from('service')
        .select('duration_min')
        .eq('service_id', appointmentData.service_id)
        .single();

      if (serviceError) throw serviceError;

      // Calculate end_time
      const startTime = new Date(appointmentData.start_time);
      const endTime = new Date(startTime.getTime() + service.duration_min * 60000);

      // Prepare appointment data
      const appointment = {
        patient_first_name: appointmentData.patient_first_name,
        patient_last_name: appointmentData.patient_last_name,
        patient_email: appointmentData.patient_email,
        patient_phone: appointmentData.patient_phone,
        additional_notes: appointmentData.additional_notes || '',
        doctor_id: appointmentData.doctor_id,
        service_id: appointmentData.service_id,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'pending'
      };

      // Insert appointment
      const { data, error } = await supabase()
        .from('appointment')
        .insert([appointment])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };

    } catch (error) {
      console.error('Error creating appointment:', error);
      return { success: false, error: error.message };
    }
  },

  // Check slot availability
  async checkSlotAvailability(doctorId, serviceId, startTime) {
    try {
      const { data: service, error: serviceError } = await supabase()
        .from('service')
        .select('duration_min')
        .eq('service_id', serviceId)
        .single();

      if (serviceError) throw serviceError;

      const start = new Date(startTime);
      const end = new Date(start.getTime() + service.duration_min * 60000);

      // Check for overlapping appointments
      const { data: overlapping, error: overlapError } = await supabase()
        .from('appointment')
        .select('id')
        .eq('doctor_id', doctorId)
        .gte('start_time', start.toISOString())
        .lt('start_time', end.toISOString());

      if (overlapError) throw overlapError;

      return {
        available: overlapping.length === 0,
        duration_min: service.duration_min
      };

    } catch (error) {
      console.error('Error checking slot:', error);
      return { available: false, error: error.message };
    }
  }
};