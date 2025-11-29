"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { supabase as createClient } from "@/lib/supabase/client"
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
    { border: "border-[#C7DEFF]", bg: "bg-[#F5F9FF]", text: "text-[#1A4C81]" },
    { border: "border-[#F8D8AA]", bg: "bg-[#FFF9F0]", text: "text-[#A16106]" },
    { border: "border-[#B8F0C5]", bg: "bg-[#F1FFF6]", text: "text-[#0F8A3D]" },
    { border: "border-[#FFC7C7]", bg: "bg-[#FFF5F5]", text: "text-[#B42318]" },
]

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

export default function Appointment() {
    const sb = useMemo(() => createClient(), [])
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [doctorFilter, setDoctorFilter] = useState("")
    const [serviceFilter, setServiceFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [doctors, setDoctors] = useState([])
    const [services, setServices] = useState([])

    const fetchAppointments = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error } = await sb.from("appointment").select("*")
            if (error) throw error
            setAppointments(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error loading appointments", err)
        } finally {
            setLoading(false)
        }
    }, [sb])

    const fetchDoctors = useCallback(async () => {
        try {
            const { data, error } = await sb.from("doctor").select("doctor_id, name")
            if (error) throw error
            setDoctors(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error loading doctors", err)
        }
    }, [sb])

    const fetchServices = useCallback(async () => {
        try {
            const { data, error } = await sb.from("service").select("service_id, name")
            if (error) throw error
            setServices(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Error loading services", err)
        }
    }, [sb])

    useEffect(() => {
        fetchAppointments()
        fetchDoctors()
        fetchServices()
    }, [fetchAppointments])

    // Re-fetch when filters change so the list is fresh after a selection
    useEffect(() => {
        fetchAppointments()
    }, [doctorFilter, serviceFilter, dateFilter, fetchAppointments])

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

    async function updateStatus(id, newStatus) {
        try {
            const { error } = await sb.from("appointment").update({ status: newStatus }).eq("appointment_id", id)
            if (error) throw error
            setAppointments((prev) => prev.map((p) => (p.appointment_id === id ? { ...p, status: newStatus } : p)))
        } catch (err) {
            console.error("Failed to update status", err)
            alert("Failed to update status")
        }
    }

    async function removeAppointment(id) {
        if (!confirm("Delete this appointment?")) return
        try {
            const { error } = await sb.from("appointment").delete().eq("appointment_id", id)
            if (error) throw error
            setAppointments((prev) => prev.filter((p) => p.appointment_id !== id))
        } catch (err) {
            console.error("Failed to delete", err)
            alert("Failed to delete appointment")
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Appointments</h1>
                    <p className="text-sm text-gray-600">Manage clinic appointments — view, filter and modify records.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
                {statusCards.map((card, index) => {
                    const isActive = statusFilter === card.value
                    const count = card.value === "" ? appointments.length : statusCounts[card.value] || 0

                    return (
                        <button
                            key={`${card.value || "all"}-${index}`}
                            type="button"
                            onClick={() => setStatusFilter(card.value)}
                            className={`rounded-2xl border ${card.border} ${card.bg} ${card.text} px-5 py-4 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${isActive ? "ring-2 ring-offset-2 ring-secondary" : "ring-1 ring-transparent"
                                }`}
                        >
                            <span className={`text-sm font-medium ${card.value === "" ? "opacity-90" : "opacity-80"}`}>{card.label}</span>
                            <span className="text-2xl font-semibold mt-2 ml-3">{count}</span>
                            <span className="text-xs opacity-80 mt-1 block">{card.description}</span>
                        </button>
                    )
                })}
            </div>

            <div className="w-full mb-4 h-max">
                <div className="bg-white border-gray-400 rounded-2xl p-10 shadow-sm h-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-"><Funnel size={20}/></div>
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

            <div className="overflow-auto bg-white rounded shadow-sm">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
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
                            filtered.map((a) => (
                                <tr key={a.appointment_id} className="border-t border-gray-400">
                                    <td className="p-3">{a.appointment_id}</td>
                                    <td className="p-3">
                                        <div className="font-medium">
                                            {a.patient_first_name} {a.patient_last_name}
                                        </div>
                                        <div className="text-sm text-gray-500">{a.patient_email}</div>
                                    </td>
                                    <td className="p-3">{a.patient_phone}</td>
                                    <td className="p-3">{a.doctor_id ?? "-"}</td>
                                    <td className="p-3">{a.service_id ?? "-"}</td>
                                    <td className="p-3">{a.start_time ? new Date(a.start_time).toISOString().split("T")[0] : "-"}</td>
                                    <td className="p-3">{a.end_time ? new Date(a.end_time).toISOString().split("T")[0] : "-"}</td>
                                    <td className="p-3">
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
        </div>
    )
}