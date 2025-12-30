/**
 * Doctor Image Slider
 * 
 * An auto-scrolling carousel displaying images of the medical team or clinic.
 * It adds visual dynamism to the hero section with smooth transitions and
 * navigation controls.
 */
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DoctorSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: '/doctorslider1_v3.png', alt: 'Doctor 1' },
    { id: 2, image: '/doctorslider2_v2.png', alt: 'Doctor 2' },
    { id: 3, image: '/doctorslider3_v2.1.png', alt: 'Doctor 3' },
    { id: 4, image: '/doctorslider4_v3.png', alt: 'Doctor 4' },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleSlides = () => {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    
    return [
      { ...slides[prevIndex], position: 'left' },
      { ...slides[currentSlide], position: 'center' },
      { ...slides[nextIndex], position: 'right' },
    ];
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-8 md:mb-12 relative w-full">
      {/* Slider Container */}
      <div className="relative h-[200px] md:h-[280px] lg:h-[320px] flex items-center justify-center gap-3 md:gap-4 lg:gap-6 w-full overflow-visible px-4">
        {getVisibleSlides().map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out shadow-lg flex-shrink-0
              ${slide.position === 'center' 
                ? 'w-[200px] h-[180px] md:w-[340px] md:h-[260px] lg:w-[420px] lg:h-[300px] z-20 scale-100' 
                : 'w-[140px] h-[140px] md:w-[220px] md:h-[200px] lg:w-[260px] lg:h-[240px] z-10 opacity-60 scale-95'
              }
            `}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes={slide.position === 'center' ? '(max-width: 768px) 200px, (max-width: 1024px) 340px, 420px' : '(max-width: 768px) 140px, (max-width: 1024px) 220px, 260px'}
              priority={slide.position === 'center'}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-4 z-30 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-4 z-30 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-blue-600 w-6' 
                : 'bg-gray-400 hover:bg-gray-500 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorSlider;