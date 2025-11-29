import { X} from 'lucide-react';

export default function AddDoctorModal(props) {
  return (<div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-md w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Ajouter un nouveau médecin</h2>
        <button onClick={() => props.setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input type="text" value={props.formData.name} onChange={e => props.setFormData({
            ...props.formData,
            name: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={props.formData.email} onChange={e => props.setFormData({
            ...props.formData,
            email: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
          <input type="text" value={props.formData.specialty_name} onChange={e => props.setFormData({
            ...props.formData,
            specialty_name: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de la profile_picture de profil</label>
          <input type="text" value={props.formData.profile_picture} onChange={e => props.setFormData({
            ...props.formData,
            profile_picture: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select value={props.formData.is_active} onChange={e => props.setFormData({
            ...props.formData,
            is_active: e.target.value === 'true'
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={props.formData.description} onChange={e => props.setFormData({
            ...props.formData,
            description: e.target.value
          })} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => props.setShowAddModal(false)} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
          Annuler
        </button>
        <button onClick={props.handleAddDoctor} className="flex-1 bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition">
          Ajouter
        </button>
      </div>
    </div>
  </div>);
}