'use client';

import { useState } from 'react';
import { X, Clock, Edit, Trash2, UserPlus } from 'lucide-react';

export default function Doctors() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr Nadir Kedji',
      specialty: 'Gynécologue obstétricien',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      description: "Gynécologue obstétricien, avec plus de 20 ans d'expertise en PMA. Expert dans les techniques de reproduction assistée et le suivi personnalisé des couples.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {
        Lundi: { start: '09:00', end: '17:00' },
        Mardi: { start: '09:00', end: '17:00' },
        Mercredi: { start: '09:00', end: '17:00' },
        Jeudi: { start: '09:00', end: '17:00' },
        Vendredi: { start: '09:00', end: '14:00' }
      }
    },
    {
      id: 2,
      name: 'Dr Sadat Nesrine',
      specialty: 'Médecin de la reproduction',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      description: "Spécialiste en médecine reproductive avec une approche bienveillante et personnalisée. Expérience approfondie dans le traitement de l'infertilité.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {
        Lundi: { start: '08:00', end: '16:00' },
        Mardi: { start: '08:00', end: '16:00' },
        Mercredi: { start: '08:00', end: '16:00' },
        Jeudi: { start: '08:00', end: '16:00' },
        Vendredi: { start: '08:00', end: '13:00' }
      }
    },
    {
      id: 3,
      name: 'Dr Selmane',
      specialty: 'Spécialiste en fertilité',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      description: "Expert en fertilité et techniques de PMA. Accompagne les couples avec dévouement et professionnalisme tout au long de leur parcours.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {
        Lundi: { start: '10:00', end: '18:00' },
        Mardi: { start: '10:00', end: '18:00' },
        Mercredi: { start: '10:00', end: '18:00' },
        Jeudi: { start: '10:00', end: '18:00' },
        Vendredi: { start: '10:00', end: '15:00' }
      }
    },
    {
      id: 4,
      name: 'Pr Mourad Semrouni',
      specialty: 'Professeur en médecine reproductive',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&sat=-100',
      description: "Gynécologue obstétricien, avec plus de 20 ans d'expertise en PMA. Expert dans les techniques de reproduction assistée et le suivi personnalisé des couples.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {}
    },
    {
      id: 5,
      name: 'Dr Bouchra Rezig',
      specialty: 'Spécialiste en médecine reproductive',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      description: "Spécialiste en médecine reproductive avec une approche bienveillante et personnalisée. Expérience approfondie dans le traitement de l'infertilité.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {}
    },
    {
      id: 6,
      name: 'Mme Samia Yaker',
      specialty: 'Infirmière spécialisée',
      photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
      description: "Expert en fertilité et techniques de PMA. Accompagne les couples avec dévouement et professionnalisme tout au long de leur parcours.",
      workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
      schedule: {}
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    photo: '',
    description: ''
  });
  //supabase data loading

  const handleAddDoctor = () => {
    if (formData.name && formData.specialty) {
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
        workDays: 'Lundi, Mardi, Mercredi, Jeudi, Vendredi',
        schedule: {}
      };
      setDoctors([...doctors, newDoctor]);
      setFormData({ name: '', specialty: '', photo: '', description: '' });
      setShowAddModal(false);
    }
  };

  const handleEditDoctor = () => {
    if (formData.name && formData.specialty) {
      setDoctors(doctors.map(doc => 
        doc.id === selectedDoctor.id ? { ...doc, ...formData } : doc
      ));
      setFormData({ name: '', specialty: '', photo: '', description: '' });
      setShowEditModal(false);
      setSelectedDoctor(null);
    }
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      photo: doctor.photo,
      description: doctor.description
    });
    setShowEditModal(true);
  };

  const openScheduleModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowScheduleModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos Médecins</h1>
            <p className="text-gray-600">
              Chaque spécialiste travaille en étroite coordination pour assurer un suivi global, précis et bienveillant.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition"
          >
            <UserPlus size={20} />
            Ajouter un médecin
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
              {/* Doctor Photo */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-yellow-600 font-medium text-sm mb-3">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{doctor.description}</p>
                
                {/* Work Days */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-4">
                  <Clock size={16} />
                  <span>Jours de travail:</span>
                </div>
                <p className="text-sm text-gray-600">{doctor.workDays}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => openScheduleModal(doctor)}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <Clock size={16} />
                  Gérer les horaires
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(doctor)}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <Edit size={16} />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 size={16} />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Ajouter un nouveau médecin</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la photo de profil</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleAddDoctor}
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Modifier le médecin</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la photo de profil</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleEditDoctor}
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Management Modal */}
      {showScheduleModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gérer les horaires - {selectedDoctor.name}</h2>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                <div key={day}>
                  <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Heure de début</label>
                      <select
                        defaultValue={selectedDoctor.schedule[day]?.start || ''}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Sélectionner</option>
                        {Array.from({ length: 48 }, (_, i) => {
                          const hour = Math.floor(i / 2);
                          const minute = i % 2 === 0 ? '00' : '30';
                          const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                          return <option key={time} value={time}>{time}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Heure de fin</label>
                      <select
                        defaultValue={selectedDoctor.schedule[day]?.end || ''}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Sélectionner</option>
                        {Array.from({ length: 48 }, (_, i) => {
                          const hour = Math.floor(i / 2);
                          const minute = i % 2 === 0 ? '00' : '30';
                          const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                          return <option key={time} value={time}>{time}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}