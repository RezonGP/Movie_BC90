import { useEffect } from 'react';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export default function AdminTemplate() {
    const { data } = useSelector((state: RootState) => state.authReducer);
    const location = useLocation();

    useEffect(() => {}, [location.pathname]);
    if (!data) {
        return <Navigate to="/auth" replace />;
    }
    if (data.maLoaiNguoiDung !== "QuanTri") {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="flex">
                <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
                    <div className="px-6 py-5 text-xl font-semibold">Admin</div>
                    <nav className="px-2 space-y-1">
                        <NavLink to="/admin/movies" className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Quản lý phim</NavLink>
                        <NavLink to="/admin/users" className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Quản lý người dùng</NavLink>
                        <NavLink to="/admin/theaters" className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Quản lý rạp</NavLink>
                        <NavLink to="/admin/bookings" className={({ isActive }) => `block px-4 py-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Quản lý đặt vé</NavLink>
                    </nav>
                </aside>
                <main className="flex-1">
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    </header>
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
