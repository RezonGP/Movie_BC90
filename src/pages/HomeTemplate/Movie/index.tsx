import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store";
import { useEffect } from "react";
import { fetchMovies } from "./slice";
import type { TMovie } from "../types/types";
import MovieSkeleton from "../_component/MovieSkeleton";

const Movie = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { data: movies, loading, error } = useSelector(
        (state: RootState) => state.movieReducer
    );



    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-zinc-900 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <h1 className="text-3xl font-bold mb-8">Phim Đang Chiếu</h1>
                        <MovieSkeleton />
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Header />
            <main className="min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-cover bg-center text-white relative">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-8">Phim Đang Chiếu</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {movies?.map((movie: TMovie) => (
                            <div
                                key={movie.maPhim}
                                className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg"
                            >
                                <img
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {movie.tenPhim}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-yellow-400">
                                            ⭐ {movie.danhGia}
                                        </span>
                                        <button onClick={() => navigate(`/ticket/${movie.maPhim}`)} className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm font-medium">
                                            Đặt vé
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Movie;
