"use client";

import React from 'react';

/**
 * Generates initials from a name (max 2 letters)
 * @param {string} name - Full name
 * @returns {string} Uppercase initials
 */
const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Generates consistent color based on name for avatar fallback
 * @param {string} name - Name to generate color from
 * @returns {string} Tailwind CSS color class
 */
const getColorFromName = (name) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
  ];
  const index = name.length % colors.length;
  return colors[index];
};

/**
 * DoctorCard - Displays doctor card for patient selection in booking flow
 * Shows doctor info with visual selection state and fallback avatar
 * @param {Object} props - Component props
 * @param {Object} props.doctor - Doctor data
 * @param {boolean} props.isSelected - Whether card is currently selected
 * @param {Function} props.onClick - Click handler for selection
 */
const DoctorCard = ({ doctor, isSelected, onClick }) => {
  const { name, specialty, description, email } = doctor;
  
  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm flex flex-col h-full transition-all border cursor-pointer
        ${isSelected ? 'border-2 border-primary shadow-lg' : 'border border-gray-200 hover:border-primary/40 hover:shadow-md'}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Profile picture with fallback to colored initials */}
        {doctor.profilePicture ? (
           <img 
             src={doctor.profilePicture} 
             alt={name} 
             className="flex-shrink-0 w-16 h-16 rounded-full object-cover border border-gray-100"
             onError={(e) => {
               e.target.style.display = 'none';
               e.target.nextSibling.style.display = 'flex';
             }}
           />
        ) : null}
        
        <div 
          className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getColorFromName(name)}`}
          style={{ display: doctor.profilePicture ? 'none' : 'flex' }}
        >
          {getInitials(name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-primary">{name}</h3>
          <p className="text-secondary-light mt-1">{specialty}</p>
        </div>
      </div>

      {/* Doctor description if available */}
      {description && (
        <p className="text-secondary-light text-sm mb-4 leading-relaxed">{description}</p>
      )}

      {/* Footer with contact email */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <span className="text-primary text-sm font-medium">{email}</span>
      </div>
    </div>
  );
};

export default DoctorCard;