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

// Composant interne qui utilise le contexte
const BookingFlow = ({ initialStep }) => {
  // Use a function to initialize state to ensure we get the correct initial value
  const [currentStep, setCurrentStep] = useState(() => {
    console.log('BookingFlow: Initializing currentStep with', initialStep);
    return initialStep;
  });
  const [showFinalization, setShowFinalization] = useState(false);

  console.log('BookingFlow render: initialStep =', initialStep, ', currentStep =', currentStep);


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

  const handleReturnHome = () => {
  // Reset State
  setCurrentStep(1);
  setShowFinalization(false);
  // go home
  window.location.href = '/';
  } ;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-primary">
      
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

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-bg-primary">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Component that handles the search params
const MedicalBookingContent = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastServiceId, setLastServiceId] = useState(undefined); // Track what we last processed

  useEffect(() => {
    // If serviceId hasn't changed from what we processed, skip
    if (serviceId === lastServiceId && bookingData !== null) {
      return;
    }

    const fetchService = async () => {
      console.log('MedicalBooking: Processing serviceId =', serviceId);
      
      // If no serviceId, start from step 1 with no pre-selected service
      if (!serviceId) {
        console.log('MedicalBooking: No serviceId, starting at step 1');
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

        console.log('MedicalBooking: Fetched service =', service, 'error =', error);

        if (!error && service) {
          // Format service for the booking context and start at step 2
          const data = {
            initialService: {
              id: service.service_id,
              name: service.name,
              icon: service.icon
            },
            initialStep: 2
          };
          console.log('MedicalBooking: Setting bookingData with step 2 =', data);
          setBookingData(data);
        } else {
          console.log('MedicalBooking: Service not found, starting at step 1');
          setBookingData({ initialService: null, initialStep: 1 });
        }
        setLastServiceId(serviceId);
      } catch (err) {
        console.error('Error fetching service:', err);
        setBookingData({ initialService: null, initialStep: 1 });
        setLastServiceId(serviceId);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [serviceId, lastServiceId, bookingData]);

  // Don't render until we have the booking data AND we've processed the current serviceId
  if (isLoading || !bookingData || lastServiceId !== serviceId) {
    console.log('MedicalBooking: Still loading...', { isLoading, bookingData, lastServiceId, serviceId });
    return <LoadingSpinner />;
  }

  console.log('MedicalBooking: Final render with bookingData =', bookingData);

  // Use a unique key that includes initialStep to force complete re-mount
  const componentKey = `booking-${serviceId || 'none'}-${bookingData.initialStep}`;
  
  return (
    <BookingProvider initialService={bookingData.initialService} key={componentKey}>
      <BookingFlow initialStep={bookingData.initialStep} key={componentKey} />
    </BookingProvider>
  );
};

// MainComponent with Suspense wrapper
const MedicalBookingPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MedicalBookingContent />
    </Suspense>
  );
};

export default MedicalBookingPage;