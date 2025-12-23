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

export async function GET() {
    try {
        const supabase = await createClient()
        const { data: doctorsData, error: doctorsError } = await supabase.from('doctor').select('*')
        const { data: schedulesData, error: schedulesError } = await supabase.from('doctor_schedule').select('*')

        if (doctorsError) {
            console.error('Error fetching doctors:', doctorsError)
            return jsonResponse({ error: 'Error fetching doctors', details: serializeError(doctorsError) }, 500)
        }

        const scheduleMap = {}
            ; (schedulesData || []).forEach((s) => {
                const did = s.doctor_id
                const idx = Number(s.day_of_week)
                const dayName = dayNames[idx] || String(s.day_of_week)
                const formatTime = (t) => (t ? String(t).substring(0, 5) : '')
                const start = formatTime(s.start_time)
                const end = formatTime(s.end_time)
                if (!scheduleMap[did]) scheduleMap[did] = {}
                scheduleMap[did][dayName] = { start, end }
            })

        const merged = (doctorsData || []).map((d) => ({
            ...d,
            schedule: scheduleMap[d.doctor_id] || {},
            workDays: scheduleMap[d.doctor_id] ? Object.keys(scheduleMap[d.doctor_id]).join(', ') : 'Aucun jour de travail défini',
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
