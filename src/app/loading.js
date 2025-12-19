export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen animate-pulse bg-white">
            <header className="h-16 border-b border-gray-200 bg-slate-100" />
            <main className="flex-1 space-y-10 px-6 py-10">
                <div className="space-y-4">
                    <div className="h-12 w-2/5 rounded-full bg-slate-200" />
                    <div className="h-64 rounded-[32px] bg-gradient-to-br from-slate-200 to-slate-100" />
                </div>
                <section className="grid gap-6 md:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="h-40 rounded-[32px] border border-gray-200 bg-slate-100"
                        />
                    ))}
                </section>
                <section className="space-y-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="space-y-3">
                            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                            <div className="h-3 w-full rounded-full bg-slate-200" />
                            <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                        </div>
                    ))}
                </section>
            </main>
            <footer className="h-24 border-t border-gray-200 bg-slate-100" />
        </div>
    );
}
