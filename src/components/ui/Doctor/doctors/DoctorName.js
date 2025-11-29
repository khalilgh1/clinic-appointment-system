// components/ui/Doctor/DoctorName.js
import React from 'react';

const DoctorName = ({ name }) => {
  return (
    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-2">
      {name}
    </h3>
  );
};

export default DoctorName;