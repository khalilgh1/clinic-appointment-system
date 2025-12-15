export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="space-y-3">
                <div className="h-8 w-2/5 rounded-full bg-slate-200" />
                <div className="h-4 w-3/5 rounded-full bg-slate-200" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="h-64 rounded-[32px] border border-gray-200 bg-white shadow-sm" />
                ))}
            </div>
        </div>
    );
}
