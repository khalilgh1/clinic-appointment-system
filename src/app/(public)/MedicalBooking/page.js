"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/BookingPage/Sidebar";
import Step2Doctor from "@/components/ui/BookingPage/Step2Doctor";
import Step1Service from "@/components/ui/BookingPage/Step1Service";
import Step3Schedule from "@/components/ui/BookingPage/Step3Schedule";
import Step4Info from "@/components/ui/BookingPage/Step4Info";
import Finalization from '@/components/ui/BookingPage/Finalization';
import { BookingProvider } from "@/context/BookingContext";
import { supabase } from "@/lib/supabase/client";

/**
 * BookingFlow - Main booking flow component managing step transitions
 * Controls step progression and finalization state
 * @param {Object} props - Component props
 * @param {number} props.initialStep - Starting step (1-4)
 */
const BookingFlow = ({ initialStep }) => {
  const [currentStep, setCurrentStep] = useState(() => initialStep);
  const [showFinalization, setShowFinalization] = useState(false);

  /**
   * Scrolls to top of page for better UX during step transitions
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * Advances to next step or shows finalization screen
   */
  const goNext = () => {
    scrollToTop();
    if (currentStep === 4) {
      setShowFinalization(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Returns to previous step in booking flow
   */
  const goBack = () => {
    scrollToTop();
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  /**
   * Returns to home page and resets booking state
   */
  const handleReturnHome = () => {
    setCurrentStep(1);
    setShowFinalization(false);
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-primary pt-6 md:pt-8">
      
      {/* Sidebar with step indicator */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar currentStep={currentStep} contactPhone="+213 123 456 789" />
      </div>

      {/* Main booking content area */}
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

/**
 * LoadingSpinner - Displayed during data fetching
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-bg-primary">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * MedicalBookingContent - Handles service parameter and initial data fetching
 * Processes serviceId URL parameter to pre-select service and set initial step
 */
const MedicalBookingContent = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastServiceId, setLastServiceId] = useState(undefined);

  // Fetch service data based on URL parameter
  useEffect(() => {
    if (serviceId === lastServiceId && bookingData !== null) {
      return;
    }

    const fetchService = async () => {
      // If no serviceId, start from step 1 with no pre-selected service
      if (!serviceId) {
        setBookingData({ initialService: null, initialStep: 1 });
        setLastServiceId(serviceId);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const supabaseClient = supabase();
        const { data: service, error } = await supabaseClient
          .from('service')
          .select('service_id, name, icon')
          .eq('service_id', parseInt(serviceId))
          .single();

        if (!error && service) {
          // Pre-select service and start at step 2 (doctor selection)
          const data = {
            initialService: {
              id: service.service_id,
              name: service.name,
              icon: service.icon
            },
            initialStep: 2
          };
          setBookingData(data);
        } else {
          setBookingData({ initialService: null, initialStep: 1 });
        }
        setLastServiceId(serviceId);
      } catch (err) {
        setBookingData({ initialService: null, initialStep: 1 });
        setLastServiceId(serviceId);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [serviceId, lastServiceId, bookingData]);

  // Show loading spinner while fetching data
  if (isLoading || !bookingData || lastServiceId !== serviceId) {
    return <LoadingSpinner />;
  }

  // Unique key forces complete re-mount when step changes
  const componentKey = `booking-${serviceId || 'none'}-${bookingData.initialStep}`;
  
  return (
    <BookingProvider initialService={bookingData.initialService} key={componentKey}>
      <BookingFlow initialStep={bookingData.initialStep} key={componentKey} />
    </BookingProvider>
  );
};

/**
 * MedicalBookingPage - Main booking page with Suspense wrapper
 * Handles asynchronous operations and loading states
 */
const MedicalBookingPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MedicalBookingContent />
    </Suspense>
  );
};

export default MedicalBookingPage;