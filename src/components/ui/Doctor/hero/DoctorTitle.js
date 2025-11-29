// components/ui/Doctor/DoctorTitle.js
import React from 'react';

const DoctorTitle = () => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        ÉQUIPE MÉDICALE
      </h1>
      <h2 
        className="text-4xl md:text-5xl lg:text-6xl text-yellow-500"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        Fertival
      </h2>
    </div>
  );
};

export default DoctorTitle;