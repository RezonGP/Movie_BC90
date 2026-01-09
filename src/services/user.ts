import { api } from "./api";
import type { TApiResponse, TUser } from "../pages/HomeTemplate/types";
const END_POINT = "QuanLyNguoiDung";
export const UserService = {
    types: async () => {
        const res = await api.get<TApiResponse<string[]>>(`${END_POINT}/LayDanhSachLoaiNguoiDung`);
        return res.data.content;
    },
    list: async (group = "") => {
        const res = await api.get<TApiResponse<TUser[]>>(`${END_POINT}/LayDanhSachNguoiDung?MaNhom=${group}`);
        return res.data.content;
    },
    listPaged: async (page = 1, size = 10, keyword = "", group = "") => {
        const res = await api.get<TApiResponse<unknown>>(`${END_POINT}/LayDanhSachNguoiDungPhanTrang?MaNhom=${group}&tuKhoa=${keyword}&soTrang=${page}&soPhanTuTrenTrang=${size}`);
        return res.data.content;
    },
    search: async (keyword: string, group = "") => {
        const res = await api.get<TApiResponse<TUser[]>>(`${END_POINT}/TimKiemNguoiDung?MaNhom=${group}&tuKhoa=${encodeURIComponent(keyword)}`);
        return res.data.content;
    },
    add: async (payload: TUser) => {
        const res = await api.post(`${END_POINT}/ThemNguoiDung`, payload);
        return res.data.content;
    },
    update: async (payload: TUser) => {
        const res = await api.put(`${END_POINT}/CapNhatThongTinNguoiDung`, payload);
        return res.data.content;
    },
    delete: async (taiKhoan: string) => {
        const res = await api.delete(`${END_POINT}/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        return res.data.content;
    },
    accountInfo: async () => {
        const res = await api.post<TApiResponse<unknown>>(`${END_POINT}/ThongTinTaiKhoan`);
        return res.data.content;
    },
};
