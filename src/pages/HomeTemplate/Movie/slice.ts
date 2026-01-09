import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitState, TMovie, TApiResponse } from "../types";
import { api } from "./../../../services/api"
import { AxiosError } from "axios";
import axios from "axios";


const initialState: InitState<TMovie[]> = {

    loading: false,
    data: null,
    error: null,
}



import { IMAGE_URL } from "../../../constants";

export const addMovie = createAsyncThunk(
    'movie/addMovie',
    async (formData: FormData) => {
        const res = await axios.post(`${IMAGE_URL}...`, formData);
        return res.data.content;
    }
);

export const updateMovie = createAsyncThunk(
    'movie/updateMovie',
    async (formData: FormData) => {
        const res = await axios.post(`${IMAGE_URL}...`, formData);
        return res.data.content;
    }
);

export const deleteMovie = createAsyncThunk(
    'movie/deleteMovie',
    async (maPhim: number) => {
        await axios.delete(`${IMAGE_URL}...?MaPhim=${maPhim}`);
        return maPhim;
    }
);
export const fetchMovies = createAsyncThunk(
    "movie/fetchMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<TApiResponse<TMovie[]>>(
                "QuanLyPhim/LayDanhSachPhim?maNhom=GP02"
            );
            return response.data.content;
        } catch (error) { return rejectWithValue(error) }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as AxiosError<unknown>;
            });
    }
})

export default movieSlice.reducer
