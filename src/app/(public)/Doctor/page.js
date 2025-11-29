// app/doctors/page.js
import React from 'react';
import DoctorHeroSection from '@/components/ui/Doctor/hero/DoctorHeroSection';
import DoctorsSection from '@/components/ui/Doctor/doctors/DoctorsSection';
import CTASection from '@/components/ui/Doctor/lastsec/CTASection';

export default function DoctorsPage() {
  return (
    <main className="min-h-screen">
      <DoctorHeroSection />
      <DoctorsSection />
      <CTASection />
    </main>
  );
}