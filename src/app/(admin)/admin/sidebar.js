import Link from 'next/link';
import { LayoutPanelLeft, Calendar, Users, Briefcase } from 'lucide-react';
export default function Sidebar() {
    return (
        <nav className='flex flex-col space-y-2 items-center justify-center w-60'>
            <div className='py-4 flex flex-col items-center justify-center'>
                <h2 className='text-xl font-bold p-4 text-center border-b border-b-gray-400 w-full'>
                    Tableau de board clinique
                </h2>
            </div>
            <hr></hr>
            <Link href="/admin/overview" className='px-4 py-2 rounded hover:bg-secondary/90 hover:text-primary transition-colors w-[80%] flex items-center gap-2'>
                <LayoutPanelLeft size={15}/>
                Tableau de bord
            </Link>
            <Link href="/admin/appointments" className='px-4 py-2 rounded hover:bg-secondary/90 hover:text-primary transition-colors w-[80%] flex items-center gap-2'>
                <Calendar size={15}/>
                Rendez-vous
            </Link>
            <Link href="/admin/doctors" className='px-4 py-2 rounded hover:bg-secondary/90 hover:text-primary transition-colors w-[80%] flex items-center gap-2'>
                <Users size={15}/>
                Médecins
            </Link>
            <Link href="/admin/services" className='px-4 py-2 rounded hover:bg-secondary/90 hover:text-primary transition-colors w-[80%] flex items-center gap-2'>
                <Briefcase size={15}/>
                Services
            </Link>
        </nav>
    );
}