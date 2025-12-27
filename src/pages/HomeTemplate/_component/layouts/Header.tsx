import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../../store';
import { actLogout } from '../../../HomeTemplate/Auth/slice';
export default function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { data } = useSelector((state: RootState) => state.authReducer);

    const handleBookTicket = () => {
        if (localStorage.getItem('token')) {
            navigate('/ticket');
        } else {
            navigate('/auth');
        }
    };

    const handleAccount = () => {
        if (!data) {
            navigate('/auth');
        }
        // Nếu đã đăng nhập, có thể thêm logic chuyển đến trang tài khoản
    };





    return (
        <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur border-b border-white/10 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] ">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="https://images.indianexpress.com/2024/01/Movie-Street-feat-2.jpg?w=414"
                        alt="MovieStreet"
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-xl font-bold tracking-wide">
                        <span className="text-orange-500">MOVIE</span>
                        <span className="text-white">Street</span>
                    </span>
                </Link>

                {/* MENU */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <NavLink className="text-gray-200   hover:text-orange-400" to="/">
                        Trang chủ
                    </NavLink>
                    <NavLink className="text-gray-200 hover:text-orange-400" to="/movies">
                        Phim
                    </NavLink>
                    <NavLink className="text-gray-200 hover:text-orange-400" to="/cinema">
                        Rạp
                    </NavLink>
                    <button onClick={handleBookTicket} className="text-gray-200 hover:text-orange-400">
                        Vé
                    </button>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-3 relative">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Tìm phim..."
                        className="hidden md:block px-4 py-2 bg-zinc-800 text-sm rounded-lg outline-none focus:ring-1 focus:ring-orange-500"
                    />

                    {/* SETTINGS (bánh răng bằng emoji / text) */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-3 py-2 rounded-lg hover:bg-zinc-800 transition text-lg"
                        title="Cài đặt"
                    >
                        ⚙
                    </button>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="absolute right-0 top-14 w-44 bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
                            <button onClick={handleAccount} className=" text-warning-soft w-full text-left px-4 py-3 hover:bg-zinc-700 text-sm">
                                Tài khoản
                            </button>
                            <button onClick={handleBookTicket} className="text-warning-soft w-full text-left px-4 py-3 hover:bg-zinc-700 text-sm">
                                Lịch sử đặt vé
                            </button>
                            {data ? (
                                <button onClick={() => { dispatch(actLogout()) }} className=" w-full text-left px-4 py-3 hover:bg-zinc-700 text-sm text-red-400">
                                    Đăng xuất
                                </button>
                            ) : (
                                <button onClick={() => navigate('/auth')} className="text-warning-soft w-full text-left px-4 py-3 hover:bg-zinc-700 text-sm">
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
