export default function Loading() {
    return (
        <div className="space-y-12 px-6 py-10 animate-pulse">
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-64 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100" />
                <div className="space-y-4">
                    <div className="h-6 w-2/3 rounded-full bg-slate-200" />
                    <div className="h-4 w-3/4 rounded-full bg-slate-200" />
                    <div className="h-3 w-full rounded-full bg-slate-200" />
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="h-52 rounded-[32px] bg-slate-100 border border-gray-200" />
                ))}
            </div>
            <div className="space-y-6">
                <div className="h-5 w-1/4 rounded-full bg-slate-200" />
                <div className="grid gap-5 md:grid-cols-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="h-32 rounded-[24px] bg-slate-100 border border-gray-200" />
                    ))}
                </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="h-64 rounded-[32px] bg-slate-100 border border-gray-200" />
                ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-64 rounded-[32px] bg-slate-100 border border-gray-200" />
                <div className="h-64 rounded-[32px] bg-slate-100 border border-gray-200" />
            </div>
        </div>
    );
}
