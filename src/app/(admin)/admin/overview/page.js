import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DailyTimeline from '@/components/charts/DailyTimeline';
import WeeklyTrend from '@/components/charts/WeeklyTrend';

function formatNumber(n) {
    return new Intl.NumberFormat('fr-FR').format(n);
}

export default async function Overview() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
        redirect('/admin/login')
    }
    // fetch appointments for the last 30 days to compute stats and weekly trends
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6); // include today -> 7 days

    const fromIso = sevenDaysAgo.toISOString();

    const { data: appointments, error } = await supabase
        .from('appointment')
        .select('appointment_id,patient_first_name,patient_last_name,patient_email,start_time')
        .gte('start_time', fromIso)
        .order('start_time', { ascending: true });

    // Totals across all appointments table (count)
    const { count: _countAll, error: _countErr } = await supabase
        .from('appointment')
        .select('appointment_id', { count: 'exact', head: true });

    // Compute total appointments (for display we'll use exact count from head query if available)
    const totalAppointments = typeof _countAll === 'number' ? _countAll : (appointments ? appointments.length : 0);

    // Unique patients based on first+last+email
    let uniquePatientsSet = new Set();
    if (appointments && appointments.length > 0) {
        appointments.forEach(a => {
            const key = `${a.patient_first_name || ''}|${a.patient_last_name || ''}|${a.patient_email || ''}`.toLowerCase();
            uniquePatientsSet.add(key);
        });
    } else {
        // If no data in last 7 days, try to get a broader sample of patients from the whole table
        const { data: allAppointments } = await supabase
            .from('appointment')
            .select('patient_first_name,patient_last_name,patient_email')
            .limit(1000);
        if (allAppointments) {
            allAppointments.forEach(a => {
                const key = `${a.patient_first_name || ''}|${a.patient_last_name || ''}|${a.patient_email || ''}`.toLowerCase();
                uniquePatientsSet.add(key);
            });
        }
    }

    const totalPatients = uniquePatientsSet.size;

    // Visitors: not available in `appointment` schema -> use dummy data
    const totalVisitors = 523; // dummy

    // Prepare weekly trends (7 days) for appointments and unique patients per day
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo);
        d.setDate(sevenDaysAgo.getDate() + i);
        days.push(d);
    }

    // initialize counts
    const apptCounts = Array(7).fill(0);
    const uniquePerDay = Array(7).fill(0);

    // map for daily unique patient keys
    const dailySets = Array.from({ length: 7 }, () => new Set());

    if (appointments && appointments.length > 0) {
        appointments.forEach(a => {
            const d = new Date(a.start_time);
            // find day index
            const idx = Math.floor((d - sevenDaysAgo) / (24 * 60 * 60 * 1000)); // divide by ms in a day
            if (idx >= 0 && idx < 7) {
                apptCounts[idx] += 1;
                const key = `${a.patient_first_name || ''}|${a.patient_last_name || ''}|${a.patient_email || ''}`.toLowerCase();
                dailySets[idx].add(key);
            }
        });
        for (let i = 0; i < 7; i++) uniquePerDay[i] = dailySets[i].size;
    }

    // labels in French (days)
    const dayLabels = days.map(d => d.toLocaleDateString('fr-FR', { weekday: 'short' }));

    // patients today and hourly counts
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(startOfToday.getDate() + 1);

    const hourlyCounts = Array(24).fill(0);
    const patientsTodaySet = new Set();

    if (appointments && appointments.length > 0) {
        appointments.forEach(a => {
            const d = new Date(a.start_time);
            if (d >= startOfToday && d < endOfToday) {
                const hr = d.getHours();
                hourlyCounts[hr] += 1;
                const key = `${a.patient_first_name || ''}|${a.patient_last_name || ''}|${a.patient_email || ''}`.toLowerCase();
                patientsTodaySet.add(key);
            }
        });
    }

    const patientsToday = patientsTodaySet.size;

    // prepare data arrays for recharts
    const hourlyData = Array.from({ length: 24 }, (_, h) => ({ hour: `${String(h).padStart(2, '0')}h`, count: hourlyCounts[h] || 0 }));
    const weeklyData = days.map((d, i) => ({ day: dayLabels[i], count: apptCounts[i] || 0 }));

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>Tableau de bord</h1>
                <p className="text-sm text-gray-600">Aperçu des statistiques récentes</p>
            </header>

            <section className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded" style={{ background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <div className="text-sm text-gray-500">Patients au total</div>
                    <div className="text-2xl font-semibold">{formatNumber(totalPatients)}</div>
                </div>

                <div className="p-4 rounded" style={{ background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <div className="text-sm text-gray-500">Patients aujourd'hui</div>
                    <div className="text-2xl font-semibold">{formatNumber(patientsToday)}</div>
                </div>

                <div className="p-4 rounded" style={{ background: 'white', borderRadius: 'var(--radius-md)' }}>
                    <div className="text-sm text-gray-500">Visiteurs</div>
                    <div className="text-2xl font-semibold">{formatNumber(totalVisitors)}</div>
                    <div className="text-xs text-gray-400">(donnée factice)</div>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-6">
                <div>
                    <DailyTimeline data={hourlyData} />
                </div>

                <div>
                    <WeeklyTrend data={weeklyData} />
                </div>
            </section>
        </div>
    );
}