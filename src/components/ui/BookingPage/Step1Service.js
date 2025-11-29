"use client"

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useServices } from '@/hooks/useServices';
import ServiceCard from '../ServiceCard';

const Step1Service = ({ onNext }) => {
  const { state, dispatch } = useBooking();
  const { services, loading, error, usingFallback } = useServices();

  console.log('🔄 Step1Service RENDER - selectedService:', state.selectedService?.id, state.selectedService?.name);

  const handleSelectService = (service) => {
    console.log('📝 BEFORE Dispatch - Current selected:', state.selectedService?.id);
    console.log('📝 Dispatching SET_SERVICE for:', service.id, service.name);
    
    dispatch({ type: 'SET_SERVICE', payload: service });
    
    // Log to see the updated state after dispatch
    setTimeout(() => {
      console.log('📈 AFTER Dispatch (timeout) - selected service:', state.selectedService?.id);
    }, 100);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (state.selectedService) {
      console.log('➡️ Moving to next step with service:', state.selectedService.name);
      onNext();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement des services...</div>
      </div>
    );
  }

  if (error && !usingFallback) {
    return (
      <div className="flex justify-center items-center py-12 flex-col">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="h-auto overflow-auto no-scrollbar">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 ">
        Sélectionnez un service
      </h1>

      {usingFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            ⚠️ Mode démonstration - Données de test utilisées
          </p>
        </div>
      )}

      {services.length === 0 && !loading ? (
        <div className="text-center py-12 text-gray-500">
          Aucun service disponible pour le moment
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-11 items-stretch">
          {services.map(service => {
            const isSelected = state.selectedService?.id === service.id;
            console.log(`📊 Mapping service ${service.id} - isSelected: ${isSelected}`);
            
            return (
              <ServiceCard 
                key={service.id}
                service={service}
                isSelected={isSelected}
                onSelect={handleSelectService}
              />
            );
          })}
        </div>
      )}

      {/* Debugging */}
      {/* <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          <strong>Debug State:</strong> selectedService = {state.selectedService ? `ID: ${state.selectedService.id}, Name: "${state.selectedService.name}"` : 'null'}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Services count: {services.length} | Using fallback: {usingFallback ? 'Yes' : 'No'}
        </p>
      </div> */}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          disabled={!state.selectedService}
          className={`w-full sm:w-auto max-w-full sm:max-w-[260px] mx-auto
                      font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2
                      transition-colors ${state.selectedService ? 'bg-secondary text-primary hover:bg-secondary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          ÉTAPE SUIVANTE
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1Service;