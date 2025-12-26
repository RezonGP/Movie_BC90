export default function MovieSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
                >
                    {/* Image skeleton */}
                    <div className="w-full h-64 bg-zinc-700" />

                    {/* Content skeleton */}
                    <div className="p-4 space-y-3">
                        <div className="h-5 bg-zinc-700 rounded w-3/4" />
                        <div className="flex items-center justify-between">
                            <div className="h-4 bg-zinc-700 rounded w-16" />
                            <div className="h-8 bg-zinc-700 rounded w-20" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
