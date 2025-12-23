'use client';

import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import DoctorCard from '@/components/ui/doctor_card';

// Modals
import AddDoctorModal from '@/components/modals/AddDoctorModal';
import EditDoctorModal from '@/components/modals/EditDoctorModal';
import ScheduleManagementModal from '@/components/modals/ScheduleManagementModal';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty_name: '',
    profile_picture: '',
    profile_file: null,
    description: '',
    email: '',
    is_active: true
  });
  //supabase data loading: fetch doctors and their schedules, then merge
  const fetchDoctors = async () => {
    const { data: doctorsData, error: doctorsError } = await supabase().from('doctor').select('*');
    const { data: schedulesData, error: schedulesError } = await supabase().from('doctor_schedule').select('*');

    if (doctorsError) {
      console.error('Error fetching doctors:', doctorsError);
      return;
    }
    if (schedulesError) {
      console.error('Error fetching schedules:', schedulesError);
      // we'll continue and attach empty schedules if schedules fail
    }

    // map numeric day_of_week -> French day names (assumes 1 = Lundi)
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',];

    // build schedule map by doctor_id
    const scheduleMap = {};
    (schedulesData || []).forEach((s) => {
      const did = s.doctor_id;
      const idx = Number(s.day_of_week);
      const dayName = dayNames[idx] || String(s.day_of_week);
      // format time to HH:MM if present (supabase time may be '09:00:00')
      const formatTime = (t) => (t ? String(t).substring(0, 5) : '');
      const start = formatTime(s.start_time);
      const end = formatTime(s.end_time);
      if (!scheduleMap[did]) scheduleMap[did] = {};
      scheduleMap[did][dayName] = { start, end };
    });

    const merged = (doctorsData || []).map((d) => ({
      ...d,
      // attach schedule object or empty object
      schedule: scheduleMap[d.doctor_id] || {},
      workDays: scheduleMap[d.doctor_id]
        ? Object.keys(scheduleMap[d.doctor_id]).join(', ')
        : 'Aucun jour de travail défini'
    }));

    setDoctors(merged);
    console.log('Doctors with schedules:', merged);
  }
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    if (formData.name && formData.specialty_name) {
      try {
        const toInsert = {
          name: formData.name,
          specialty_name: formData.specialty_name,
          profile_picture: formData.profile_picture || null,
          description: formData.description || null,
          email: formData.email || null,
          is_active: Boolean(formData.is_active)
        };

        // upload selected profile file to Supabase storage and set public URL
        if (formData.profile_file) {
          try {
            const file = formData.profile_file;
            const resp = await fetch('/api/upload-profile', {
              method: 'POST',
              headers: {
                'content-type': file.type || 'application/octet-stream',
                'x-filename': file.name
              },
              body: file
            })
            const json = await resp.json()
            if (resp.ok && json.publicUrl) {
              toInsert.profile_picture = json.publicUrl
            } else {
              console.error('Upload failed:', json)
            }
          } catch (err) {
            console.error('Error uploading image via server route:', err)
          }
        }
        const { data: inserted, error: insertError } = await supabase().from('doctor').insert(toInsert).select().single();
        if (insertError) {
          console.error('Error inserting doctor:', insertError);
          return;
        }
        const newDoctor = { ...inserted, schedule: {}, workDays: '' };
        setDoctors((prev) => [...prev, newDoctor]);
        setFormData({ name: '', specialty_name: '', profile_picture: '', profile_file: null, description: '', email: '', is_active: true });
        setShowAddModal(false);
      } catch (err) {
        console.error('handleAddDoctor error:', err);
      }
    }
  };

  const handleEditDoctor = async () => {
    if (formData.name && formData.specialty_name && selectedDoctor) {
      try {
        const updates = {
          name: formData.name,
          specialty_name: formData.specialty_name,
          profile_picture: formData.profile_picture || null,
          description: formData.description || null,
          email: formData.email || null,
          is_active: Boolean(formData.is_active)
        };

        // If a new file was selected, upload and set the new profile URL
        if (formData.profile_file) {
          try {
            const file = formData.profile_file;
            const resp = await fetch('/api/upload-profile', {
              method: 'POST',
              headers: {
                'content-type': file.type || 'application/octet-stream',
                'x-filename': file.name
              },
              body: file
            })
            const json = await resp.json()
            if (resp.ok && json.publicUrl) {
              updates.profile_picture = json.publicUrl
            } else {
              console.error('Upload failed:', json)
            }
          } catch (err) {
            console.error('Error uploading image via server route:', err)
          }
        }
        const { data: updated, error: updateError } = await supabase().from('doctor').update(updates).eq('doctor_id', selectedDoctor.doctor_id).select().single();
        if (updateError) {
          console.error('Error updating doctor:', updateError);
          return;
        }
        setDoctors((prev) => prev.map((doc) => (doc.doctor_id === updated.doctor_id ? { ...doc, ...updated } : doc)));
        setFormData({ name: '', specialty_name: '', profile_picture: '', profile_file: null, description: '', email: '', is_active: true });
        setShowEditModal(false);
        setSelectedDoctor(null);
      } catch (err) {
        console.error('handleEditDoctor error:', err);
      }
    }
  };

  const handleDeleteDoctor = (doctor_id) => {
    (async () => {
      try {
        // delete schedules first
        const { error: delSchedulesError } = await supabase().from('doctor_schedule').delete().eq('doctor_id', doctor_id);
        if (delSchedulesError) console.error('Error deleting schedules:', delSchedulesError);
        // delete doctor
        const { error: delError } = await supabase().from('doctor').delete().eq('doctor_id', doctor_id);
        if (delError) {
          console.error('Error deleting doctor:', delError);
          return;
        }
        setDoctors((prev) => prev.filter((doc) => doc.doctor_id !== doctor_id));
      } catch (err) {
        console.error('handleDeleteDoctor error:', err);
      }
    })();
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty_name: doctor.specialty_name,
      profile_picture: doctor.profile_picture,
      profile_file: null,
      description: doctor.description,
      email: doctor.email || '',
      is_active: doctor.is_active ?? true
    });
    setShowEditModal(true);
  };

  const openScheduleModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowScheduleModal(true);
  };

  const handleScheduleChange = (day, field, value) => {
    setSelectedDoctor((prev) => {
      if (!prev) return prev;
      const prevSchedule = prev.schedule || {};
      return {
        ...prev,
        schedule: {
          ...prevSchedule,
          [day]: {
            ...(prevSchedule[day] || {}),
            [field]: value
          }
        }
      };
    });
  };

  const saveSchedule = async () => {
    if (!selectedDoctor) return;
    const doctorId = selectedDoctor.doctor_id;
    const schedule = selectedDoctor.schedule || {};

    // map French day names to numeric day_of_week (1 = Lundi)
    const dayToIdx = { Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4, Vendredi: 5, Samedi: 6, Dimanche: 7 };

    try {
      // remove existing schedules for this doctor
      const { error: delError } = await supabase().from('doctor_schedule').delete().eq('doctor_id', doctorId);
      if (delError) console.error('Error deleting existing schedules:', delError);

      // prepare inserts
      const inserts = [];
      Object.entries(schedule).forEach(([day, times]) => {
        const start = times?.start?.trim();
        const end = times?.end?.trim();
        // skip empty entries
        if (!start && !end) return;
        const formatTime = (t) => (t ? (t.length === 5 ? `${t}:00` : t) : null);
        inserts.push({
          doctor_id: doctorId,
          day_of_week: dayToIdx[day] || null,
          start_time: formatTime(start),
          end_time: formatTime(end)
        });
      });

      if (inserts.length > 0) {
        const { data: inserted, error: insertError } = await supabase().from('doctor_schedule').insert(inserts);
        if (insertError) {
          console.error('Error inserting schedules:', insertError);
        } else {
          console.log('Inserted schedules:', inserted);
        }
      }

      // update local state
      setDoctors((prev) => prev.map((d) => (d.doctor_id === doctorId ? selectedDoctor : d)));
      setShowScheduleModal(false);
    } catch (err) {
      console.error('saveSchedule error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Nos Médecins</h1>
            <p className="text-gray-600">
              Chaque spécialiste travaille en étroite coordination pour assurer un suivi global, précis et bienveillant.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition"
            >
              <UserPlus size={20} />
              Ajouter un médecin
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.doctor_id} handleDeleteDoctor={handleDeleteDoctor} openEditModal={openEditModal} openScheduleModal={openScheduleModal} doctor={doctor}></DoctorCard>
          ))}
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <AddDoctorModal setShowAddModal={setShowAddModal} formData={formData} setFormData={setFormData} handleAddDoctor={handleAddDoctor}></AddDoctorModal>
      )}

      {/* Edit Doctor Modal */}
      {showEditModal && (
        <EditDoctorModal setShowEditModal={setShowEditModal} formData={formData} setFormData={setFormData} handleEditDoctor={handleEditDoctor}></EditDoctorModal>
      )}

      {/* Schedule Management Modal */}
      {showScheduleModal && selectedDoctor && (
        <ScheduleManagementModal setShowScheduleModal={setShowScheduleModal} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} handleScheduleChange={handleScheduleChange} saveSchedule={saveSchedule}></ScheduleManagementModal>
      )}
    </div>
  );
}