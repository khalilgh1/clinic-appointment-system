import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';


export const metadata = {
	title: 'Admin',
};


export default async function AdminPage() {
	const supabase = await createClient()
	const { data } = await supabase.auth.getSession()

	if (!data.session) {
		redirect('/admin/login')
	}

	redirect('/admin/overview')
}

