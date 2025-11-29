// components/ui/Doctor/DoctorSpecialty.js
import React from 'react';

const DoctorSpecialty = ({ specialty, colorType }) => {
  // When colorType is primary: container is primary, text is yellow (secondary)
  // When colorType is secondary: container is yellow (secondary), text is blue (primary)
  const bgColor = colorType === 'primary' ? 'bg-primary' : 'bg-secondary';
  const textColor = colorType === 'primary' ? 'text-secondary' : 'text-primary';

  return (
    <div className={`${bgColor} ${textColor} px-5 py-2 rounded-full text-xs md:text-sm font-semibold mb-4 inline-block shadow-sm`}>
      {specialty}
    </div>
  );
};

export default DoctorSpecialty;