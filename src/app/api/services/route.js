import { createClient } from '@/lib/supabase/server'

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
        const { data, error } = await supabase.from('service').select('*').order('service_id', { ascending: false })
        if (error) {
            console.error('Error fetching services:', error)
            return jsonResponse({ error: 'Error fetching services', details: serializeError(error) }, 500)
        }
        return jsonResponse({ services: data || [] })
    } catch (err) {
        console.error('Services GET error:', err)
        return jsonResponse({ error: 'Server error', details: serializeError(err) }, 500)
    }
}

export async function POST(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()
        const payload = body.data || body
        const { data, error } = await supabase.from('service').insert(payload).select()
        if (error) {
            console.error('Error inserting service:', error)
            return jsonResponse({ error: 'Insert error', details: serializeError(error) }, 500)
        }
        return jsonResponse({ services: data || [] }, 201)
    } catch (err) {
        console.error('Services POST error:', err)
        return jsonResponse({ error: 'Server error', details: serializeError(err) }, 500)
    }
}

export async function PATCH(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()

        if (body.action === 'update') {
            const { service_id, updates } = body
            if (!service_id) return jsonResponse({ error: 'service_id required' }, 400)
            const { data, error } = await supabase.from('service').update(updates).eq('service_id', service_id).select().single()
            if (error) {
                console.error('Error updating service:', error)
                return jsonResponse({ error: 'Update error', details: serializeError(error) }, 500)
            }
            return jsonResponse({ service: data })
        }

        return jsonResponse({ error: 'Unknown action' }, 400)
    } catch (err) {
        console.error('Services PATCH error:', err)
        return jsonResponse({ error: 'Server error', details: serializeError(err) }, 500)
    }
}

export async function DELETE(req) {
    try {
        const supabase = await createClient()
        const body = await req.json()
        const { service_id } = body
        if (!service_id) return jsonResponse({ error: 'service_id required' }, 400)
        const { error } = await supabase.from('service').delete().eq('service_id', service_id)
        if (error) {
            console.error('Error deleting service:', error)
            return jsonResponse({ error: 'Delete error', details: serializeError(error) }, 500)
        }
        return jsonResponse({ ok: true })
    } catch (err) {
        console.error('Services DELETE error:', err)
        return jsonResponse({ error: 'Server error', details: serializeError(err) }, 500)
    }
}
