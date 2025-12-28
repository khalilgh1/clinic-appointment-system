import { createClient } from '@/lib/supabase/server'

const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

async function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })
}

function serializeError(e) {
    try {
        return JSON.parse(JSON.stringify(e))
    } catch (err) {
        return String(e)
    }
}

function normalizeTime(value) {
    if (!value) return ''
    if (typeof value === 'string') {
        return value.length >= 5 ? value.substring(0, 5) : value
    }
    if (value instanceof Date) {
        return value.toISOString().substring(11, 16)
    }
    const normalized = String(value)
    return normalized.length >= 5 ? normalized.substring(0, 5) : normalized
}

function normalizeDate(value) {
    if (!value) return ''
    if (typeof value === 'string') {
        return value.split('T')[0]
    }
    if (value instanceof Date) {
        return value.toISOString().split('T')[0]
    }
    return String(value).split('T')[0]
}

export async function GET() {
    try {
        const supabase = await createClient()
        const { data: doctorsData, error: doctorsError } = await supabase.from('doctor').select('*')
        const { data: schedulesData, error: schedulesError } = await supabase.from('doctor_schedule').select('*')
        const { data: exceptionsData, error: exceptionsError } = await supabase.from('doctor_exception').select('*')

        if (doctorsError) {
            console.error('Error fetching doctors:', doctorsError)
            return jsonResponse({ error: 'Error fetching doctors', details: serializeError(doctorsError) }, 500)
        }

        if (exceptionsError) {
            console.error('Error fetching doctor exceptions:', exceptionsError)
        }

        const scheduleMap = {}
            ; (schedulesData || []).forEach((s) => {
                const did = s.doctor_id
                const idx = Number(s.day_of_week)
                const dayName = dayNames[idx] || String(s.day_of_week)
                const start = normalizeTime(s.start_time)
                const end = normalizeTime(s.end_time)
                if (!scheduleMap[did]) scheduleMap[did] = {}
                scheduleMap[did][dayName] = { start, end }
            })

        const exceptionMap = {}
            ; (exceptionsData || []).forEach((ex) => {
                const doctorId = ex.doctor_id
                if (!exceptionMap[doctorId]) exceptionMap[doctorId] = []
                exceptionMap[doctorId].push({
                    exception_id: ex.exception_id,
                    date: normalizeDate(ex.date),
                    start_time: normalizeTime(ex.start_time),
                    end_time: normalizeTime(ex.end_time),
                    is_available: ex.is_available ?? false,
                })
            })

        const merged = (doctorsData || []).map((d) => ({
            ...d,
            schedule: scheduleMap[d.doctor_id] || {},
            workDays: scheduleMap[d.doctor_id] ? Object.keys(scheduleMap[d.doctor_id]).join(', ') : 'Aucun jour de travail défini',
            exceptions: exceptionMap[d.doctor_id] || [],
        }))

        return jsonResponse({ doctors: merged })
    } catch (err) {
        return jsonResponse({ error: 'Server error', details: String(err) }, 500)
    }
}

export async function POST(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()
        const toInsert = body.data || body
        const { data: inserted, error } = await supabase.from('doctor').insert(toInsert).select().single()
        if (error) {
            console.error('Doctor insert error:', error)
            return jsonResponse({ error: 'Insert error', details: serializeError(error) }, 500)
        }
        return jsonResponse({ doctor: inserted }, 201)
    } catch (err) {
        return jsonResponse({ error: 'Server error', details: String(err) }, 500)
    }
}

export async function PATCH(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()

        // update doctor
        if (body.action === 'update') {
            const { doctor_id, updates } = body
            if (!doctor_id) return jsonResponse({ error: 'doctor_id required' }, 400)
            const { data: updated, error } = await supabase.from('doctor').update(updates).eq('doctor_id', doctor_id).select().single()
            if (error) {
                console.error('Doctor update error:', error)
                return jsonResponse({ error: 'Update error', details: serializeError(error) }, 500)
            }
            return jsonResponse({ doctor: updated })
        }

        // schedule management: replace schedules for doctor
        if (body.action === 'schedule') {
            const { doctor_id, inserts } = body
            if (!doctor_id) return jsonResponse({ error: 'doctor_id required' }, 400)
            // delete existing
            const { error: delError } = await supabase.from('doctor_schedule').delete().eq('doctor_id', doctor_id)
            if (delError) {
                console.error('Delete schedules error:', delError)
                return jsonResponse({ error: 'Delete schedules error', details: serializeError(delError) }, 500)
            }
            if (Array.isArray(inserts) && inserts.length > 0) {
                const { data: inserted, error: insertError } = await supabase.from('doctor_schedule').insert(inserts).select()
                if (insertError) {
                    console.error('Insert schedules error:', insertError)
                    return jsonResponse({ error: 'Insert schedules error', details: serializeError(insertError) }, 500)
                }
                return jsonResponse({ schedules: inserted })
            }
            return jsonResponse({ schedules: [] })
        }

        if (body.action === 'exceptions') {
            const { doctor_id, inserts } = body
            if (!doctor_id) return jsonResponse({ error: 'doctor_id required' }, 400)
            const { error: delError } = await supabase.from('doctor_exception').delete().eq('doctor_id', doctor_id)
            if (delError) {
                console.error('Delete exceptions error:', delError)
                return jsonResponse({ error: 'Delete exceptions error', details: serializeError(delError) }, 500)
            }
            if (Array.isArray(inserts) && inserts.length > 0) {
                const { data: inserted, error: insertError } = await supabase.from('doctor_exception').insert(inserts).select()
                if (insertError) {
                    console.error('Insert exceptions error:', insertError)
                    return jsonResponse({ error: 'Insert exceptions error', details: serializeError(insertError) }, 500)
                }
                return jsonResponse({ exceptions: inserted })
            }
            return jsonResponse({ exceptions: [] })
        }

        return jsonResponse({ error: 'Unknown action' }, 400)
    } catch (err) {
        console.error('Doctors route error:', err)
        return jsonResponse({ error: 'Server error', details: serializeError(err) }, 500)
    }
}

export async function DELETE(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()
        const { doctor_id } = body
        if (!doctor_id) return jsonResponse({ error: 'doctor_id required' }, 400)

        // delete schedules first
        const { error: delSchedulesError } = await supabase.from('doctor_schedule').delete().eq('doctor_id', doctor_id)
        if (delSchedulesError) return jsonResponse({ error: 'Error deleting schedules', details: delSchedulesError }, 500)

        const { error: delError } = await supabase.from('doctor').delete().eq('doctor_id', doctor_id)
        if (delError) return jsonResponse({ error: 'Error deleting doctor', details: delError }, 500)

        return jsonResponse({ ok: true })
    } catch (err) {
        return jsonResponse({ error: 'Server error', details: String(err) }, 500)
    }
}
