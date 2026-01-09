import { useEffect, useState, useCallback } from "react";
import { MovieService } from "../../../services/movie";
import type { TMovie } from "../../HomeTemplate/types";
import AdminTable from "../_components/AdminTable";
import { Button, Pagination, TextInput } from "flowbite-react";
import AdminMovieModal from "../_components/AdminMovieModal";

export default function AdminMovies() {
    const [movies, setMovies] = useState<TMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<TMovie | null>(null);
    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await MovieService.listPaged(page, pageSize, keyword);
            setMovies(data.items ?? []);
            setTotalPages(data.totalPages ?? 1);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Lỗi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    }, [page, pageSize, keyword]);

    useEffect(() => { 
        load();
    }, [load]);

    const handleDelete = async (id: number) => {
        await MovieService.delete(id);
        await load();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Quản lý phim</h2>
                <Button onClick={() => setShowCreate(true)}>Thêm phim</Button>
            </div>
            <div className="flex justify-end items-center gap-2">
                <TextInput placeholder="Tìm kiếm phim..." value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} />
               
                <Button onClick={load}>Tìm kiếm</Button>
            </div>
            {error && <div className="text-red-600 bg-red-100 border border-red-200 px-4 py-2 rounded">{error}</div>}
            <AdminTable<TMovie>
                loading={loading}
                data={movies}
                columns={[
                    { key: "maPhim", title: "Mã" },
                    { key: "tenPhim", title: "Tên", render: (m) => <span className="font-medium text-gray-900">{m.tenPhim}</span> },
                    { key: "danhGia", title: "Đánh giá" },
                    { key: "dangChieu", title: "Trạng thái", render: (m) => (m.dangChieu ? "Đang chiếu" : m.sapChieu ? "Sắp chiếu" : "Khác") },
                ]}
                actions={(m) => (
                    <div className="space-x-2">
                        <Button color="blue" onClick={() => setEditItem(m)}>Sửa</Button>
                        <Button color="failure" onClick={() => handleDelete(m.maPhim)}>Xóa</Button>
                    </div>
                )}
            />
            <div className="flex justify-center">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} showIcons />
            </div>
            <AdminMovieModal open={showCreate} mode="create" onClose={() => setShowCreate(false)} onSuccess={load} />
            {editItem && (
                <AdminMovieModal open={true} mode="edit" initial={editItem} onClose={() => setEditItem(null)} onSuccess={load} />
            )}
        </div>
    );
}
