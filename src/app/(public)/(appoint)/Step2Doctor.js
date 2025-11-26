"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useDoctors } from '../../../hooks/useDoctors';
import { useBooking } from '../../../context/BookingContext';
import DoctorCard from '../../../components/ui/DoctorCard';

const Step2Doctor = ({ onNext, onBack }) => {
  const { state, dispatch } = useBooking();
  const { doctors, loading, error } = useDoctors(state.selectedService?.id);

  const handleSelectDoctor = (doctor) => {
    dispatch({ type: 'SET_DOCTOR', payload: doctor });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (state.selectedDoctor) {
      onNext();
    }
  };

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement des médecins...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-red-500">Erreur: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Sélectionnez votre médecin
      </h1>

      {doctors.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Aucun médecin disponible pour ce service
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              isSelected={state.selectedDoctor?.id === doctor.id}
              onClick={() => handleSelectDoctor(doctor)}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
        >
          ← Retour
        </button>
        <button
          onClick={handleNext}
          disabled={!state.selectedDoctor}
          className={`font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            state.selectedDoctor 
              ? 'bg-secondary text-primary hover:bg-secondary/90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ÉTAPE SUIVANTE
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step2Doctor;