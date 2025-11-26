"use client";

import React from "react";
import { Check, ArrowRight } from 'lucide-react';

// StepIndicator Component
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isCurrent = index + 1 === currentStep;
        
        return (
          <div 
            key={index}
            className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all ${
              isCurrent 
                ? 'text-white bg-primary shadow-md' 
                : isCompleted
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all ${
              isCurrent 
                ? 'bg-white text-primary' 
                : isCompleted
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-500'
            }`}>
              {isCompleted ? (
                <Check className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                index + 1
              )}
            </div>
            <div className="flex-1">
              <span className="font-medium text-sm md:text-base block">{step}</span>
              {isCompleted && (
                <span className="text-xs text-green-600 mt-1 block">Terminé</span>
              )}
              {isCurrent && (
                <span className="text-xs text-white/80 mt-1 block">En cours</span>
              )}
            </div>
            {isCurrent && (
              <ArrowRight className="w-4 h-4 text-white/80" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ currentStep, contactPhone }) => {
  const steps = ['Service', 'Médecin', 'Date & Heure', 'Informations'];
  
  return (
    <div className="bg-primary text-white h-full flex flex-col overflow-y-auto">
      <div className="p-6 flex-1">
        
        {/* step indicator */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-6">Votre réservation</h2>
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
      </div>
      
      {/* Contact  */}
      <div className="p-6 border-t border-gray-600 mt-auto">
        <p className="text-sm text-gray-300 mb-3">Besoin d'aide ?</p>
        <p className="text-lg font-semibold mb-1">{contactPhone}</p>
        <p className="text-sm text-gray-300">contact@ferival.dz</p>
      </div>
    </div>
  );
};

export default Sidebar;