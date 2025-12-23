import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const supabase = await createClient()

        const filenameHeader = request.headers.get('x-filename') || ''
        const contentType = request.headers.get('content-type') || 'application/octet-stream'
        const ext = filenameHeader.split('.').pop() || 'bin'
        const fileName = filenameHeader || `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

        const arrayBuffer = await request.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabase.storage.from('clinic_images').upload(fileName, buffer, {
            contentType,
            upsert: false
        })

        if (uploadError) {
            console.error('Server upload error:', uploadError)
            return NextResponse.json({ error: uploadError.message || 'Upload failed' }, { status: 500 })
        }

        const { data: publicUrlData } = supabase.storage.from('clinic_images').getPublicUrl(fileName)

        return NextResponse.json({ publicUrl: publicUrlData?.publicUrl || null })
    } catch (err) {
        console.error('Upload route error:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
