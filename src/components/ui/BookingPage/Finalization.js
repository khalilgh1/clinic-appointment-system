"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const Finalization = ({ onReturnHome }) => {
  const { state, dispatch } = useBooking();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // Nouvel état pour éviter les re-soumissions

  // Simulation de l'envoi des données au backend - CORRIGÉ
  useEffect(() => {
    // Éviter de soumettre plusieurs fois
    if (hasSubmitted) return;

    const submitAppointment = async () => {
      try {
        setStatus('loading');
        setHasSubmitted(true);
        
        // Simulation d'un délai d'envoi (2 secondes)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulation d'une réussite (90% de chance) ou échec (10% de chance)
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
          setStatus('success');
          
          // Ici, vous enverrez les vraies données au backend :
          // await apiService.createAppointment({
          //   service: state.selectedService,
          //   doctor: state.selectedDoctor,
          //   dateTime: state.selectedDateTime,
          //   patientInfo: state.patientInfo
          // });
          
        } else {
          setStatus('error');
          setErrorMessage('Erreur de connexion au serveur. Veuillez réessayer.');
        }
        
      } catch (error) {
        setStatus('error');
        setErrorMessage('Une erreur inattendue est survenue. Veuillez contacter le support.');
        console.error('Erreur lors de la réservation:', error);
      }
    };

    submitAppointment();
  }, [hasSubmitted]); // Dépendance uniquement sur hasSubmitted

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
      
      {/* Instructions après confirmation */}
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

  // Animation d'erreur
  const ErrorAnimation = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de réservation</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        {errorMessage}
      </p>
      
      {/* Instructions en cas d'erreur */}
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

  // Animation de chargement
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

      {/* Animation selon le statut */}
      {status === 'loading' && <LoadingAnimation />}
      {status === 'success' && <SuccessAnimation />}
      {status === 'error' && <ErrorAnimation />}

      {/* Boutons d'action */}
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
          onClick={onReturnHome}
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