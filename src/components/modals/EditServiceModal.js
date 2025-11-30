"use client"

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

function getArray(value) {
    if (!value) return []
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value)
            if (Array.isArray(parsed)) return parsed
        } catch (e) { }
        return value.split(',').map(s => s.trim()).filter(Boolean)
    }
    return []
}

export default function EditServiceModal(props) {
    const [examsCategoryInput, setExamsCategoryInput] = useState('')
    const [examsItemsInput, setExamsItemsInput] = useState('')
    const [equipInput, setEquipInput] = useState('')
    const [advInput, setAdvInput] = useState('')
    const [procInput, setProcInput] = useState('')

    const exams = getArray(props.formData.exams)
    const equips = getArray(props.formData.equipments)
    const advs = getArray(props.formData.advantages)
    const procs = getArray(props.formData.procedures)

    function addToField(field, value, clearFn) {
        if (field === 'exams') {
            const cat = examsCategoryInput?.trim()
            const items = examsItemsInput?.trim()
            if (!items) return
            const arr = getArray(props.formData[field])
            props.setFormData({ ...props.formData, [field]: [...arr, { category: cat || '', items }] })
            setExamsCategoryInput('')
            setExamsItemsInput('')
            return
        }
        if (!value || !value.trim()) return
        const arr = getArray(props.formData[field])
        props.setFormData({ ...props.formData, [field]: [...arr, value.trim()] })
        clearFn('')
    }

    function removeFromField(field, idx) {
        const arr = getArray(props.formData[field])
        const next = arr.filter((_, i) => i !== idx)
        props.setFormData({ ...props.formData, [field]: next })
    }

    return (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Modifier un Service</h2>
                    <button onClick={() => props.setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input type="text" value={props.formData.name} onChange={e => props.setFormData({ ...props.formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                            <input type="number" value={props.formData.price} onChange={e => props.setFormData({ ...props.formData, price: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (min)</label>
                            <input type="number" value={props.formData.duration_min} onChange={e => props.setFormData({ ...props.formData, duration_min: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={props.formData.description} onChange={e => props.setFormData({ ...props.formData, description: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Examens</label>
                            <div className="flex gap-2">
                                <input value={examsCategoryInput} onChange={e => setExamsCategoryInput(e.target.value)} className="w-1/3 border border-gray-300 rounded-lg px-3 py-2" placeholder="Catégorie" />
                                <input value={examsItemsInput} onChange={e => setExamsItemsInput(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Items (comma separated)" />
                                <button onClick={() => addToField('exams', null, null)} className="bg-primary text-white px-3 py-2 rounded-lg"><Plus size={16} /></button>
                            </div>
                            <div className="mt-2 flex flex-col gap-2">{exams.map((it, i) => (
                                <div key={i} className="flex items-start justify-between gap-2 bg-gray-100 px-3 py-2 rounded">
                                    <div>
                                        <div className="text-sm font-medium">{it.category || 'Général'}</div>
                                        <div className="text-sm text-gray-600">{it.items}</div>
                                    </div>
                                    <button onClick={() => removeFromField('exams', i)} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
                                </div>
                            ))}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Equipments</label>
                            <div className="flex gap-2">
                                <input value={equipInput} onChange={e => setEquipInput(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Add equipment" />
                                <button onClick={() => addToField('equipments', equipInput, setEquipInput)} className="bg-primary text-white px-3 py-2 rounded-lg"><Plus size={16} /></button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">{equips.map((it, i) => (
                                <span key={i} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                                    <span className="text-sm">{it}</span>
                                    <button onClick={() => removeFromField('equipments', i)} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
                                </span>
                            ))}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avantages</label>
                            <div className="flex gap-2">
                                <input value={advInput} onChange={e => setAdvInput(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Add advantage" />
                                <button onClick={() => addToField('advantages', advInput, setAdvInput)} className="bg-primary text-white px-3 py-2 rounded-lg"><Plus size={16} /></button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">{advs.map((it, i) => (
                                <span key={i} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                                    <span className="text-sm">{it}</span>
                                    <button onClick={() => removeFromField('advantages', i)} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
                                </span>
                            ))}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Procédures</label>
                            <div className="flex gap-2">
                                <input value={procInput} onChange={e => setProcInput(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Add procedure" />
                                <button onClick={() => addToField('procedures', procInput, setProcInput)} className="bg-primary text-white px-3 py-2 rounded-lg"><Plus size={16} /></button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">{procs.map((it, i) => (
                                <span key={i} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                                    <span className="text-sm">{it}</span>
                                    <button onClick={() => removeFromField('procedures', i)} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
                                </span>
                            ))}</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                        <select value={props.formData.is_active} onChange={e => props.setFormData({ ...props.formData, is_active: e.target.value === 'true' })} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 sticky bottom-0 left-6 right-6 bg-white pb-4">
                    <button onClick={() => props.setShowEditModal(false)} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Annuler</button>
                    <button onClick={props.handleEditService} className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-95 transition">Sauvgarder</button>
                </div>
            </div>
        </div>
    )
}
