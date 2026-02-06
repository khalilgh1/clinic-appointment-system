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

        // minimal query to keep Supabase connection alive
        const { data, error } = await supabase.from('service').select('service_id').limit(1)

        if (error) {
            console.error('Health-check supabase error:', error)
            return jsonResponse({ ok: false, error: serializeError(error) }, 500)
        }

        return jsonResponse({ ok: true, pinged: true, rows: Array.isArray(data) ? data.length : 0 })
    } catch (err) {
        console.error('Health-check error:', err)
        return jsonResponse({ ok: false, error: serializeError(err) }, 500)
    }
}

