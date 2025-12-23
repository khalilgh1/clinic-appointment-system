import { X } from 'lucide-react'

export default function ConfirmModal({ title = 'Confirmer', message = 'Êtes-vous sûr ?', confirmLabel = 'Supprimer', cancelLabel = 'Annuler', onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-700">{message}</p>

                <div className="flex gap-3 mt-6">
                    <button onClick={onCancel} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                        {cancelLabel}
                    </button>
                    <button onClick={onConfirm} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
