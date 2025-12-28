import { X } from 'lucide-react';

const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default function ScheduleManagementModal(props) {
  const doctor = props.selectedDoctor;

  const handleExceptionChange = (index, field, value) => {
    props.setSelectedDoctor((prev) => {
      if (!prev) return prev;
      const nextExceptions = (prev.exceptions || []).map((item, idx) => (idx === index ? { ...item, [field]: value } : item));
      return { ...prev, exceptions: nextExceptions };
    });
  };

  const addException = () => {
    props.setSelectedDoctor((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        exceptions: [
          ...(prev.exceptions || []),
          { date: '', start_time: '', end_time: '', is_available: false },
        ],
      };
    });
  };

  const removeException = (index) => {
    props.setSelectedDoctor((prev) => {
      if (!prev) return prev;
      const next = (prev.exceptions || []).filter((_, idx) => idx !== index);
      return { ...prev, exceptions: next };
    });
  };

  const exceptions = doctor?.exceptions || [];

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gérer les horaires - {doctor?.name}</h2>
          <button onClick={() => props.setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {weekDays.map((day) => (
            <div key={day}>
              <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Heure de début</label>
                  <input
                    type="time"
                    step={60}
                    value={doctor?.schedule?.[day]?.start || ''}
                    onChange={(e) => props.handleScheduleChange(day, 'start', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Heure de fin</label>
                  <input
                    type="time"
                    step={60}
                    value={doctor?.schedule?.[day]?.end || ''}
                    onChange={(e) => props.handleScheduleChange(day, 'end', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              {(doctor?.schedule?.[day]?.start || doctor?.schedule?.[day]?.end) && (
                <button
                  type="button"
                  onClick={() =>
                    props.setSelectedDoctor((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        schedule: {
                          ...prev.schedule,
                          [day]: {
                            start: '',
                            end: '',
                          },
                        },
                      };
                    })
                  }
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Effacer les horaires
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Exceptions</h3>
            <button type="button" onClick={addException} className="text-sm font-medium text-teal-600 hover:text-teal-800">
              Ajouter une exception
            </button>
          </div>
          {exceptions.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune exception définie pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {exceptions.map((exception, index) => (
                <div
                  key={exception.exception_id ?? `${exception.date || 'new'}-${index}`}
                  className="border border-gray-200 rounded-lg p-4 bg-slate-50"
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Date</label>
                      <input
                        type="date"
                        value={exception.date || ''}
                        onChange={(e) => handleExceptionChange(index, 'date', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Heure de début</label>
                      <input
                        type="time"
                        step={60}
                        value={exception.start_time ? exception.start_time.substring(0, 5) : ''}
                        onChange={(e) => handleExceptionChange(index, 'start_time', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Heure de fin</label>
                      <input
                        type="time"
                        step={60}
                        value={exception.end_time ? exception.end_time.substring(0, 5) : ''}
                        onChange={(e) => handleExceptionChange(index, 'end_time', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={Boolean(exception.is_available)}
                        onChange={(e) => handleExceptionChange(index, 'is_available', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      Disponible ce jour-là
                    </label>
                    <button type="button" onClick={() => removeException(index)} className="text-sm text-red-600 hover:text-red-800">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
    </div>
  );
}