import {X} from 'lucide-react';

export default function ScheduleManagementModal(props) {
  return (<div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gérer les horaires - {props.selectedDoctor.name}</h2>
        <button onClick={() => props.setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map(day => <div key={day}>
          <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heure de début</label>
              <input type="time" step={60} value={props.selectedDoctor.schedule?.[day]?.start || ''} onChange={e => props.handleScheduleChange(day, 'start', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Heure de fin</label>
              <input type="time" step={60} value={props.selectedDoctor.schedule?.[day]?.end || ''} onChange={e => props.handleScheduleChange(day, 'end', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          {(props.selectedDoctor.schedule?.[day]?.start || props.selectedDoctor.schedule?.[day]?.end) && <button onClick={() => {
            props.setSelectedDoctor(prev => ({
              ...prev,
              schedule: {
                ...prev.schedule,
                [day]: {
                  start: '',
                  end: ''
                }
              }
            }));
          }} className="mt-2 text-sm text-red-600 hover:text-red-800">
            Effacer les horaires
          </button>}
        </div>)}
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => props.setShowScheduleModal(false)} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
          Annuler
        </button>
        <button onClick={props.saveSchedule} className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition">
          Enregistrer
        </button>
      </div>
    </div>
  </div>);
}