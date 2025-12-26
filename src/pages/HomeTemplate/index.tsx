import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Header from "./_component/layouts/Header";
import Footer from "./_component/layouts/Footer";
import { fetchBanner } from "./slice";
import { fetchMovies } from "./Movie/slice";
import type { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

const HomeTemplate = () => {


    const dispatch = useDispatch<AppDispatch>();
    const { data: banners } = useSelector((state: RootState) => state.bannerReducer);
    const { data: movies } = useSelector((state: RootState) => state.movieReducer);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [_, setBannerOpacity] = useState(1);
    const navigate = useNavigate();



    {


        useEffect(() => {
            dispatch(fetchBanner());
            dispatch(fetchMovies());
        }, [dispatch]);

        const handleBookTicket = () => {
            if (localStorage.getItem('token')) {
                navigate('/ticket');
            } else {
                navigate('/auth');
            }
        };

        useEffect(() => {
            if (banners && banners.length > 0) {
                console.log('Banners loaded:', banners);
                console.log('Current banner image:', banners[currentBannerIndex]?.hinhAnh);
                const interval = setInterval(() => {
                    setBannerOpacity(0);
                    setTimeout(() => {
                        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
                        setBannerOpacity(1);
                    }, 500);
                }, 5000);
                return () => clearInterval(interval);
            }
        }, [banners]);



        const getImageUrl = useCallback((url: string) => {
            if (url.startsWith('http')) return url;
            return `https://movienew.cybersoft.edu.vn${url}`;
        }, []);

        const featuredMovies = useMemo(() => movies ? movies.filter(m => m.dangChieu).slice(0, 3) : [], [movies]);


        return (
            <div>
                <Header />
                {/* Hero Section */}
                <section className="relative min-h-screen bg-cover bg-center flex items-center  " style={{ backgroundImage: `url(${banners && banners.length > 0 ? getImageUrl(banners[currentBannerIndex].hinhAnh) : ''})` }}>

                    <div className="absolute inset-0  bg-opacity-60"></div>
                    <div className="relative max-w-7xl mx-auto px-6 text-white">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl font-bold mb-4 ">Chào mừng đến với MovieStreet</h1>
                            <p className="text-xl mb-8">Khám phá bộ sưu tập phim hay nhất với trải nghiệm đặt vé trực tuyến tiện lợi.</p>
                            <div className="flex gap-4">
                                <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold text-lg">
                                    Xem Phim
                                </button>
                                <button className="border-2 border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold text-lg transition" onClick={handleBookTicket}>
                                    Đặt Vé
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Movies */}
                <section className="py-16 bg-zinc-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-white mb-8">Phim Nổi Bật</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredMovies.map((movie) => (
                                <div key={movie.maPhim} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
                                    <img src={getImageUrl(movie.hinhAnh)} alt={movie.tenPhim} className="w-full h-80 object-cover" onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x600?text=No+Image"; }} />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">{movie.tenPhim}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-yellow-400 text-lg">⭐ {movie.danhGia}</span>
                                            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded font-medium">
                                                Đặt vé
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 bg-zinc-800">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-12">Tại Sao Chọn MovieStreet?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-white">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    🎬
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Phim Đa Dạng</h3>
                                <p>Từ bom tấn Hollywood đến phim Việt Nam chất lượng cao.</p>
                            </div>
                            <div className="text-white">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    🎭
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Rạp Hiện Đại</h3>
                                <p>Trải nghiệm xem phim với công nghệ 4K và âm thanh Dolby Atmos.</p>
                            </div>
                            <div className="text-white">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    🎫
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Đặt Vé Dễ Dàng</h3>
                                <p>Đặt vé online nhanh chóng chỉ với vài cú click.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div >
        );
    };
}

export default HomeTemplate;
