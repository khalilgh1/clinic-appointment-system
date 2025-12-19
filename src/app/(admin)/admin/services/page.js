import ServicesPage from "./services";
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function(){
    const supabase = await createClient()
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
        redirect('/admin/login')
    }
    return <ServicesPage />
}