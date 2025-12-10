"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/BookingPage/Sidebar";
import Step2Doctor from "@/components/ui/BookingPage/Step2Doctor";
import Step1Service from "@/components/ui/BookingPage/Step1Service";
import Step3Schedule from "@/components/ui/BookingPage/Step3Schedule";
import Step4Info from "@/components/ui/BookingPage/Step4Info";
import Finalization from '@/components/ui/BookingPage/Finalization';
import { BookingProvider } from "@/context/BookingContext"; 

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showFinalization, setShowFinalization] = useState(false);

  const goNext = () => {
    if (currentStep === 4) {
      setShowFinalization(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-bg-primary">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar currentStep={currentStep} contactPhone="+213 123 456 789" />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">

          {showFinalization ? (
            <Finalization />
          ) : (
            <>
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
                <Step4Info onNext={goNext} onBack={goBack} />
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

const MedicalBookingPage = () => {
  return (
    <BookingProvider>
      <div className="w-full">
        <BookingFlow />
      </div>
    </BookingProvider>
  );
};

export default MedicalBookingPage;