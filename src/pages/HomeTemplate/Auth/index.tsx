import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../_component/layouts/Header";
import Footer from "../_component/layouts/Footer";

import type { AppDispatch, RootState } from "../../../store";
import type { TUser } from "./../types";
import { authService } from "./slice";

export default function Auth() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state: RootState) => state.authReducer
    );

    const [user, setUser] = useState<TUser>({
        taiKhoan: "",
        matKhau: "",
    });

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await dispatch(authService(user));

        if (authService.fulfilled.match(result)) {
            const role = result.payload.maLoaiNguoiDung;

            if (role === "QuanTri") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <div>
            <Header />

            <main className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Đăng Nhập
                    </h1>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Tài khoản
                            </label>
                            <input
                                type="text"
                                name="taiKhoan"
                                value={user.taiKhoan}
                                onChange={handleOnchange}
                                className="w-full px-3 py-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                name="matKhau"
                                value={user.matKhau}
                                onChange={handleOnchange}
                                className="w-full px-3 py-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm mb-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold disabled:opacity-50"
                        >
                            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
