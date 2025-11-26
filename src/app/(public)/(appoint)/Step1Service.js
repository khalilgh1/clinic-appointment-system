"use client"

import React from 'react';
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
const ServiceCard = ({ service, onClick, isSelected }) => {
  return (
    <div 
      className={`bg-white rounded-lg p-4 md:p-6 shadow-sm transition-all cursor-pointer h-full flex flex-col 
      ${isSelected ? 'border-2 border-primary shadow-lg' : 'border border-gray-200 hover:border-primary/40 hover:shadow-md'}`}
      onClick={() => onClick(service)}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className="rounded-lg p-2 md:p-3 flex-shrink-0 bg-secondary">
          <ServiceIcon iconName={service.icon} className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
            {service.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
            {service.description}
          </p>
          
          {service.badge ? (
            <span className="inline-block text-white text-xs md:text-sm font-medium px-3 py-1 rounded bg-primary">
              {service.badge}
            </span>
          ) : service.price ? (
            <span className="text-base md:text-lg font-semibold text-primary">
              {service.price}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ServiceList Component (CORRIGÉ - sans formulaire)
const ServiceList = ({ services, selectedService, onServiceSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-11 items-stretch">
      {services.map(service => (
        <div
          key={service.id}
          className="cursor-pointer"
          onClick={() => onServiceSelect(service)}
        >
          <ServiceCard 
            service={service}
            isSelected={selectedService?.id === service.id}
          />
        </div>
      ))}
    </div>
  );
};

const Step1Service = ({ selectedService, onSelectService, onNext }) => {
  const services = getServices();

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedService) {
      onNext();
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Sélectionnez un service
      </h1>

      <ServiceList
        services={services}
        selectedService={selectedService}
        onServiceSelect={onSelectService}
      />

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className={`w-full sm:w-auto max-w-full sm:max-w-[260px] mx-auto
                      font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2
                      transition-colors ${selectedService ? 'bg-secondary text-primary hover:bg-secondary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          ÉTAPE SUIVANTE
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1Service;