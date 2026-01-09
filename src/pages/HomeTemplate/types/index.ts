import { AxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";




export type InitState<T> = {
    loading: boolean;
    data: T | null;
    error: AxiosError<unknown> | null;
};

export type MovieDetailState = {
    detail: TMovie | null;
    schedule: unknown | null;
};

export type CinemaSystem = {
    maHeThongRap: string;
    tenHeThongRap: string;
    biDanh: string;
    logo: string;
};

export type TMovie = {
    maPhim: number;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh: string;
    moTa: string;
    maNhom: string;
    ngayKhoiChieu: string;
    danhGia: number;
    hot: boolean;
    dangChieu: boolean;
    sapChieu: boolean;
};

export type TUser = {
    taiKhoan: string;
    matKhau: string;
    email?: string;
    soDT?: string;
    soDt?: string;
    maNhom?: string;
    hoTen?: string;
    maLoaiNguoiDung?: "QuanTri" | "KhachHang";
    accessToken?: string;
};

export type TBanner = {
    maBanner: number,
    maPhim: number,
    hinhAnh: string,
}

export type Auth = {
    taiKhoan: string,
    matKhau: string,
}

export type TApiResponse<T> = {
    statusCode: number;
    message: string;
    content: T;
};

export interface User {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    accessToken: string;
}

export interface AuthState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    data: (() => {
        const storedUser = localStorage.getItem("USER_ADMIN");
        return storedUser ? JSON.parse(storedUser) : null;
    })(),
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ taiKhoan, matKhau }: { taiKhoan: string; matKhau: string }) => {
        const response = await api.post("/QuanLyNguoiDung/DangNhap", {
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
            state.data = null;
            localStorage.removeItem("USER_ADMIN");
        },
        setUser: (state, action) => {
            state.data = action.payload;
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
                state.data = action.payload;
                localStorage.setItem("USER_ADMIN", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Đăng nhập thất bại";
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
