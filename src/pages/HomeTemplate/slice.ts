import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitState, TBanner, TApiResponse } from "./types/types";
import { api } from "./../../services/api"
import { AxiosError } from "axios";

const initialState: InitState<TBanner[]> = {

    loading: false,
    data: null,
    error: null,
}

export const fetchBanner = createAsyncThunk(
    "hometemplate/banner",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<TApiResponse<TBanner[]>>(
                "QuanLyPhim/LayDanhSachBanner"
            );
            return response.data.content;
        } catch (error) { return rejectWithValue(error) }
    }
);

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as AxiosError<any>;
            });
    }
})

export default bannerSlice.reducer

