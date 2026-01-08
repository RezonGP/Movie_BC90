import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";

export default function Ticket() {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState<any>(null);

    const user = JSON.parse(localStorage.getItem("USER_ADMIN") || "null");
    if (!user) return <Navigate to="/auth" />;

    useEffect(() => {
        if (!movieId) return;

        api
            .get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`)
            .then(res => {
                setMovieDetail(res.data.content);
            })
            .catch(err => {
                console.error("API ERROR:", err);
            });
    }, [movieId]);

    // ✅ LOADING STATE
    if (!movieDetail) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                    Đang tải thông tin phim...
                </div>
                <Footer />
            </>
        );
    }



    // ✅ MAIN UI (movieDetail ĐÃ CÓ)
    return (
        <div>
            <Header />

            <div
                className="min-h-screen bg-cover bg-center relative text-white"
                style={{
                    backgroundImage: `url(${movieDetail.hinhAnh})`,
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>

                <main className="relative max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CHỌN GHẾ */}
                    <section className="lg:col-span-2 bg-zinc-800/90 p-6 rounded-lg">
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
                    </section>

                    {/* THÔNG TIN VÉ */}
                    <aside className="bg-zinc-800/90 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Thông Tin Vé</h2>

                        <div className="space-y-3 text-sm">
                            <p>
                                <span className="text-gray-400">Phim:</span>{" "}
                                {movieDetail.tenPhim}
                            </p>
                            <p>
                                <span className="text-gray-400">Đánh giá:</span>{" "}
                                ⭐ {movieDetail.danhGia}
                            </p>
                            <p>
                                <span className="text-gray-400">Thời lượng:</span>{" "}
                                {movieDetail.thoiLuong} phút
                            </p>
                        </div>

                        <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-3 rounded font-semibold">
                            Đặt Vé
                        </button>
                    </aside>
                </main>
            </div>

            <Footer />
        </div>
    );
}
