import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import type { TMovie } from "../../HomeTemplate/types";
import { MovieService } from "../../../services/movie";

type Props = {
    open: boolean;
    mode: "create" | "edit";
    initial?: Partial<TMovie>;
    onClose: () => void;
    onSuccess: () => void;
};

export default function AdminMovieModal({ open, mode, initial, onClose, onSuccess }: Props) {
    const [tenPhim, setTenPhim] = useState(initial?.tenPhim || "");
    const [moTa, setMoTa] = useState(initial?.moTa || "");
    const [trailer, setTrailer] = useState(initial?.trailer || "");
    const [ngayKhoiChieu, setNgayKhoiChieu] = useState<string>("");
    const [danhGia, setDanhGia] = useState<number>(initial?.danhGia || 0);
    const [hinhAnh, setHinhAnh] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        const fd = new FormData();
        fd.append("tenPhim", tenPhim);
        fd.append("moTa", moTa);
        fd.append("trailer", trailer);
        fd.append("ngayKhoiChieu", ngayKhoiChieu);
        fd.append("danhGia", String(danhGia));
        fd.append("maNhom", "GP02");
        if (hinhAnh) {
            fd.append("hinhAnh", hinhAnh);
            fd.append("file", hinhAnh);
        }
        try {
            if (mode === "create") {
                await MovieService.addUpload(fd);
            } else {
                if (initial?.maPhim) fd.append("maPhim", String(initial.maPhim));
                await MovieService.updateUpload(fd);
            }
            onSuccess();
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={open} onClose={onClose}>
            <ModalHeader>{mode === "create" ? "Thêm phim" : "Sửa phim"}</ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="tenPhim">Tên phim</Label>
                        <TextInput id="tenPhim" value={tenPhim} onChange={(e) => setTenPhim(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="moTa">Mô tả</Label>
                        <TextInput id="moTa" value={moTa} onChange={(e) => setMoTa(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="trailer">Trailer</Label>
                        <TextInput id="trailer" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="ngay">Ngày khởi chiếu</Label>
                        <TextInput id="ngay" type="date" value={ngayKhoiChieu} onChange={(e) => setNgayKhoiChieu(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="danhGia">Đánh giá</Label>
                        <TextInput id="danhGia" type="number" value={String(danhGia)} onChange={(e) => setDanhGia(Number(e.target.value))} />
                    </div>
                    <div>
                        <Label htmlFor="hinhAnh">Hình ảnh</Label>
                        <FileInput id="hinhAnh" onChange={(e) => setHinhAnh(e.target.files?.[0] || null)} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={submit} disabled={loading || (mode === "create" && (!tenPhim.trim() || !hinhAnh))}>{mode === "create" ? "Thêm" : "Lưu"}</Button>
                <Button color="gray" onClick={onClose}>Đóng</Button>
            </ModalFooter>
        </Modal>
    );
}
