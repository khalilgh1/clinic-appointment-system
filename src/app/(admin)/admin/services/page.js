"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client';
import AddServiceModal from '@/components/modals/AddServiceModal'
import EditServiceModal from '@/components/modals/EditServiceModal'
import { Plus, Edit, Trash2 } from 'lucide-react'





export default function Services() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        duration_min: 0,
        is_active: true,
        exams: '',
        equipments: '',
        advantages: '',
        procedures: ''
    })

    useEffect(() => {
        fetchServices()
    }, [])

    async function fetchServices() {
        setLoading(true)
        setError(null)
        try {
            const sb = supabase()
            const { data, error } = await sb.from('service').select('*').order('service_id', { ascending: false })
            if (error) throw error
            setServices(data || [])
        } catch (err) {
            setError(err.message || String(err))
        } finally {
            setLoading(false)
        }
    }

    function parseListField(value) {
        if (!value) return []
        if (Array.isArray(value)) return value
        if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean)
        return []
    }

    async function handleAddService() {
        const sb = supabase()
        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price) || 0,
            duration_min: Number(formData.duration_min) || 0,
            is_active: !!formData.is_active,
            exams: JSON.stringify(parseListField(formData.exams)),
            equipments: JSON.stringify(parseListField(formData.equipments)),
            advantages: JSON.stringify(parseListField(formData.advantages)),
            procedures: JSON.stringify(parseListField(formData.procedures))
        }
        try {
            setLoading(true)
            const { error } = await sb.from('service').insert(payload)
            if (error) throw error
            setShowAddModal(false)
            setFormData({ name: '', description: '', price: 0, duration_min: 0, is_active: true, exams: '', equipments: '', advantages: '', procedures: '' })
            fetchServices()
        } catch (err) {
            setError(err.message || String(err))
        } finally {
            setLoading(false)
        }
    }

    async function handleEditService() {
        if (!selectedService) return
        const sb = supabase()
        const payload = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price) || 0,
            duration_min: Number(formData.duration_min) || 0,
            is_active: !!formData.is_active,
            exams: JSON.stringify(parseListField(formData.exams)),
            equipments: JSON.stringify(parseListField(formData.equipments)),
            advantages: JSON.stringify(parseListField(formData.advantages)),
            procedures: JSON.stringify(parseListField(formData.procedures))
        }
        try {
            setLoading(true)
            const { error } = await sb.from('service').update(payload).eq('service_id', selectedService.service_id)
            if (error) throw error
            setShowEditModal(false)
            setSelectedService(null)
            fetchServices()
        } catch (err) {
            setError(err.message || String(err))
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteService(id) {
        if (!confirm('Are you sure you want to delete this service?')) return
        try {
            setLoading(true)
            const sb = supabase()
            const { error } = await sb.from('service').delete().eq('service_id', id)
            if (error) throw error
            fetchServices()
        } catch (err) {
            setError(err.message || String(err))
        } finally {
            setLoading(false)
        }
    }

    function toArrayField(value) {
        if (!value) return []
        if (Array.isArray(value)) return value
        if (typeof value === 'string') {
            // try parse JSON first
            try {
                const parsed = JSON.parse(value)
                if (Array.isArray(parsed)) return parsed
            } catch (e) {
                // ignore
            }
            return value.split(',').map(s => s.trim()).filter(Boolean)
        }
        return []
    }

    function openEditModal(service) {
        setSelectedService(service)
        setFormData({
            name: service.name || '',
            description: service.description || '',
            price: service.price ?? 0,
            duration_min: service.duration_min ?? 0,
            is_active: !!service.is_active,
            exams: toArrayField(service.exams),
            equipments: toArrayField(service.equipments),
            advantages: toArrayField(service.advantages),
            procedures: toArrayField(service.procedures)
        })
        setShowEditModal(true)
    }

    function openAddModal() {
        // Clear any selection and reset form to defaults before opening Add modal
        setSelectedService(null)
        setFormData({
            name: '',
            description: '',
            price: 0,
            duration_min: 0,
            is_active: true,
            exams: '',
            equipments: '',
            advantages: '',
            procedures: ''
        })
        setShowAddModal(true)
    }

    function BadgeList({ items = [], maxVisible = 5, variant = 'gray' }) {
        const [expanded, setExpanded] = useState(false)
        const colorClasses = {
            gray: 'bg-gray-100 text-gray-800',
            blue: 'bg-blue-50 text-blue-800',
            green: 'bg-green-50 text-green-800',
            yellow: 'bg-yellow-50 text-yellow-800',
            purple: 'bg-purple-50 text-purple-800'
        }

        if (!items || items.length === 0) return <div className="text-sm text-gray-400">—</div>

        const visible = expanded ? items : items.slice(0, maxVisible)

        return (
            <div className="flex flex-wrap items-center gap-2">
                {visible.map((it, i) => (
                    <span key={i} title={it} className={`text-sm ${colorClasses[variant] || colorClasses.gray} px-2 py-1 rounded-md max-w-xs truncate`}>{it}</span>
                ))}

                {items.length > maxVisible && (
                    !expanded
                        ? <button onClick={() => setExpanded(true)} className="text-xs text-primary underline ml-1">+{items.length - maxVisible} more</button>
                        : <button onClick={() => setExpanded(false)} className="text-xs text-gray-500 underline ml-1">show less</button>
                )}
            </div>
        )
    }


    function ServicesTable(props) {
        return (<table className="w-full table-auto">
            <thead>
                <tr className="text-left text-sm text-gray-600">
                    <th className="p-3">Nom</th>
                    <th className="p-3">Prix</th>
                    <th className="p-3">Durée</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.services.map(s => <tr key={s.service_id} className="border-t">
                    <td className="p-3 align-top">
                        <div className="font-medium">{s.name}</div>
                        <div className="text-sm text-gray-500">{s.description}</div>

                        <div className="mt-3 space-y-2">
                            <div className="flex items-start gap-3">
                                <div className="text-xs font-medium text-gray-600 w-24">Équipements:</div>
                                <div className="flex-1"><BadgeList items={parseListField(s.equipments)} variant="blue" /></div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-xs font-medium text-gray-600 w-24">Procédures:</div>
                                <div className="flex-1"><BadgeList items={parseListField(s.procedures)} variant="green" /></div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-xs font-medium text-gray-600 w-24">Avantages:</div>
                                <div className="flex-1"><BadgeList items={parseListField(s.advantages)} variant="yellow" /></div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-xs font-medium text-gray-600 w-24">Examens:</div>
                                <div className="flex-1"><BadgeList items={parseListField(s.exams)} variant="purple" /></div>
                            </div>
                        </div>
                    </td>
                    <td className="p-3 align-top">{s.price} DA</td>
                    <td className="p-3 align-top">{s.duration_min} min</td>
                    <td className="p-3 align-top">
                        {s.is_active ? <span className="px-2 py-1 rounded text-white bg-secondary-dark">Active</span> : <span className="px-2 py-1 rounded text-white bg-gray-400">Inactive</span>}
                    </td>
                    <td className="p-3 align-top">
                        <div className="flex gap-2">
                            <button onClick={() => openEditModal(s)} className="flex items-center gap-2 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">
                                <Edit size={14} /> Modifier
                            </button>
                            <button onClick={() => handleDeleteService(s.service_id)} className="flex items-center gap-2 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 text-error">
                                <Trash2 size={14} /> Supprimer
                            </button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>);
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Services</h1>
                <div className="flex items-center gap-3">
                    <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer">
                        <Plus size={16} /> Ajouter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
                {loading && <div className="py-6 text-center">Loading...</div>}
                {error && <div className="text-error mb-3">{error}</div>}

                {!loading && services.length === 0 && <div className="py-6 text-center text-gray-600">No services yet.</div>}

                {!loading && services.length > 0 && (
                    <div className="overflow-x-auto">
                        <ServicesTable services={services}></ServicesTable>
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddServiceModal
                    setShowAddModal={setShowAddModal}
                    formData={formData}
                    setFormData={setFormData}
                    handleAddService={handleAddService}
                />
            )}

            {showEditModal && (
                <EditServiceModal
                    setShowEditModal={setShowEditModal}
                    formData={formData}
                    setFormData={setFormData}
                    handleEditService={handleEditService}
                />
            )}
        </div>
    )
}