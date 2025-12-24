/**
 * Doctor Specialty Badge
 * 
 * Displays the doctor's medical specialty in a styled badge.
 * The badge color adapts based on the card's color type (primary/secondary)
 * to create visual variety in the grid.
 */
import React from 'react';

const DoctorSpecialty = ({ specialty, colorType }) => {
  const bgColor = colorType === 'primary' ? 'bg-primary' : 'bg-secondary';
  const textColor = colorType === 'primary' ? 'text-secondary' : 'text-primary';

  return (
    <div className={`${bgColor} ${textColor} px-5 py-2 rounded-full text-xs md:text-sm font-semibold mb-4 inline-block shadow-sm`}>
      {specialty}
    </div>
  );
};

export default DoctorSpecialty;