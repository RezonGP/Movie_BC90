import { useEffect, useState, useCallback } from "react";
import { UserService } from "../../../services/user";
import type { TUser } from "../../HomeTemplate/types";
import AdminTable from "../_components/AdminTable";
import { Button, TextInput } from "flowbite-react";

export default function AdminUsers() {
    const [users, setUsers] = useState<TUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = keyword ? await UserService.search(keyword) : await UserService.list();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    }, [keyword]);

    useEffect(() => { load(); }, [load]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Quản lý người dùng</h2>
                <div className="flex gap-2">
                    <TextInput value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Tìm kiếm..." />
                    <Button onClick={load} color="blue">Tìm</Button>
                </div>
            </div>
            <AdminTable<TUser>
                loading={loading}
                data={users}
                columns={[
                    { key: "taiKhoan", title: "Tài khoản" },
                    { key: "hoTen", title: "Họ tên", render: (u) => <span className="font-medium text-gray-900">{u.hoTen}</span> },
                    { key: "email", title: "Email" },
                    { key: "soDT", title: "Số ĐT", render: (u) => u.soDT || u.soDt || "" },
                    { key: "maLoaiNguoiDung", title: "Loại" },
                ]}
            />
        </div>
    );
}
