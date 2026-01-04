import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";
import { Navigate } from "react-router-dom";


export default function Ticket() {
    const user = JSON.parse(
        localStorage.getItem("USER_ADMIN") || "null"
    );
    if (!user) return <Navigate to="/auth" />;




    return (
        <div>
            <div className="min-h-screen bg-zinc-900 text-white">
                <Header />
                {/* Content */}
                <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Khu vực chọn ghế */}
                    <section className="lg:col-span-2 bg-zinc-800 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Chọn Ghế</h2>

                        <div className="grid grid-cols-10 gap-2">
                            {Array.from({ length: 60 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-8 bg-zinc-700 rounded text-xs flex items-center justify-center cursor-pointer hover:bg-orange-500"
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-zinc-700 block rounded"></span>
                                Ghế trống
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-orange-500 block rounded"></span>
                                Ghế đang chọn
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-500 block rounded"></span>
                                Ghế đã đặt
                            </div>
                        </div>
                    </section>

                    {/* Thông tin vé */}
                    <aside className="bg-zinc-800 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Thông Tin Vé
                        </h2>

                        <div className="space-y-3 text-sm">
                            <p><span className="text-gray-400">Phim:</span> Avengers: Endgame</p>
                            <p><span className="text-gray-400">Rạp:</span> CGV Vincom</p>
                            <p><span className="text-gray-400">Suất chiếu:</span> 19:30 - 01/01/2026</p>
                            <p><span className="text-gray-400">Ghế:</span> A1, A2, A3</p>
                            <p className="text-lg font-bold text-orange-400">
                                Tổng tiền: 225.000đ
                            </p>
                        </div>

                        <button
                            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3 rounded font-semibold"
                        >
                            Đặt Vé
                        </button>
                    </aside>
                </main>


            </div>
            <Footer />
        </div>
    );
};



