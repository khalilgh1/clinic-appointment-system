export default function Loading() {
    return (
        <div className="space-y-8 px-6 py-10 animate-pulse">
            <div className="h-64 rounded-[32px] bg-gradient-to-br from-slate-200 to-slate-100" />
            <div className="grid gap-8 lg:grid-cols-12">
                <div className="space-y-6 lg:col-span-8">
                    <div className="h-4 w-1/2 rounded-full bg-slate-200" />
                    <div className="h-40 rounded-[28px] bg-slate-100 border border-gray-200" />
                    <div className="space-y-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-10 rounded-2xl bg-slate-100" />
                        ))}
                    </div>
                </div>
                <div className="space-y-6 lg:col-span-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-32 rounded-[28px] bg-slate-100 border border-gray-200" />
                    ))}
                </div>
            </div>
        </div>
    );
}
