import { Clock, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

/**
 * DoctorCard - Displays doctor information with management actions
 * Used in admin panels for doctor management with edit/delete/schedule functionality
 * @param {Object} props - Component props
 * @param {Object} props.doctor - Doctor data object
 * @param {Function} props.openScheduleModal - Opens schedule management modal
 * @param {Function} props.openEditModal - Opens edit doctor modal
 * @param {Function} props.handleDeleteDoctor - Deletes doctor from system
 */
export default function DoctorCard(props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
      {/* Doctor Photo Section */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          {props.doctor.profile_picture ? (
            <Image
              src={props.doctor.profile_picture}
              alt={props.doctor.name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <span className="text-sm">No photo</span>
            </div>
          )}
          {/* Status indicators */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
      </div>

      {/* Doctor Information */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{props.doctor.name}</h3>
        <p className="text-yellow-600 font-medium text-sm mb-3">{props.doctor.specialty_name}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{props.doctor.description}</p>

        {/* Work Days Display */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-700 mb-4">
          <Clock size={16} />
          <span>Jours de travail:</span>
        </div>
        <p className="text-sm text-gray-600">{props.doctor.workDays}</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button 
          onClick={() => props.openScheduleModal(props.doctor)} 
          className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <Clock size={16} />
          Gérer les horaires
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => props.openEditModal(props.doctor)} 
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <Edit size={16} />
            Modifier
          </button>
          <button 
            onClick={() => props.handleDeleteDoctor(props.doctor.doctor_id)} 
            className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}