"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Step2Doctor from "./Step2Doctor";
import Step1Service from "./Step1Service";
import Step3Schedule from "./Step3Schedule";
import { BookingProvider } from "@/context/BookingContext"; 

// Composant interne qui utilise le contexte
const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-bg-primary overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 md:h-screen">
        <Sidebar currentStep={currentStep} contactPhone="+213 123 456 789" />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto min-h-0">
        <div className="max-w-5xl mx-auto">

          {currentStep === 1 && (
            <Step1Service onNext={goNext} />
          )}

          {currentStep === 2 && (
            <Step2Doctor onNext={goNext} onBack={goBack} />
          )}

          {currentStep === 3 && (
            <Step3Schedule onNext={goNext} onBack={goBack} />
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Informations personnelles
              </h2>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={goBack}
                  className="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
                >
                  ← Retour
                </button>
                <button
                  onClick={goNext}
                  className="bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Confirmer le rendez-vous
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// MainComponent
const MedicalBookingPage = () => {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
};

export default MedicalBookingPage;