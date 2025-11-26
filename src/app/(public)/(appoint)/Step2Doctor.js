"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// DoctorCard Component
const DoctorCard = ({ doctor, isSelected, onClick }) => {
  const { name, specialty, description, email } = doctor;
  
  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm flex flex-col h-full transition-all border cursor-pointer
        ${isSelected ? 'border-2 border-primary shadow-lg' : 'border border-gray-200 hover:border-primary/40 hover:shadow-md'}`}
      onClick={onClick}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-primary">{name}</h3>
        <p className="text-secondary-light mt-1">{specialty}</p>
      </div>

      {description && (
        <p className="text-secondary-light text-sm mb-4 leading-relaxed">{description}</p>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100">
        <span className="text-primary text-sm font-medium">{email}</span>
      </div>
    </div>
  );
};

// Step2Doctor Component
const Step2Doctor = ({ selectedDoctor, onSelectDoctor, onNext }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);

      // Données complètes comme dans votre capture
      const data = [
        { 
          id: 1,
          name: "Dr Nadir Kedji", 
          specialty: "Gynécologue obstétricien", 
          description: "Expert PMA (20+ ans)", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 2,
          name: "Dr Sadat Nesrine", 
          specialty: "Spécialiste en fertilité", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 3,
          name: "Dr. Selmane", 
          specialty: "Spécialiste en fertilité", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 4,
          name: "Pr Mourad Semrouni", 
          specialty: "Endocrinologue dialektologue", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 5,
          name: "Dr Bouchra Rezig", 
          specialty: "Médecin nutritionniste", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 6,
          name: "Mme Samia Yaker", 
          specialty: "Biologiste de la reproduction", 
          email: "contact@ferival.dz" 
        },
        { 
          id: 7,
          name: "Mme Sabrina Ferrane", 
          specialty: "Embryologiste", 
          email: "contact@ferival.dz" 
        }
      ];

      setDoctors(data);
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedDoctor) {
      onNext();
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Sélectionnez votre médecin
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Chargement des médecins...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor} 
              isSelected={selectedDoctor?.id === doctor.id}
              onClick={() => onSelectDoctor(doctor)}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleNext}
          disabled={!selectedDoctor}
          className={`w-full sm:w-auto max-w-full sm:max-w-[260px] mx-auto
                      font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2
                      transition-colors ${selectedDoctor ? 'bg-secondary text-primary hover:bg-secondary/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          ÉTAPE SUIVANTE
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step2Doctor;