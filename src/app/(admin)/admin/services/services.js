"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client';
import AddServiceModal from '@/components/modals/AddServiceModal'
import EditServiceModal from '@/components/modals/EditServiceModal'
import ConfirmModal from '@/components/modals/ConfirmModal'
import { Plus, Edit, Trash2 } from 'lucide-react'





export default function ServicesPage() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [pendingDeleteService, setPendingDeleteService] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        duration_min: 0,
        is_active: true,
        exams: [],
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
    console.log(services[0]?.exams.fl)
    function parseListField(value) {
        if (!value) return []
        if (Array.isArray(value)) return value
        if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean)
        return []
    }

    function parseExamsField(value) {
        // Return array of objects: { category, items }
        if (!value) return []
        if (Array.isArray(value)) {
            return value.map(v => (typeof v === 'string' ? { category: '', items: v } : v))
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value)
                if (Array.isArray(parsed)) return parsed.map(v => (typeof v === 'string' ? { category: '', items: v } : v))
            } catch (e) {
                // fallback to comma-separated string items
            }
            return value.split(',').map(s => ({ category: '', items: s.trim() })).filter(Boolean)
        }
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
            exams: JSON.stringify(formData.exams || []),
            equipments: JSON.stringify(parseListField(formData.equipments)),
            advantages: JSON.stringify(parseListField(formData.advantages)),
            procedures: JSON.stringify(parseListField(formData.procedures))
        }
        try {
            setLoading(true)
            const { error } = await sb.from('service').insert(payload)
            if (error) throw error
            setShowAddModal(false)
            setFormData({ name: '', description: '', price: 0, duration_min: 0, is_active: true, exams: [], equipments: '', advantages: '', procedures: '' })
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
            exams: JSON.stringify(formData.exams || []),
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
        // show confirmation modal
        const svc = services.find(s => s.service_id === id) || { name: '' }
        setPendingDeleteService({ service_id: id, name: svc.name })
    }

    async function performDeleteService() {
        if (!pendingDeleteService) return
        const id = pendingDeleteService.service_id
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
            setPendingDeleteService(null)
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
            exams: [],
            equipments: '',
            advantages: '',
            procedures: ''
        })
        setShowAddModal(true)
    }

    const renderTextList = (value, fallback) => {
        const items = parseListField(value)
        if (!items.length) {
            return <p className="text-sm text-gray-400">{fallback}</p>
        }
        return (
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )
    }

    const renderExams = (value) => {
        const exams = parseExamsField(value)
        if (!exams.length) {
            return <p className="text-sm text-gray-400">Aucun examen</p>
        }
        return (
            <ul className="space-y-2 mt-1 text-sm text-gray-700">
                {exams.map((exam, index) => {
                    const items = Array.isArray(exam.items) ? exam.items : [exam.items]
                    const displayItems = items.filter(Boolean).join(', ')
                    return (
                        <li key={index}>
                            <span className="font-medium text-gray-800">{exam.category || 'Général'} :</span>
                            <span className="ml-1 text-gray-600">{displayItems || '—'}</span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    const statusBadge = (isActive) => (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
            {isActive ? 'Active' : 'Inactive'}
        </span>
    )

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="bg-gradient-to-br from-primary to-teal-800 text-white rounded-[28px] p-8 shadow-2xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-white/70">Nos Services</p>
                        <h1 className="text-3xl font-bold">Des services complets et personnalisés</h1>
                        <p className="mt-2 text-sm text-white/80 max-w-2xl">
                            Liste détaillée de chaque prestation : équipements, procédures, avantages et examens sont présentés pour faciliter le pilotage clinique.
                        </p>
                    </div>
                    <button onClick={openAddModal} className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold px-5 py-3 rounded-full shadow-lg">
                        <Plus size={18} /> Ajouter un service
                    </button>
                </header>

                <div className="space-y-6">
                    {loading && <div className="text-center text-gray-600 py-6">Chargement...</div>}
                    {error && <div className="text-center text-error py-4">{error}</div>}
                    {!loading && !error && services.length === 0 && <div className="text-center text-gray-600 py-6">Aucun service pour le moment.</div>}

                    {!loading && services.map((service) => (
                        <section key={service.service_id} className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-emerald-100">
                            <div className="bg-gradient-to-r from-primary to-teal-800 text-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">{service.name}</h2>
                                    <p className="text-sm text-white/80 mt-1 max-w-3xl">{service.description}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    {statusBadge(service.is_active)}
                                    <button onClick={() => openEditModal(service)} className="flex items-center gap-2 px-4 py-2 border border-white/40 rounded-full bg-white/10 text-white transition hover:bg-white/20">
                                        <Edit size={14} /> Modifier
                                    </button>
                                    <button onClick={() => handleDeleteService(service.service_id)} className="flex items-center gap-2 px-4 py-2 border border-white/40 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                                        <Trash2 size={14} /> Supprimer
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 py-8 bg-white">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-gray-600 border-separate border-spacing-y-4">
                                        <thead>
                                            <tr className="text-left text-xs uppercase tracking-[0.2em] text-gray-500">
                                                <th className="pb-3">Équipements</th>
                                                <th className="pb-3">Procédures</th>
                                                <th className="pb-3">Avantages</th>
                                                <th className="pb-3">Examens</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-top pt-3 pr-6">
                                                    {renderTextList(service.equipments, 'Pas d’équipement renseigné')}
                                                </td>
                                                <td className="align-top pt-3 pr-6">
                                                    {renderTextList(service.procedures, 'Pas de procédure définie')}
                                                </td>
                                                <td className="align-top pt-3 pr-6">
                                                    {renderTextList(service.advantages, 'Aucun avantage spécifié')}
                                                </td>
                                                <td className="align-top pt-3 pr-6">
                                                    {renderExams(service.exams)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
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
            {pendingDeleteService && (
                <ConfirmModal
                    title="Supprimer le service"
                    message={`Voulez-vous vraiment supprimer "${pendingDeleteService.name}" ? Cette action est irréversible.`}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                    onConfirm={performDeleteService}
                    onCancel={() => setPendingDeleteService(null)}
                />
            )}
        </div>
    )
}