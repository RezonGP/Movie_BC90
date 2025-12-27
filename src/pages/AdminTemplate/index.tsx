import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../HomeTemplate/Movie/slice';
import Header from '../HomeTemplate/_component/layouts/Header';
import Footer from '../HomeTemplate/_component/layouts/Footer';
import type { TMovie } from '../HomeTemplate/types';
import { actLogout } from '../HomeTemplate/Auth/slice';

export default function AdminTemplate() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.authReducer.data!);
    const { data: movies } = useSelector((state: RootState) => state.movieReducer);
    const movieError = useSelector((state: RootState) => state.movieReducer.error);
    const [editingMovie, setEditingMovie] = useState<TMovie | null>(null);
    const { data } = useSelector((state: RootState) => state.authReducer);
    const [formData, setFormData] = useState({
        tenPhim: '',
        trailer: '',
        moTa: '',
        ngayKhoiChieu: '',
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: '',
    });

    useEffect(() => {

        if (user.maLoaiNguoiDung !== "QuanTri") {
            navigate("/");
            return;
        }

        dispatch(fetchMovies());
    }, [user, dispatch, navigate]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== '') {
                data.append(key, value.toString());
            }
        });
        data.append('maNhom', 'GP02');

        if (editingMovie) {
            data.append('maPhim', editingMovie.maPhim.toString());
            dispatch(updateMovie(data));
        } else {
            dispatch(addMovie(data));
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: '',
        });
        setEditingMovie(null);
    };

    const handleEdit = (movie: TMovie) => {
        setEditingMovie(movie);
        setFormData({
            tenPhim: movie.tenPhim,
            trailer: movie.trailer,
            moTa: movie.moTa,
            ngayKhoiChieu: movie.ngayKhoiChieu,
            dangChieu: movie.dangChieu,
            sapChieu: movie.sapChieu,
            hot: movie.hot,
            danhGia: movie.danhGia,
            hinhAnh: movie.hinhAnh,
        });
    };

    const handleDelete = (maPhim: number) => {
        if (window.confirm('Bạn có chắc muốn xóa phim này?')) {
            dispatch(deleteMovie(maPhim));
        }
    };

    if (!data) {
        return <Navigate to="/auth" replace />;
    }
    return (
        <div>
            <Header />
            <main className="min-h-screen bg-zinc-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold mb-8">Quản Lý Phim</h1>
                    <button onClick={() => { dispatch(actLogout()) }} className=" w-full text-left px-4 py-3 hover:bg-zinc-700 text-sm text-red-400">
                        Đăng xuất
                    </button>
                    <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">{editingMovie ? 'Cập Nhật Phim' : 'Thêm Phim Mới'}</h2>
                        {movieError && <p className="text-red-500 mb-4">Lỗi: {movieError.message}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Tên phim"
                                value={formData.tenPhim}
                                onChange={(e) => setFormData({ ...formData, tenPhim: e.target.value })}
                                className="px-3 py-2 bg-zinc-700 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Trailer URL"
                                value={formData.trailer}
                                onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
                                className="px-3 py-2 bg-zinc-700 rounded"
                            />
                            <input
                                type="date"
                                value={formData.ngayKhoiChieu}
                                onChange={(e) => setFormData({ ...formData, ngayKhoiChieu: e.target.value })}
                                className="px-3 py-2 bg-zinc-700 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Đánh giá"
                                value={formData.danhGia}
                                onChange={(e) => setFormData({ ...formData, danhGia: Number(e.target.value) })}
                                className="px-3 py-2 bg-zinc-700 rounded"
                                min="0"
                                max="10"
                            />
                            <input
                                type="text"
                                placeholder="Hình ảnh URL"
                                value={formData.hinhAnh}
                                onChange={(e) => setFormData({ ...formData, hinhAnh: e.target.value })}
                                className="px-3 py-2 bg-zinc-700 rounded"
                            />
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.dangChieu}
                                        onChange={(e) => setFormData({ ...formData, dangChieu: e.target.checked })}
                                        className="mr-2"
                                    />
                                    Đang chiếu
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.sapChieu}
                                        onChange={(e) => setFormData({ ...formData, sapChieu: e.target.checked })}
                                        className="mr-2"
                                    />
                                    Sắp chiếu
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.hot}
                                        onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                                        className="mr-2"
                                    />
                                    Hot
                                </label>
                            </div>
                        </div>
                        <textarea
                            placeholder="Mô tả"
                            value={formData.moTa}
                            onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                            className="w-full px-3 py-2 bg-zinc-700 rounded mt-4"
                            rows={3}
                            required
                        />
                        <div className="flex gap-4 mt-4">
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded">
                                {editingMovie ? 'Cập Nhật' : 'Thêm Phim'}
                            </button>
                            {editingMovie && (
                                <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded">
                                    Hủy
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movies?.map((movie) => (
                            <div key={movie.maPhim} className="bg-zinc-800 rounded-lg overflow-hidden">
                                <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{movie.tenPhim}</h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(movie)} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm">
                                            Sửa
                                        </button>
                                        <button onClick={() => handleDelete(movie.maPhim)} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm">
                                            Xóa
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
}