import { api } from "./api";
import type { TApiResponse, TMovie } from "../pages/HomeTemplate/types";
const END_POINT = "QuanLyPhim";
export const MovieService = {
    list: async (group = "GP02") => {
        const res = await api.get<TApiResponse<TMovie[]>>(`${END_POINT}/LayDanhSachPhim?maNhom=${group}`);
        return res.data.content;
    },
    listPaged: async (soTrang = 1, soPhanTuTrenTrang = 10, tenPhim = "", group = "GP02") => {
        const params: Record<string, string | number> = {
            maNhom: group,
            soTrang,
            soPhanTuTrenTrang,
        };
        if (tenPhim && tenPhim.trim()) {
            params.tenPhim = tenPhim;
        }
        const res = await api.get<TApiResponse<{ items: TMovie[]; totalCount?: number; totalPages?: number }>>(
            `${END_POINT}/LayDanhSachPhimPhanTrang`,
            { params }
        );
        return res.data.content;
    },
    listByDate: async (from: string, to: string) => {
        const res = await api.get<TApiResponse<TMovie[]>>(`${END_POINT}/LayDanhSachPhimTheoNgay?tuNgay=${from}&denNgay=${to}`);
        return res.data.content;
    },
    detail: async (id: number) => {
        const res = await api.get<TApiResponse<TMovie>>(`${END_POINT}/LayThongTinPhim?MaPhim=${id}`);
        return res.data.content;
    },
    addUpload: async (formData: FormData) => {
        const res = await api.post(`${END_POINT}/ThemPhimUploadHinh`, formData);
        return res.data.content;
    },
    updateUpload: async (formData: FormData) => {
        const res = await api.post(`${END_POINT}/CapNhatPhimUpload`, formData);
        return res.data.content;
    },
    delete: async (id: number) => {
        const res = await api.delete(`${END_POINT}/XoaPhim?MaPhim=${id}`);
        return res.data.content;
    },
};
