import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./../pages/HomeTemplate/Movie/slice"
import bannerReducer from "./../pages/HomeTemplate/slice"
import { authReducer } from "../pages/HomeTemplate/types";



export const store = configureStore({
    reducer: {
        bannerReducer,
        movieReducer,
        authReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

