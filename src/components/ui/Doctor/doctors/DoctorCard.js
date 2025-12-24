/**
 * Doctor Card Component
 * 
 * Displays a summary of a doctor's profile, including their image, name, 
 * specialty, and a brief description. It serves as a single item in the doctors grid.
 */
import React from 'react';
import DoctorImage from './DoctorImage';
import DoctorName from './DoctorName';
import DoctorSpecialty from './DoctorSpecialty';
import DoctorDescriptionCard from './DoctorDescriptionCard';

const DoctorCard = ({ doctor, index }) => {
  const colorType = index % 2 === 0 ? 'primary' : 'secondary';

  return (
    <div className="flex flex-col items-center text-center animate-fade-in-up">
      <DoctorImage 
        imageUrl={doctor.profile_picture} 
        name={doctor.name}
        colorType={colorType}
      />
      <DoctorName name={doctor.name} />
      <DoctorSpecialty 
        specialty={doctor.specialty_name} 
        colorType={colorType}
      />
      <DoctorDescriptionCard description={doctor.description} />
    </div>
  );
};

export default DoctorCard;