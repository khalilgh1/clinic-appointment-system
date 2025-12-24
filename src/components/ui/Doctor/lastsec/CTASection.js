/**
 * Call to Action Section
 * 
 * A prominent section at the bottom of the page encouraging users to take action.
 * It provides links to book an appointment or learn more about the clinic.
 */
import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-primary rounded-3xl px-12 py-16 md:py-20 text-center shadow-xl">
          {/* Heading */}
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Prêt à commencer votre parcours vers la parentalité ?
          </h2>
          
          {/* Subheading */}
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Notre équipe expérimentée est là pour vous accompagner avec expertise,
            bienveillance et discrétion à chaque étape de votre projet.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/MedicalBooking"
              className="bg-secondary text-primary px-8 py-3 rounded-full text-sm md:text-base font-semibold shadow-md transition-all duration-300 hover:scale-105"
            >
              Prendre Rendez-Vous
            </Link>
            
            <Link 
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              En savoir plus sur nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;