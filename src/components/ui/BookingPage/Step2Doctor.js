"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDoctors } from '@/hooks/useDoctors';
import { useBooking } from '@/context/BookingContext';
import DoctorCard from '../DoctorCard';

/**
 * Step2Doctor - Second step in booking flow: doctor selection
 * Displays doctors filtered by selected service with responsive carousel
 */
const Step2Doctor = ({ onNext, onBack }) => {
  const { state, dispatch } = useBooking();
  const { doctors, loading, error } = useDoctors(state.selectedService?.id);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const carouselRef = useRef(null);

  // Adjust cards per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Handles doctor selection and updates booking context
   * @param {Object} doctor - Selected doctor object
   */
  const handleSelectDoctor = (doctor) => {
    dispatch({ type: 'SET_DOCTOR', payload: doctor });
  };

  /**
   * Validates selection and proceeds to next step
   * @param {Event} e - Form event
   */
  const handleNext = (e) => {
    e.preventDefault();
    if (state.selectedDoctor) {
      onNext();
    }
  };

  const totalPages = Math.ceil(doctors.length / cardsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const showCarousel = doctors.length > cardsPerPage;

  // Get current page doctors for carousel display
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentDoctors = doctors.slice(startIndex, endIndex);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement des médecins...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-12 flex-col">
        <div className="text-red-500 text-center mb-4">Erreur: {error}</div>
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
    <div className="h-auto overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Sélectionnez votre médecin
      </h1>

      {/* No doctors available for selected service */}
      {doctors.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Aucun médecin disponible pour ce service
        </div>
      ) : (
        <div className="relative px-20">
          {/* Carousel Container - Responsive grid */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  isSelected={state.selectedDoctor?.id === doctor.id}
                  onClick={() => handleSelectDoctor(doctor)}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {showCarousel && (
            <>
              {/* Left Arrow */}
              <button
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                className={`absolute -left-16 top-1/2 -translate-y-1/2 z-10
                          w-12 h-12 rounded-full bg-white shadow-lg
                          flex items-center justify-center
                          transition-all duration-200
                          ${canGoPrevious 
                            ? 'hover:bg-gray-100 hover:shadow-xl cursor-pointer' 
                            : 'opacity-40 cursor-not-allowed'}`}
                aria-label="Page précédente"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={goToNext}
                disabled={!canGoNext}
                className={`absolute -right-16 top-1/2 -translate-y-1/2 z-10
                          w-12 h-12 rounded-full bg-white shadow-lg
                          flex items-center justify-center
                          transition-all duration-200
                          ${canGoNext 
                            ? 'hover:bg-gray-100 hover:shadow-xl cursor-pointer' 
                            : 'opacity-40 cursor-not-allowed'}`}
                aria-label="Page suivante"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Carousel Indicators */}
      {showCarousel && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 rounded-full transition-all duration-200 
                ${idx === currentPage ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Aller à la page ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
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