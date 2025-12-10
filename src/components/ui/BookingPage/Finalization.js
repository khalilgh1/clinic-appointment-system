"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { supabase as createSupabaseClient } from '@/lib/supabase/client';

const Finalization = () => { 
  const { state, dispatch } = useBooking();
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Step 6: Submit appointment to database
  useEffect(() => {
    if (hasSubmitted) return;

    const submitAppointment = async () => {
      try {
        setStatus('loading');
        setHasSubmitted(true);

        // Validate required data
        if (!state.selectedService || !state.selectedDoctor || !state.selectedDateTime || !state.patientInfo) {
          throw new Error('Données de réservation incomplètes');
        }

        const supabase = createSupabaseClient();

        // Get service duration
        const { data: service, error: serviceError } = await supabase
          .from('service')
          .select('duration_min')
          .eq('service_id', state.selectedService.id)
          .single();

        if (serviceError || !service) {
          throw new Error(`Erreur lors de la récupération du service: ${serviceError?.message || 'Service introuvable'}`);
        }

        const durationMin = service.duration_min || 30;

        // Parse selected date and time
        const selectedDate = state.selectedDateTime.date;
        const [hours, minutes] = state.selectedDateTime.time.split(':').map(Number);
        
        // Create start_time timestamp
        const startTime = new Date(selectedDate);
        startTime.setHours(hours, minutes, 0, 0);
        
        // Calculate end_time
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + durationMin);

        // Step 6: Check slot availability again before insertion
        const { data: conflictingAppointments, error: checkError } = await supabase
          .from('appointment')
          .select('appointment_id')
          .eq('doctor_id', state.selectedDoctor.id)
          .lt('start_time', endTime.toISOString())
          .gt('end_time', startTime.toISOString());

        if (checkError) {
          throw new Error(`Erreur lors de la vérification de disponibilité: ${checkError.message}`);
        }

        if (conflictingAppointments && conflictingAppointments.length > 0) {
          throw new Error('Ce créneau n\'est plus disponible. Veuillez choisir un autre horaire.');
        }

        // Insert appointment into database
        const { data: appointment, error: insertError } = await supabase
          .from('appointment')
          .insert({
            patient_first_name: state.patientInfo.prenom,
            patient_last_name: state.patientInfo.nom,
            patient_email: state.patientInfo.email,
            patient_phone: state.patientInfo.telephone,
            doctor_id: state.selectedDoctor.id,
            service_id: state.selectedService.id,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: 'pending'
          })
          .select()
          .single();

        if (insertError) {
          throw new Error(`Erreur lors de la création du rendez-vous: ${insertError.message}`);
        }

        setStatus('success');
        
        // Reset booking state after successful submission
        setTimeout(() => {
          dispatch({ type: 'RESET_BOOKING' });
        }, 3000);
        
      } catch (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Une erreur inattendue est survenue. Veuillez contacter le support.');
        console.error('Erreur lors de la réservation:', error);
        setHasSubmitted(false);
      }
    };

    submitAppointment();
  }, [hasSubmitted]);

  // Handle return to home - 
  const handleReturnHome = () => {
    // Reset the booking context state
    dispatch({ type: 'RESET_BOOKING' });
    
    // Redirect to home page
    router.push('/');
  };

  // Animation de succès
  const SuccessAnimation = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Rendez-vous confirmé !</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Votre rendez-vous a été enregistré avec succès. Vous recevrez un email de confirmation dans quelques minutes.
      </p>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md w-full">
        <h4 className="font-semibold text-green-800 mb-3">Prochaines étapes</h4>
        <ul className="space-y-2 text-sm text-green-700">
          <li>• Vous recevrez un email de confirmation avec tous les détails</li>
          <li>• Présentez-vous 15 minutes avant l'heure du rendez-vous</li>
          <li>• Apportez votre carte d'identité</li>
          <li>• En cas d'empêchement, merci de nous prévenir à l'avance</li>
        </ul>
      </div>
    </div>
  );

  const ErrorAnimation = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de réservation</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        {errorMessage}
      </p>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <h4 className="font-semibold text-red-800 mb-3">Que faire maintenant ?</h4>
        <ul className="space-y-2 text-sm text-red-700">
          <li>• Vous pouvez réessayer en cliquant sur "Réessayer"</li>
          <li>• Contactez-nous directement au +213 XXX XX XX XX</li>
          <li>• Envoyez-nous un email à contact@ferival.dz</li>
        </ul>
      </div>
    </div>
  );

  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-3">Traitement en cours...</h2>
      <p className="text-gray-600 text-center max-w-md">
        Votre rendez-vous est en cours de confirmation. Veuillez patienter quelques instants.
      </p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        {status === 'loading' ? 'Finalisation en cours' : 
         status === 'success' ? 'Confirmation terminée' : 'Erreur de réservation'}
      </h1>

      {status === 'loading' && <LoadingAnimation />}
      {status === 'success' && <SuccessAnimation />}
      {status === 'error' && <ErrorAnimation />}

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 pt-8 border-t border-gray-200">
        {status === 'error' && (
          <button
            onClick={() => window.location.reload()}
            className="bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Réessayer la réservation
          </button>
        )}
        
        <button
          onClick={handleReturnHome}
          className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Revenir à la page d'accueil
        </button>
      </div>
    </div>
  );
};

export default Finalization;