export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col bg-white animate-pulse">
            <div className="h-20 border-b border-gray-200 bg-slate-100" />
            <div className="flex-1 px-6 py-10 space-y-8">
                <div className="space-y-3">
                    <div className="h-5 w-1/3 rounded-full bg-slate-200" />
                    <div className="h-16 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="h-32 rounded-[28px] bg-slate-100 border border-gray-200" />
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-48 rounded-[32px] bg-slate-100 border border-gray-200" />
                    ))}
                </div>
            </div>
            <div className="h-24 border-t border-gray-200 bg-slate-100" />
        </div>
    );
}
