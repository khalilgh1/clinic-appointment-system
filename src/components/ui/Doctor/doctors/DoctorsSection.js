// components/ui/Doctor/DoctorsSection.js
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import DoctorCard from './DoctorCard';

const DoctorsSection = async () => {
  const supabase = await supabase();
  
  // Fetch doctors from Supabase
  const { data: doctors, error } = await supabase
    .from('doctor')
    .select('*')
    .eq('is_active', true)
    .order('doctor_id', { ascending: true });

  if (error) {
    console.error('Error fetching doctors:', error);
    return (
      <section className="py-16 px-4">
        <p className="text-center text-red-500">Error loading doctors</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
      <div className="w-full max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16"> 
          {doctors && doctors.map((doctor, index) => (
            <DoctorCard 
              key={doctor.doctor_id} 
              doctor={doctor} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;