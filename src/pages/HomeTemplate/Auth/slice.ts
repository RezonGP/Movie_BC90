import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";

interface User {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    accessToken: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: (() => {
        const storedUser = localStorage.getItem("USER_ADMIN");
        return storedUser ? JSON.parse(storedUser) : null;
    })(),
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ taiKhoan, matKhau }: { taiKhoan: string; matKhau: string }) => {
        const response = await api.post("QuanLyNguoiDung/DangNhap", {
            taiKhoan,
            matKhau,
        });
        return response.data.content;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("USER_ADMIN");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("USER_ADMIN", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Đăng nhập thất bại";
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;