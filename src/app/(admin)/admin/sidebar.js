import Link from 'next/link';
export default function Sidebar() {
    return (
        <nav className='flex flex-col space-y-2'>
            <div className='py-4 flex flex-col items-center justify-center'>
                <h2 className='text-xl font-bold px-4'>
                    Tableau do board clinique
                </h2>
            </div>
            <hr></hr>
            <Link href="/admin/overview" className='px-4 py-2 rounded hover:bg-secondary/80 transition-colors'>
                Tableau de bord
            </Link>
            <Link href="/admin/appointments" className='px-4 py-2 rounded hover:bg-secondary/80 transition-colors'>
                Rendez-vous
            </Link>
            <Link href="/admin/doctors" className='px-4 py-2 rounded hover:bg-secondary/80 transition-colors'>
                Médecins
            </Link>
            <Link href="/admin/services" className='px-4 py-2 rounded hover:bg-secondary/80 transition-colors'>
                Services
            </Link>
        </nav>
    );
}