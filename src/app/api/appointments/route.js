import { createClient } from '@/lib/supabase/server'

function serializeError(e) {
    try {
        return JSON.parse(JSON.stringify(e))
    } catch (err) {
        return { message: String(e) }
    }
}

export async function GET() {
    try {
        const sb = await createClient()
        const { data, error } = await sb.from('appointment').select('*')
        if (error) {
            console.error('Error fetching appointments', error)
            return new Response(JSON.stringify({ error: serializeError(error) }), { status: 500 })
        }
        return new Response(JSON.stringify({ appointments: Array.isArray(data) ? data : [] }), { status: 200 })
    } catch (err) {
        console.error('Server GET /api/appointments error', err)
        return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json()
        const { action } = body || {}
        const sb = await createClient()

        // coerce numeric id strings into numbers to avoid type mismatches
        const coerceId = (id) => (typeof id === 'string' && /^\d+$/.test(id) ? Number(id) : id)

        if (action === 'update-status') {
            const { appointment_id, status } = body
            const id = coerceId(appointment_id)

            const { data, error } = await sb.from('appointment').update({ status }).eq('appointment_id', id).select()
            if (error) {
                console.error('Error updating appointment status', error)
                return new Response(JSON.stringify({ error: serializeError(error) }), { status: 500 })
            }
            if (!data || data.length === 0) {
                console.warn('No appointment updated (status)', { appointment_id, id })
                return new Response(JSON.stringify({ error: 'No appointment updated' }), { status: 404 })
            }
            return new Response(JSON.stringify({ success: true, updated: data }), { status: 200 })
        }

        if (action === 'update') {
            const { appointment_id, changes } = body
            const id = coerceId(appointment_id)
            const { data, error } = await sb.from('appointment').update(changes).eq('appointment_id', id).select()
            if (error) {
                console.error('Error updating appointment', error)
                return new Response(JSON.stringify({ error: serializeError(error) }), { status: 500 })
            }
            if (!data || data.length === 0) {
                console.warn('No appointment updated (update)', { appointment_id, id })
                return new Response(JSON.stringify({ error: 'No appointment updated' }), { status: 404 })
            }
            return new Response(JSON.stringify({ success: true, updated: data }), { status: 200 })
        }

        return new Response(JSON.stringify({ error: 'Unknown patch action' }), { status: 400 })
    } catch (err) {
        console.error('Server PATCH /api/appointments error', err)
        return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const sb = await createClient()
        const body = await req.json()
        const { appointment_id } = body
        if (!appointment_id) return new Response(JSON.stringify({ error: 'appointment_id required' }), { status: 400 })

        const {error} = await sb.from('appointment').delete().eq('appointment_id', appointment_id)
        //let's try to fetch that appointment
        const {data} = await sb.from('appointment').select('*').eq('appointment_id', appointment_id)
        if (error) {
            console.error('Error deleting appointment', error)
            return new Response(JSON.stringify({ error: serializeError(error) }), { status: 500 })
        }

        return new Response(JSON.stringify({ success: true, given_id: {appointment_id}  }), { status: 200 })
    } catch (err) {
        console.error('Server DELETE /api/appointments error', err)
        return new Response(JSON.stringify({ error: String(err)}), { status: 500 })
    }
}
