import { useEffect } from "react";
import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import type { RootState } from "@reduxjs/toolkit/query";
import { fetchCinemaSystems } from "./types/slice";
import type { CinemaSystem } from "../types";


const Cinema = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: cinema, loading } = useSelector(
        (state: any) => state.cinemaReducer
    );


    useEffect(() => {
        dispatch(fetchCinemaSystems());
    }, [dispatch]);
    return (
        <div>
            <Header />
            <main className="min-h-screen  bg-zinc-900 text-white px-6 py-8">
                <h1 className="text-3xl font-bold mb-8">Hệ thống rạp chiếu phim</h1>

                {loading && <p>Đang tải hệ thống rạp...</p>}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {cinema?.map((cinema: CinemaSystem) => (
                        <div
                            key={cinema.maHeThongRap}
                            className="bg-zinc-600 rounded-2xl p-6 hover:bg-gray-700 transition"
                        >
                            <img
                                src={cinema.logo}
                                alt={cinema.tenHeThongRap}
                                className="h-14 mb-4 bg-white p-2 rounded"
                            />
                            <h2 className="text-xl font-semibold">
                                {cinema.tenHeThongRap}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {cinema.biDanh}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Cinema;
