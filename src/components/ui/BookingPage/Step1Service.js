"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useServices } from '@/hooks/useServices';
import ServiceCard from '../ServiceCard';

const Step1Service = ({ onNext }) => {
  const { state, dispatch } = useBooking();
  const { services, loading, error, usingFallback } = useServices();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4); // Default: 4 cards visible (2x2)
  const carouselRef = useRef(null);

  // Adjust cards per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2); // Tablet: 2 cards (1x2)
      } else {
        setCardsPerPage(4); // Desktop: 4 cards (2x2)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectService = (service) => {
    console.log('📌 BEFORE Dispatch - Current selected:', state.selectedService?.id);
    console.log('📌 Dispatching SET_SERVICE for:', service.id, service.name);
    
    dispatch({ type: 'SET_SERVICE', payload: service });
    
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

  const totalPages = Math.ceil(services.length / cardsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const showCarousel = services.length > cardsPerPage;

  // Get current page services
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentServices = services.slice(startIndex, endIndex);

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
    <div className="h-auto overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
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
        <div className="relative px-20">
          {/* Carousel Container - 2x2 Grid */}
          <div className="overflow-hidden" ref={carouselRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-11">
              {currentServices.map(service => {
                const isSelected = state.selectedService?.id === service.id;
                
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
          </div>

          {/* Navigation Arrows */}
          {showCarousel && (
            <>
              {/* Left Arrow */}
              <button
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                className={`absolute -left-1 top-1/2 -translate-y-1/2 z-10
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
                className={`absolute -right-1 top-1/2 -translate-y-1/2 z-10
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

      {/* Carousel Indicators (optional dots) */}
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