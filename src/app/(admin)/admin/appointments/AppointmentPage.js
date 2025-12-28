"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import ConfirmModal from '@/components/modals/ConfirmModal'
import ErrorModal from '@/components/modals/ErrorModal'
import { Funnel } from "lucide-react"





const STATUS_LABELS = {
    scheduled: "Programmé",
    programmed: "Programmé",
    pending: "Programmé",
    in_progress: "En cours",
    ongoing: "En cours",
    progress: "En cours",
    completed: "Terminé",
    done: "Terminé",
    finished: "Terminé",
    cancelled: "Annulé",
    canceled: "Annulé",
}

const STATUS_DESCRIPTIONS = {
    scheduled: "À venir",
    programmed: "À venir",
    pending: "À venir",
    in_progress: "Actuellement en cours",
    ongoing: "Actuellement en cours",
    progress: "Actuellement en cours",
    completed: "Consultation finalisée",
    done: "Consultation finalisée",
    finished: "Consultation finalisée",
    cancelled: "Rendez-vous annulé",
    canceled: "Rendez-vous annulé",
}

const STATUS_PALETTE = [
    { border: "border-[#C7DEFF]", bg: "bg-[#F5F9FF]", text: "text-[#1A4C81]", ring: "ring-[#C7DEFF]" },
    { border: "border-[#F8D8AA]", bg: "bg-[#FFF9F0]", text: "text-[#A16106]", ring: "ring-[#F8D8AA]" },
    { border: "border-[#B8F0C5]", bg: "bg-[#F1FFF6]", text: "text-[#0F8A3D]", ring: "ring-[#B8F0C5]" },
    { border: "border-[#FFC7C7]", bg: "bg-[#FFF5F5]", text: "text-[#B42318]", ring: "ring-[#FFC7C7]" },
]

const PAGE_SIZE = 10

const normalizeStatus = (value) => (value ?? "").toString().toLowerCase()

const formatStatus = (value) => {
    if (!value) return "Tous"
    const key = normalizeStatus(value)
    if (STATUS_LABELS[key]) return STATUS_LABELS[key]
    return value
        .toString()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function AppointmentPage() {
    // No client-side Supabase here — all appointment, doctor and service fetching
    // is performed via server routes under `/api/*`.
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [doctorFilter, setDoctorFilter] = useState("")
    const [serviceFilter, setServiceFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [doctors, setDoctors] = useState([])
    const [services, setServices] = useState([])
    const [page, setPage] = useState(1)
    const [pendingDeleteAppointment, setPendingDeleteAppointment] = useState(null)

    const fetchAppointments = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/appointments')
            const json = await res.json()
            if (!res.ok) throw json.error || new Error('Failed to fetch appointments')
            setAppointments(Array.isArray(json.appointments) ? json.appointments : [])
        } catch (err) {
            console.error("Error loading appointments", err)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchDoctors = useCallback(async () => {
        try {
            const res = await fetch('/api/doctors')
            const json = await res.json()
            if (!res.ok) throw json.error || new Error('Failed to fetch doctors')
            const doctorsData = json.doctors ?? json.data ?? json
            setDoctors(Array.isArray(doctorsData) ? doctorsData : [])
        } catch (err) {
            console.error("Error loading doctors", err)
        }
    }, [])

    const fetchServices = useCallback(async () => {
        try {
            const res = await fetch('/api/services')
            const json = await res.json()
            if (!res.ok) throw json.error || new Error('Failed to fetch services')
            const servicesData = json.services ?? json.data ?? json
            setServices(Array.isArray(servicesData) ? servicesData : [])
        } catch (err) {
            console.error("Error loading services", err)
        }
    }, [])

    useEffect(() => {
        fetchAppointments()
        fetchDoctors()
        fetchServices()
    }, [fetchAppointments, fetchDoctors, fetchServices])

    const doctorMap = useMemo(() => {
        const m = new Map()
        ;(doctors || []).forEach((d) => {
            const key = String(d.doctor_id ?? d.id ?? '')
            m.set(key, d)
        })
        return m
    }, [doctors])

    // Re-fetch when filters change so the list is fresh after a selection
    useEffect(() => {
        fetchAppointments()
    }, [doctorFilter, serviceFilter, dateFilter, fetchAppointments])

    // Reset paging whenever filters or search change
    useEffect(() => {
        setPage(1)
    }, [search, statusFilter, doctorFilter, serviceFilter, dateFilter])

    const statuses = useMemo(() => {
        const set = new Set(appointments.map((a) => a.status).filter(Boolean))
        return ["", ...Array.from(set)]
    }, [appointments])

    const statusCounts = useMemo(() => {
        return appointments.reduce((acc, appointment) => {
            const key = appointment.status ?? ""
            acc[key] = (acc[key] || 0) + 1
            return acc
        }, {})
    }, [appointments])

    const statusCards = useMemo(() => {
        const dynamicStatuses = statuses.filter((status) => status !== "")

        return [
            {
                value: "",
                label: "Tous",
                description: "Tous les rendez-vous",
                border: "border-transparent",
                bg: "bg-primary",
                text: "text-white",
                ring: "ring-[#1A4C81]",
            },
            ...dynamicStatuses.map((value, index) => {
                const palette = STATUS_PALETTE[index % STATUS_PALETTE.length]
                const key = normalizeStatus(value)

                return {
                    value,
                    label: formatStatus(value),
                    description: STATUS_DESCRIPTIONS[key] ?? "Filtrer par statut",
                    ...palette,
                }
            }),
        ]
    }, [statuses])

    const filtered = useMemo(() => {
        return appointments.filter((a) => {
            const q = search.trim().toLowerCase()
            const matchesSearch =
                !q ||
                `${a.patient_first_name || ""} ${a.patient_last_name || ""}`.toLowerCase().includes(q) ||
                (a.patient_email || "").toLowerCase().includes(q) ||
                (a.patient_phone || "").toLowerCase().includes(q)

            const matchesStatus = !statusFilter || a.status === statusFilter
            const matchesDoctor = !doctorFilter || String(a.doctor_id) === String(doctorFilter)
            const matchesService = !serviceFilter || String(a.service_id) === String(serviceFilter)
            const matchesDate = !dateFilter || (a.start_time && new Date(a.start_time).toISOString().split("T")[0] === dateFilter)

            return matchesSearch && matchesStatus && matchesDoctor && matchesService && matchesDate
        })
    }, [appointments, search, statusFilter, doctorFilter, serviceFilter, dateFilter])

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    }, [filtered])

    const displayed = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE
        return filtered.slice(start, start + PAGE_SIZE)
    }, [filtered, page])

    // Compute the middle pages (excluding first and last) and ellipses markers
    const middlePages = useMemo(() => {
        const pages = []
        if (totalPages <= 7) {
            for (let i = 2; i <= Math.max(1, totalPages - 1); i++) pages.push(i)
            return pages
        }

        const left = Math.max(2, page - 1)
        const right = Math.min(totalPages - 1, page + 1)

        if (left > 2) pages.push("left-ellipsis")

        for (let i = left; i <= right; i++) pages.push(i)

        if (right < totalPages - 1) pages.push("right-ellipsis")

        return pages
    }, [page, totalPages])

    const [errorModal, setErrorModal] = useState(null)

    async function updateStatus(id, newStatus) {
        try {
            const res = await fetch('/api/appointments', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update-status', appointment_id: id, status: newStatus }),
            })
            const json = await res.json()
            if (!res.ok) throw json.error || new Error('Failed to update status')
            setAppointments((prev) => prev.map((p) => (p.appointment_id === id ? { ...p, status: newStatus } : p)))
        } catch (err) {
            console.error("Failed to update status", err)
            setErrorModal({ title: 'Erreur', message: (err && err.message) || String(err) })
        }
    }

    function removeAppointment(id) {
        const appt = appointments.find(a => a.appointment_id === id) || {}
        setPendingDeleteAppointment({ appointment_id: id, label: `${appt.patient_first_name || ''} ${appt.patient_last_name || ''}`.trim() })
    }

    async function performDeleteAppointment() {
        if (!pendingDeleteAppointment) return
        const id = pendingDeleteAppointment.appointment_id
        try {
            const res = await fetch('/api/appointments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ appointment_id: id }),
            })
            const json = await res.json()
            if (!res.ok) throw json.error || new Error('Failed to delete')
            setAppointments((prev) => prev.filter((p) => p.appointment_id !== id))
        } catch (err) {
            console.error("Failed to delete", err)
            setErrorModal({ title: 'Erreur', message: (err && err.message) || String(err) })
        } finally {
            setPendingDeleteAppointment(null)
        }
    }

    return (
        <div className="p-6">
            {/* main title */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Appointments</h1>
                    <p className="text-sm text-gray-600">Manage clinic appointments — view, filter and modify records.</p>
                </div>
            </div>


            {/* filter by status cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
                {statusCards.map((card, index) => {
                    const isActive = statusFilter === card.value
                    const count = card.value === "" ? appointments.length : statusCounts[card.value] || 0

                    return (
                        <button
                            key={`${card.value || "all"}-${index}`}
                            type="button"
                            onClick={() => setStatusFilter(card.value)}
                            className={
                                `rounded-2xl border ${card.border} ${card.bg} ${card.text}
                             px-5 py-4 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary
                                                            ${isActive ? `ring-2 ring-offset-2 ${card.ring}` : "ring-1 ring-transparent"}
                                                                `
                            }
                        >
                            <span className={`text-sm font-medium ${card.value === "" ? "opacity-90" : "opacity-80"}`}>{card.label}</span>
                            <span className="text-2xl font-semibold mt-2 ml-3">{count}</span>
                            <span className="text-xs opacity-80 mt-1 block">{card.description}</span>
                        </button>
                    )
                })}
            </div>



            {/* advanced filters */}
            <div className="w-full mb-4 h-max">
                <div className="bg-white border-gray-400 rounded-2xl p-10 shadow-sm h-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-"><Funnel size={20} color="#064045" /></div>
                            <div>
                                <div className="text-sm font-medium">Filtres avancés</div>
                                <div className="text-xs text-gray-500">Affinez votre recherche</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Médecin</label>
                            <select
                                className="border border-gray-400 rounded px-3 py-2 w-full"
                                value={doctorFilter}
                                onChange={(e) => {
                                    setDoctorFilter(e.target.value)
                                    fetchAppointments()
                                }}
                            >
                                <option value="">—</option>
                                {doctors.map((d) => (
                                    <option key={d.doctor_id} value={d.doctor_id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Service</label>
                            <select
                                className="border border-gray-400 rounded px-3 py-2 w-full"
                                value={serviceFilter}
                                onChange={(e) => {
                                    setServiceFilter(e.target.value)
                                    fetchAppointments()
                                }}
                            >
                                <option value="">—</option>
                                {services.map((s) => (
                                    <option key={s.service_id} value={s.service_id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Date</label>
                            <input
                                type="date"
                                className="border border-gray-400 rounded px-3 py-2 w-full"
                                value={dateFilter}
                                onChange={(e) => {
                                    setDateFilter(e.target.value)
                                    fetchAppointments()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* appointments table */}
            <div className="overflow-auto bg-white rounded shadow-sm">
                <table className="min-w-full table-auto">
                    <thead className="bg-primary text-white rounded">
                        <tr>
                            <th className="text-left p-3">#</th>
                            <th className="text-left p-3">Patient</th>
                            <th className="text-left p-3">Contact</th>
                            <th className="text-left p-3">Doctor</th>
                            <th className="text-left p-3">Service</th>
                            <th className="text-left p-3">Start</th>
                            <th className="text-left p-3">End</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="p-6 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="p-6 text-center text-gray-500">
                                    No appointments found.
                                </td>
                            </tr>
                        ) : (
                            displayed.map((a) => (
                                <tr key={a.appointment_id} className="border-t border-gray-400 ">
                                    <td className="p-3">{a.appointment_id}</td>
                                    <td className="p-3 bg-gray-50">
                                        <div className="font-medium">
                                            {a.patient_first_name} {a.patient_last_name}
                                        </div>
                                        <div className="text-sm text-gray-500">{a.patient_email}</div>
                                    </td>
                                    <td className="p-3">{a.patient_phone}</td>
                                    <td className="p-3 bg-gray-50">
                                        {(() => {
                                            const doc = doctorMap.get(String(a.doctor_id ?? ""))
                                            if (!doc) return "-"
                                            if (doc.last_name) return doc.last_name
                                            if (doc.lastName) return doc.lastName
                                            if (doc.first_name && doc.name) {
                                                // if both first and full name exist, try to extract last token
                                                const parts = String(doc.name).trim().split(/\s+/)
                                                return parts.length > 0 ? parts[parts.length - 1] : doc.name
                                            }
                                            if (doc.name) {
                                                const parts = String(doc.name).trim().split(/\s+/)
                                                return parts.length > 0 ? parts[parts.length - 1] : doc.name
                                            }
                                            return String(a.doctor_id ?? "-")
                                        })()}
                                    </td>
                                    <td className="p-3">{a.service_id ?? "-"}</td>
                                    <td className="p-3 bg-gray-50">{a.start_time ? new Date(a.start_time).toISOString().split("T")[0] : "-"}</td>
                                    <td className="p-3">{a.end_time ? new Date(a.end_time).toISOString().split("T")[0] : "-"}</td>
                                    <td className="p-3 bg-gray-50">
                                        <select
                                            value={a.status || ""}
                                            onChange={(e) => updateStatus(a.appointment_id, e.target.value)}
                                            className="border border-gray-400 rounded px-2 py-1"
                                        >
                                            <option value="">(empty)</option>
                                            {statuses
                                                .filter((s) => s !== "")
                                                .map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                        </select>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-red-600 mr-3" onClick={() => removeAppointment(a.appointment_id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <nav className="w-90  bg-white border border-gray-200 rounded-2xl shadow-sm px-2 py-2 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-md text-lg hover:bg-gray-100 disabled:opacity-50"
                            aria-label="Previous page"
                        >
                            ‹
                        </button>

                        <div className="flex items-center gap-1 mx-1">
                            {/* First page - always visible */}
                            <button
                                type="button"
                                onClick={() => setPage(1)}
                                className={`min-w-[32px] w-8 h-8 flex items-center justify-center rounded-md text-sm transition ${page === 1 ? "bg-primary text-white shadow" : "bg-transparent hover:bg-gray-50 text-gray-700"}`}
                                aria-current={page === 1 ? "page" : undefined}
                            >
                                1
                            </button>

                            <div className="flex-1 flex items-center justify-center gap-1 overflow-hidden">
                                {middlePages.map((item, idx) => {
                                    if (item === "left-ellipsis" || item === "right-ellipsis") {
                                        return (
                                            <span key={`e-${idx}`} className="px-1 text-sm text-gray-400 select-none">
                                                …
                                            </span>
                                        )
                                    }

                                    const pn = item
                                    const isActive = pn === page
                                    return (
                                        <button
                                            key={pn}
                                            type="button"
                                            onClick={() => setPage(pn)}
                                            className={`min-w-[32px] w-8 h-8 flex items-center justify-center mx-0.5 rounded-md text-sm transition ${isActive ? "bg-primary text-white shadow" : "bg-transparent hover:bg-gray-50 text-gray-700"}`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {pn}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Last page - always visible */}
                            <button
                                type="button"
                                onClick={() => setPage(totalPages)}
                                className={`min-w-[32px] w-8 h-8 flex items-center justify-center rounded-md text-sm transition ${page === totalPages ? "bg-primary text-white shadow" : "bg-transparent hover:bg-gray-50 text-gray-700"}`}
                                aria-current={page === totalPages ? "page" : undefined}
                            >
                                {totalPages}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-md text-lg hover:bg-gray-100 disabled:opacity-50"
                            aria-label="Next page"
                        >
                            ›
                        </button>
                    </nav>
                </div>
            )}
            {pendingDeleteAppointment && (
                <ConfirmModal
                    title="Supprimer le rendez-vous"
                    message={`Voulez-vous vraiment supprimer le rendez-vous de "${pendingDeleteAppointment.label || ''}" ? Cette action est irréversible.`}
                    confirmLabel="Supprimer"
                    cancelLabel="Annuler"
                    onConfirm={performDeleteAppointment}
                    onCancel={() => setPendingDeleteAppointment(null)}
                />
            )}
            {errorModal && (
                <ErrorModal
                    title={errorModal.title}
                    message={errorModal.message}
                    onClose={() => setErrorModal(null)}
                />
            )}
        </div>
    )
}
