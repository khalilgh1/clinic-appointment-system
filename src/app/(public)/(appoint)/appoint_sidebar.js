"use client"

import React, { useState } from 'react';
import { Heart, Users, Activity, Microscope, Phone, ArrowRight } from 'lucide-react';

// Mock data function
const getServices = () => [
  {
    id: 1,
    name: 'Fertilité & PMA',
    description: 'FIV, ICSI, IIU, stimulation ovarienne, préservation ovocytaire et spermatique.',
    price: null,
    badge: 'Sur devis',
    icon: 'heart'
  },
  {
    id: 2,
    name: 'Médecine du couple',
    description: 'Approche conjointe homme/femme, accompagnement nutritionnel et psychologique.',
    price: '4,500.00 DA',
    icon: 'users'
  },
  {
    id: 3,
    name: 'Endocrinologie',
    description: 'Troubles hormonaux, thyroïde, diabète, SOPK.',
    price: '3,500.00 DA',
    icon: 'activity'
  },
  {
    id: 4,
    name: 'Urologie & Andrologie',
    description: 'Bilan masculin, troubles érectiles, varicocèle, Mammographie, micro-TESE.',
    price: '3,000.00 DA',
    icon: 'activity'
  },
  {
    id: 5,
    name: 'Imagerie & Laboratoire',
    description: 'Examens, analyses hormonales, spermogrammes, échographies.',
    price: '2,500.00 DA',
    icon: 'microscope'
  },
  {
    id: 6,
    name: 'Téléconsultation',
    description: 'Consultation à distance avec nos spécialistes, sans attendre.',
    price: '2,000.00 DA',
    icon: 'phone'
  }
];

// Icon mapping component
const ServiceIcon = ({ iconName, className }) => {
  const icons = {
    heart: Heart,
    users: Users,
    activity: Activity,
    microscope: Microscope,
    phone: Phone
  };
  
  const Icon = icons[iconName] || Heart;
  return <Icon className={className} />;
};

// ServiceCard Component
const ServiceCard = ({ service, onClick,isSelected }) => {
  return (
    <div 
      className={`bg-white rounded-lg p-4 md:p-6 shadow-sm transition-all cursor-pointer h-full flex flex-col 
      ${isSelected ? 'border-2 border-[#064045] shadow-lg' : 'border border-gray-200 hover:border-[#064045]/40 hover:shadow-md'}`}
      onClick={() => onClick(service)}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="rounded-lg p-2 md:p-3 flex-shrink-0" style={{ backgroundColor: '#FFE273' }}>
          <ServiceIcon iconName={service.icon} className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#064045' }} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
            {service.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
            {service.description}
          </p>
          
          {service.badge ? (
            <span className="inline-block text-white text-xs md:text-sm font-medium px-3 py-1 rounded" style={{ backgroundColor: '#064045' }}>
              {service.badge}
            </span>
          ) : service.price ? (
            <span className="text-base md:text-lg font-semibold" style={{ color: '#064045' }}>
              {service.price}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ServiceList Component (MODIFIED)
const ServiceList = ({ services, selectedService, onServiceSelect, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-11 items-stretch">

        {services.map(service => (
          <label key={service.id} className="cursor-pointer">
            <input
              type="radio"
              name="selectedService"
              value={service.id}
              checked={selectedService?.id === service.id}
              onChange={() => onServiceSelect(service)}
              className="hidden"
            />

            <div
              className="rounded-lg transition-all"
            >
              <ServiceCard 
                  service={service}
                  onClick={onServiceSelect}
                  isSelected={selectedService?.id === service.id}
              />
            </div>
          </label>
        ))}

      </div>

      {/* Hidden submit (pas visible mais nécessaire si tu veux déclencher onSubmit par Enter) */}
      <button type="submit" className="hidden"></button>
    </form>
  );
};


// StepIndicator Component
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div 
          key={index}
          className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-colors ${
            index + 1 === currentStep 
              ? 'text-white' 
              : index + 1 < currentStep
              ? 'bg-gray-200 text-gray-700'
              : 'bg-gray-100 text-gray-500'
          }`}
          style={index + 1 === currentStep ? { backgroundColor: '#064045' } : {}}
        >
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold ${
            index + 1 === currentStep 
              ? 'bg-white' 
              : index + 1 < currentStep
              ? 'bg-gray-300 text-gray-700'
              : 'bg-gray-200 text-gray-500'
          }`}
          style={index + 1 === currentStep ? { color: '#064045' } : {}}
          >
            {index + 1}
          </div>
          <span className="font-medium text-sm md:text-base">{step}</span>
        </div>
      ))}
    </div>
  );
};

// Sidebar Component
// Sidebar Component
const Sidebar = ({ currentStep, contactPhone }) => {
  const steps = ['Service', 'Personnel', 'Date & Time', 'Informations'];
  
  return (
    <div className="text-white p-6 md:min-h-screen md:w-64 w-full" style={{ backgroundColor: '#064045' }}>
      <div className="mb-12">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="mt-auto">
        <p className="text-sm text-gray-300 mb-2">Besoin d'aide ?</p>
        <p className="text-lg font-semibold">{contactPhone}</p>
      </div>
    </div>
  );
};

// Main Page Component
const MedicalBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const services = getServices();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  // Quand on clique sur "Étape Suivante"
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService) return;

    setCurrentStep(2); // exemple : passer à l'étape 2
    console.log("Service confirmé :", selectedService);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ backgroundColor: '#F5F7F8' }}>
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 md:min-h-screen">        
          <Sidebar currentStep={currentStep} contactPhone="+1 (555) 123-4567" />
      </div>

      {/* Main */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Sélectionnez un service
          </h1>

          {/* FORMULAIRE */}
          <ServiceList
            services={services}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
            onSubmit={handleSubmit}
          />

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">

            <button className="text-gray-500 hover:text-gray-700 font-medium">
              RETOUR
            </button>

            <button
                onClick={handleSubmit}
                disabled={!selectedService}
                className={`w-full sm:w-auto max-w-full sm:max-w-[260px] mx-auto 
                            font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 
                            transition-colors
                            ${selectedService ? '' : 'opacity-50 pointer-events-none'}`}
                style={{ backgroundColor: '#FFE273', color: '#064045' }}
            >
                ÉTAPE SUIVANTE
              < ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalBookingPage;