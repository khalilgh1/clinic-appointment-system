"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useDoctorAvailability } from '@/hooks/useDoctorAvailability';

const Step3Schedule = ({ onNext, onBack }) => {
  const { state, dispatch } = useBooking();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const doctorId = state.selectedDoctor?.id;

  // Utilisation du hook pour la disponibilité
  const { 
    availableDates, 
    availableTimeSlots, 
    loading, 
    error
  } = useDoctorAvailability(doctorId, selectedDate);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      dispatch({ 
        type: 'SET_DATE_TIME', 
        payload: {
          date: selectedDate,
          time: selectedTime,
          doctor: state.selectedDoctor
        }
      });
      onNext();
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Choisissez la date et l'heure
      </h1>

      {/* Info du médecin sélectionné */}
      {state.selectedDoctor && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-primary mb-2">Médecin sélectionné</h3>
          <p className="text-sm">
            <span className="font-medium">{state.selectedDoctor.name}</span> - {state.selectedDoctor.specialty}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section Calendrier */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendrier
            </h2>
            <div className="flex gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {error ? (
            <div className="text-center text-red-500 py-4">
              {error}
            </div>
          ) : (
            <CalendarGrid
              currentMonth={currentMonth}
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              loading={loading}
            />
          )}
        </div>

        {/* Section Horaires */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Horaires disponibles
          </h2>

          {selectedDate ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Créneaux disponibles le {selectedDate.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              
              <TimeSlotsGrid
                availableTimes={availableTimeSlots}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                loading={loading}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Veuillez sélectionner une date pour voir les horaires disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Récapitulatif */}
      {(selectedDate || selectedTime) && (
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Récapitulatif du rendez-vous</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            {selectedDate && (
              <div>
                <span className="text-gray-600">Date: </span>
                <span className="font-medium">
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
            {selectedTime && (
              <div>
                <span className="text-gray-600">Horaire: </span>
                <span className="font-medium">{selectedTime}</span>
              </div>
            )}
            {state.selectedDoctor && (
              <div>
                <span className="text-gray-600">Avec: </span>
                <span className="font-medium">{state.selectedDoctor.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          RETOUR
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
          className={`font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            selectedDate && selectedTime
              ? 'bg-secondary text-primary hover:bg-secondary/90' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ÉTAPE SUIVANTE
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Composants restants identiques mais avec gestion du loading
const CalendarGrid = ({ currentMonth, availableDates, selectedDate, onDateSelect, loading }) => {
  // ... (même code que précédemment, avec ajout du loading state)
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement des disponibilités...</div>
      </div>
    );
  }
  // ... reste du code identique
};

const TimeSlotsGrid = ({ availableTimes, selectedTime, onTimeSelect, loading }) => {
  // ... (même code que précédemment, avec ajout du loading state)
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Chargement des horaires...</div>
      </div>
    );
  }
  // ... reste du code identique
};

export default Step3Schedule;