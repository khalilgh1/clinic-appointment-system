export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-16 rounded-[28px] bg-white/70 border border-gray-200" />
                ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="h-60 rounded-[32px] bg-white/70 border border-gray-200" />
                ))}
            </div>
        </div>
    );
}
