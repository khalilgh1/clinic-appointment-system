export default function Loading() {
    return (
        <div className="flex min-h-screen animate-pulse bg-slate-50">
            <aside className="hidden md:block w-64 bg-slate-100 p-6 space-y-4 border-r border-gray-200">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="h-4 w-3/4 rounded-full bg-slate-200" />
                ))}
            </aside>
            <div className="flex-1 p-6 space-y-6">
                <div className="h-10 w-1/3 rounded-full bg-slate-200" />
                <div className="grid gap-6 md:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-36 rounded-[28px] bg-white shadow border border-gray-200" />
                    ))}
                </div>
                <div className="space-y-4">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="h-12 rounded-[24px] bg-white border border-gray-200" />
                    ))}
                </div>
            </div>
        </div>
    );
}
