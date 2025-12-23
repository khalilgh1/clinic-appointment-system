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

        // If a file with the same name already exists in the bucket, avoid uploading and reuse its URL
        try {
            const { data: existingData, error: existingError } = await supabase.storage.from('clinic_images').download(fileName)
            if (existingData && !existingError) {
                const { data: publicUrlData } = supabase.storage.from('clinic_images').getPublicUrl(fileName)
                return NextResponse.json({ publicUrl: publicUrlData?.publicUrl || null, existed: true })
            }
            // if existingError is present but it's a not-found, continue to upload
            if (existingError && existingError.status && existingError.status !== 404) {
                console.error('Error checking existing file:', existingError)
                const serial = JSON.parse(JSON.stringify(existingError))
                return NextResponse.json({ error: serial || 'Error checking existing file' }, { status: 500 })
            }
        } catch (e) {
            // ignore and proceed to upload
            console.warn('Error while checking for existing file, will proceed to upload:', e)
        }

        const { data: uploadData, error: uploadError } = await supabase.storage.from('clinic_images').upload(fileName, buffer, {
            contentType,
            upsert: false,
        })

        if (uploadError) {
            console.error('Server upload error:', uploadError)
            const serial = JSON.parse(JSON.stringify(uploadError))
            return NextResponse.json({ error: serial || 'Upload failed' }, { status: 500 })
        }

        // prefer the path returned by upload for public URL
        const path = uploadData?.path || fileName
        const { data: publicUrlData, error: publicUrlError } = supabase.storage.from('clinic_images').getPublicUrl(path)
        if (publicUrlError) {
            console.error('Get public URL error:', publicUrlError)
        }

        return NextResponse.json({ publicUrl: publicUrlData?.publicUrl || null, uploadData: uploadData || null })
    } catch (err) {
        console.error('Upload route error:', err)
        return NextResponse.json({ error: String(err) }, { status: 500 })
    }
}
