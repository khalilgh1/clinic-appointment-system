export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="h-28 rounded-3xl bg-white border border-gray-200 shadow-sm" />
                ))}
            </div>
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-24 rounded-2xl bg-white border border-gray-200" />
                ))}
            </div>
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-[32px]">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-14 border-b border-gray-100 bg-slate-100" />
                ))}
            </div>
        </div>
    );
}
