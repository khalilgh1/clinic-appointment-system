/**
 * Doctor Hero Section
 * 
 * The top section of the doctors page.
 * It combines the page title, an image slider, and a descriptive text area
 * to introduce the medical team to the user.
 */
import React from 'react';
import DoctorTitle from './DoctorTitle';
import DoctorSlider from './DoctorSlider';
import DoctorDescription from './DoctorDescription';

const DoctorHeroSection = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-12">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <DoctorTitle />
        <DoctorSlider />
        <DoctorDescription />
      </div>
    </section>
  );
};

export default DoctorHeroSection;