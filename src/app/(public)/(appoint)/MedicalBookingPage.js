"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Step2Doctor from "./Step2Doctor";
import Step1Service from "./Step1Service";

const MedicalBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const goNext = () => {
    if (currentStep === 1 && !selectedService) return;
    if (currentStep === 2 && !selectedDoctor) return;
    setCurrentStep(prev => prev + 1);
  };

  const goBack = () => setCurrentStep(prev => prev - 1);

  // Réinitialiser les sélections suivantes quand on change de service
  const handleSelectService = (service) => {
    setSelectedService(service);
    // Si on change de service, on réinitialise le médecin sélectionné
    if (selectedDoctor) {
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-primary">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar currentStep={currentStep} contactPhone="+213 123 456 789" />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          {currentStep === 1 && (
            <Step1Service
              selectedService={selectedService}
              onSelectService={handleSelectService}
              onNext={goNext}
            />
          )}

          {currentStep === 2 && (
            <Step2Doctor
              selectedDoctor={selectedDoctor}
              onSelectDoctor={setSelectedDoctor}
              onNext={goNext}
            />
          )}

          {currentStep === 3 && (
            <div className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Sélection de la date et heure
              </h2>
              <p className="text-secondary-light">
                Cette étape sera bientôt disponible
              </p>
              <button
                onClick={goNext}
                className="mt-6 bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Passer à l'étape suivante
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Informations personnelles
              </h2>
              <p className="text-secondary-light">
                Cette étape sera bientôt disponible
              </p>
              <div className="mt-6 bg-primary text-white p-6 rounded-lg max-w-md mx-auto">
                <h3 className="font-semibold mb-2">Récapitulatif</h3>
                <p className="text-sm mb-1">
                  <strong>Service:</strong> {selectedService?.name}
                </p>
                <p className="text-sm">
                  <strong>Médecin:</strong> {selectedDoctor?.name}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons pour les étapes 3 et 4 */}
          {(currentStep === 3 || currentStep === 4) && (
            <div className="mt-8 flex justify-between">
              <button
                onClick={goBack}
                className="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={goNext}
                className="bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                {currentStep === 4 ? 'Confirmer le rendez-vous' : 'Étape suivante'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MedicalBookingPage;