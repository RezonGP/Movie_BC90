import { api } from "./api";
import type { TApiResponse } from "../pages/HomeTemplate/types";
const END_POINT = "QuanLyRap";
export const TheaterService = {
    systems: async () => {
        const res = await api.get<TApiResponse<{ maHeThongRap: string; tenHeThongRap: string; logo?: string }[]>>(`${END_POINT}/LayThongTinHeThongRap`);
        return res.data.content;
    },
    clustersBySystem: async (maHeThongRap: string) => {
        const res = await api.get<TApiResponse<{ maCumRap: string; tenCumRap: string; diaChi: string }[]>>(`${END_POINT}/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
        return res.data.content;
    },
    showtimesBySystem: async (maHeThongRap: string) => {
        const res = await api.get<TApiResponse<unknown>>(`${END_POINT}/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}`);
        return res.data.content;
    },
    showtimesByMovie: async (maPhim: number) => {
        const res = await api.get<TApiResponse<unknown>>(`${END_POINT}/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
        return res.data.content;
    },
};
