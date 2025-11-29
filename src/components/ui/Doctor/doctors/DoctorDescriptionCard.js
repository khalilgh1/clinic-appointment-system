// components/ui/Doctor/DoctorDescriptionCard.js
import React from 'react';

const DoctorDescriptionCard = ({ description }) => {
  return (
    <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto px-2">
      {description}
    </p>
  );
};

export default DoctorDescriptionCard;