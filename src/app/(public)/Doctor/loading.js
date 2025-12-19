export default function Loading() {
    return (
        <div className="space-y-10 px-6 py-10 animate-pulse">
            <div className="h-72 rounded-[32px] bg-gradient-to-br from-slate-200 to-slate-100" />
            <div className="grid gap-6 md:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-48 rounded-3xl bg-slate-100 border border-gray-200" />
                ))}
            </div>
            <div className="h-48 rounded-[32px] bg-slate-100 border border-gray-200" />
        </div>
    );
}
