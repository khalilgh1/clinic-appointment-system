import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') ?? '/admin/login'
    const redirectTo = request.nextUrl.clone()

    if (token_hash && type) {
        const supabase = await createClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if (!error) {
            // For recovery type (password reset), redirect to the password reset page
            if (type === 'recovery') {
                redirectTo.pathname = '/admin/auth/confirm'
                redirectTo.search = ''
                return NextResponse.redirect(redirectTo)
            }

            // For other types, redirect to the next URL
            redirectTo.pathname = next
            redirectTo.search = ''
            return NextResponse.redirect(redirectTo)
        }
    }

    // If there's an error or missing parameters, redirect to error page
    redirectTo.pathname = '/admin/auth/auth-code-error'
    return NextResponse.redirect(redirectTo)
}
