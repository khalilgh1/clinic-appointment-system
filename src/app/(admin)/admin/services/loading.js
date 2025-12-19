export default function Loading() {
    return (
        <div className="space-y-10 animate-pulse">
            <div className="h-10 w-1/3 rounded-full bg-slate-200" />
            {[...Array(3)].map((_, index) => (
                <section key={index} className="space-y-4 rounded-[32px] border border-gray-200 bg-white p-6 shadow">
                    <div className="h-5 w-1/4 rounded-full bg-slate-200" />
                    <div className="grid gap-4 lg:grid-cols-4">
                        {[...Array(4)].map((_, column) => (
                            <div key={column} className="h-24 rounded-2xl bg-slate-100" />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
