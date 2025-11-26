"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

const Step3Schedule = ({ onNext, onBack }) => {
  const { state, dispatch } = useBooking();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Dummy available dates and times
  const availableDates = generateAvailableDates(30); // 30 going from today
  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      // Store the date and hour !
      dispatch({ 
        type: 'SET_DATE_TIME', 
        payload: {
          date: selectedDate,
          time: selectedTime
        }
      });
      onNext();
    }
  };

  // Navigation in calendar
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

          <CalendarGrid
            currentMonth={currentMonth}
            availableDates={availableDates}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Section hours */}
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
                availableTimes={availableTimes}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
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

      {/* what is selected ? */}
      {(selectedDate || selectedTime) && (
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Récapitulatif</h3>
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

// Componant calendar
const CalendarGrid = ({ currentMonth, availableDates, selectedDate, onDateSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate days for the month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = [];
  
  // empty days before month start
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  
  // month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    
    const isAvailable = availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
    
    const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
    const isToday = date.toDateString() === today.toDateString();
    
    days.push({
      date,
      number: day,
      isAvailable,
      isSelected,
      isToday
    });
  }

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <div>
      <h3 className="text-lg font-semibold text-center mb-4 capitalize">{monthName}</h3>
      
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day ? (
              <button
                onClick={() => day.isAvailable && onDateSelect(day.date)}
                disabled={!day.isAvailable}
                className={`w-full h-full rounded text-sm font-medium transition-all ${
                  day.isSelected
                    ? 'bg-primary text-white'
                    : day.isToday
                    ? 'border-2 border-primary text-primary'
                    : day.isAvailable
                    ? 'text-gray-700 hover:bg-primary/10 hover:border hover:border-primary/30'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                {day.number}
              </button>
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// hours grid component
const TimeSlotsGrid = ({ availableTimes, selectedTime, onTimeSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {availableTimes.map(time => (
        <button
          key={time}
          onClick={() => onTimeSelect(time)}
          className={`p-3 rounded-lg border transition-all text-sm font-medium ${
            selectedTime === time
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:bg-primary/5'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

// generate available dates function (simulated)
function generateAvailableDates(daysCount) {
  const availableDates = [];
  const today = new Date();
  
  for (let i = 0; i < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Simulate weekend 
    if (date.getDay() !== 5 && date.getDay() !== 6) {
      availableDates.push(new Date(date));
    }
  }
  
  return availableDates;
}

export default Step3Schedule;