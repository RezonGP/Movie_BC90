import { api } from "./api";
import type { TApiResponse } from "../pages/HomeTemplate/types";
const END_POINT = "QuanLyDatVe";
export const BookingService = {
    roomSeats: async (maLichChieu: number) => {
        const res = await api.get<TApiResponse<unknown>>(`${END_POINT}/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
        return res.data.content;
    },
    createShowtime: async (payload: { maPhim: number; ngayChieuGioChieu: string; maRap: string; giaVe: number }) => {
        const res = await api.post(`${END_POINT}/TaoLichChieu`, payload);
        return res.data.content;
    },
    bookTickets: async (payload: { maLichChieu: number; danhSachVe: { maGhe: number; giaVe: number }[] }) => {
        const res = await api.post(`${END_POINT}/DatVe`, payload);
        return res.data.content;
    },
};
