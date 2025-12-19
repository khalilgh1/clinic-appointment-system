export default function Loading() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 animate-pulse">
            <div className="w-full md:w-64 p-6 space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="h-4 rounded-full bg-slate-200" />
                ))}
            </div>
            <div className="flex-1 p-6">
                <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="h-6 w-3/4 rounded-full bg-slate-200" />
                    ))}
                    <div className="space-y-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-12 rounded-2xl bg-white border border-gray-200 shadow" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
