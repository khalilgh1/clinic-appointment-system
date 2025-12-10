import LoginPage from "./loginPage";
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
export default async function AdminLogin() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getSession()
    if (data.session) {
        redirect('/admin/overview')
    }
    return <LoginPage />
}