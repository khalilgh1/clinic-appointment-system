export default function Loading() {
    return (
        <div className="space-y-8 px-6 py-10 animate-pulse">
            {[...Array(3)].map((_, index) => (
                <section key={index} className="space-y-4 rounded-[32px] border border-gray-200 bg-white p-6 shadow">
                    <div className="h-6 w-1/3 rounded-full bg-slate-200" />
                    <div className="h-4 w-2/3 rounded-full bg-slate-200" />
                    <div className="grid gap-3 md:grid-cols-4">
                        {[...Array(4)].map((_, column) => (
                            <div key={column} className="h-24 rounded-2xl bg-slate-100" />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
