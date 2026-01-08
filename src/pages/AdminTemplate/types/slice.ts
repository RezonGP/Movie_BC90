import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../../services/api';
import type { InitState, TMovie, TApiResponse } from '../../HomeTemplate/types/types';
const initialState: InitState<TMovie[]> = {
    loading: false,
    data: null,
    error: null,
};

export const fetchMovies = createAsyncThunk(
    "movie/fetchMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<TApiResponse<TMovie[]>>(
                "QuanLyPhim/LayDanhSachPhim?maNhom=GP02"
            );
            return response.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteMovie = createAsyncThunk(
    'movie/deleteMovie',
    async (maPhim: number, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
            alert('Xóa phim thành công!');
            dispatch(fetchMovies());
            return maPhim;
        } catch (error: any) {
            alert(error.response?.data?.content || 'Xóa phim thất bại');
            return rejectWithValue(error.response.data);
        }
    }
);

export const addMovie = createAsyncThunk(
    'movie/addMovie',
    async (formData: FormData, { dispatch, rejectWithValue }) => {
        try {
            // Sửa endpoint: ThemPhimUploadHinh
            await api.post('QuanLyPhim/ThemPhimUploadHinh', formData);
            alert('Thêm phim thành công!');
            dispatch(fetchMovies());
            return;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMovie = createAsyncThunk(
    'movie/updateMovie',
    async (formData: FormData, { dispatch, rejectWithValue }) => {
        try {
            // Endpoint: CapNhatPhimUpload
            await api.post('QuanLyPhim/CapNhatPhimUpload', formData);
            alert('Cập nhật phim thành công!');
            dispatch(fetchMovies());
            return;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
                (state) => { state.loading = false; }
            );
    }
});

export default movieSlice.reducer;