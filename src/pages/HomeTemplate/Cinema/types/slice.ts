import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { InitState, CinemaSystem, TApiResponse } from "../../types/types";
import { api } from "../../../../services/api";

const initialState: InitState<CinemaSystem[]> = {

    loading: false,
    data: null,
    error: null,
}

export const fetchCinemaSystems = createAsyncThunk(
    "cinema/fetchCinemaSystems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<TApiResponse<CinemaSystem[]>>(
                "QuanLyRap/LayThongTinHeThongRap"
            );
            return response.data.content;
        } catch (error) { return rejectWithValue(error) }
    });

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCinemaSystems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCinemaSystems.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCinemaSystems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as AxiosError<any>;
            });
    }
});

export default cinemaSlice.reducer;