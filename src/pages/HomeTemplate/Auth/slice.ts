import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../services/api";
import type { InitState, TApiResponse, TUser } from "../types";
import { AxiosError } from "axios";

/* ===== TYPE ===== */
type Userlogin = {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    maNhom: string;
    maLoaiNguoiDung: string;
};

/* ===== LOCAL STORAGE ===== */
const userInfoString = localStorage.getItem("USER_ADMIN");
const data: Userlogin | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

/* ===== INITIAL STATE ===== */
const initialState: InitState<Userlogin> = {
    loading: false,
    data,
    error: null,
};

/* ===== THUNK ===== */
export const authService = createAsyncThunk(
    "auth/login",
    async (user: TUser, { rejectWithValue }) => {
        try {
            const response = await api.post<TApiResponse<Userlogin>>(
                "/QuanLyNguoiDung/DangNhap",
                user
            );

            const roles = response.data.content;

            // 👉 Chỉ admin mới lưu USER_ADMIN
            if (roles.maLoaiNguoiDung === "QuanTri") {
                localStorage.setItem(
                    "USER_ADMIN",
                    JSON.stringify(roles)
                );
            }

            return roles;
        } catch (error: any) {
            return rejectWithValue("Đăng nhập thất bại");
        }
    }
);

/* ===== SLICE ===== */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authService.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload || null;
            })
            .addCase(authService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as AxiosError<any>;
            })
    },
});

export const actLogout = () => {
    return (dispatch: any) => {
        localStorage.removeItem("USER_ADMIN");
        dispatch(authSlice.actions.clearAuthState());
    }
}

export default authSlice.reducer;
