'use client';

import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import DoctorCard from '@/components/ui/doctor_card';

// Modals
import ConfirmModal from '@/components/modals/ConfirmModal';
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
  // delete confirmation
  const [pendingDeleteDoctor, setPendingDeleteDoctor] = useState(null);
  // fetch doctors and schedules via server API
  const fetchDoctors = async () => {
    try {
      const resp = await fetch('/api/doctors')
      const json = await resp.json()
      if (!resp.ok) {
        console.error('Error fetching doctors:', json)
        return
      }
      setDoctors(json.doctors || [])
    } catch (err) {
      console.error('fetchDoctors error:', err)
    }
  }
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    if (formData.name && formData.specialty_name) {
      try {
        //get form data
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
        const resp = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: toInsert }),
        })
        const json = await resp.json()
        if (!resp.ok) {
          console.error('Error inserting doctor:', json)
          return
        }
        const inserted = json.doctor
        const newDoctor = { ...inserted, schedule: {}, workDays: '', exceptions: [] }
        setDoctors((prev) => [...prev, newDoctor])
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
        //get form data
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
        const resp = await fetch('/api/doctors', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update', doctor_id: selectedDoctor.doctor_id, updates }),
        })
        const json = await resp.json()
        if (!resp.ok) {
          console.error('Error updating doctor:', json)
          return
        }
        const updated = json.doctor
        setDoctors((prev) => prev.map((doc) => (doc.doctor_id === updated.doctor_id ? { ...doc, ...updated } : doc)))
        setFormData({ name: '', specialty_name: '', profile_picture: '', profile_file: null, description: '', email: '', is_active: true });
        setShowEditModal(false);
        setSelectedDoctor(null);
      } catch (err) {
        console.error('handleEditDoctor error:', err);
      }
    }
  };

  const handleDeleteDoctor = (doctor_id) => {
    // show confirmation modal
    const doc = doctors.find(d => d.doctor_id === doctor_id) || { name: '' }
    setPendingDeleteDoctor({ doctor_id, name: doc.name })
  }

  const performDeleteDoctor = async () => {
    if (!pendingDeleteDoctor) return
    const { doctor_id } = pendingDeleteDoctor
    try {
      const resp = await fetch('/api/doctors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctor_id }),
      })
      const json = await resp.json()
      if (!resp.ok) {
        console.error('Error deleting doctor:', json)
        setPendingDeleteDoctor(null)
        return
      }
      setDoctors((prev) => prev.filter((doc) => doc.doctor_id !== doctor_id))
    } catch (err) {
      console.error('performDeleteDoctor error:', err)
    } finally {
      setPendingDeleteDoctor(null)
    }
  }

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
    const exceptionList = selectedDoctor.exceptions || [];

    // map French day names to numeric day_of_week (1 = Lundi)
    const dayToIdx = { Lundi: 1, Mardi: 2, Mercredi: 3, Jeudi: 4, Vendredi: 5, Samedi: 6, Dimanche: 7 };
    const formatTimeValue = (t) => (t ? (t.length === 5 ? `${t}:00` : t) : null);

    try {
      const inserts = [];
      Object.entries(schedule).forEach(([day, times]) => {
        const start = times?.start?.trim();
        const end = times?.end?.trim();
        if (!start && !end) return;
        inserts.push({
          doctor_id: doctorId,
          day_of_week: dayToIdx[day] || null,
          start_time: formatTimeValue(start),
          end_time: formatTimeValue(end),
        })
      })
      // send to server API to upsert
      const resp = await fetch('/api/doctors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'schedule', doctor_id: doctorId, inserts }),
      })
      const json = await resp.json()
      if (!resp.ok) {
        console.error('Error saving schedules:', json)
      }

      //get exceptions to insert/update
      const exceptionInserts = exceptionList
        .map((exception) => {
          const date = exception.date?.trim() || '';
          return {
            doctor_id: doctorId,
            date,
            start_time: formatTimeValue(exception.start_time),
            end_time: formatTimeValue(exception.end_time),
            is_available: Boolean(exception.is_available),
          }
        })
        .filter((entry) => entry.date)

      const exceptionsResp = await fetch('/api/doctors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'exceptions', doctor_id: doctorId, inserts: exceptionInserts }),
      })
      const exceptionsJson = await exceptionsResp.json()
      if (!exceptionsResp.ok) {
        console.error('Error saving exceptions:', exceptionsJson)
      }

      setDoctors((prev) => prev.map((d) => (d.doctor_id === doctorId ? selectedDoctor : d)))
      setShowScheduleModal(false)
    } catch (err) {
      console.error('saveSchedule error:', err)
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
      {pendingDeleteDoctor && (
        <ConfirmModal
          title="Supprimer le médecin"
          message={`Voulez-vous vraiment supprimer "${pendingDeleteDoctor.name}" ? Cette action est irréversible.`}
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
          onConfirm={performDeleteDoctor}
          onCancel={() => setPendingDeleteDoctor(null)}
        />
      )}
    </div>
  );
}