import type { ReactNode } from "react";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";

type Column<T> = {
    key: keyof T;
    title: string;
    render?: (row: T) => ReactNode;
};

type Props<T> = {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    actions?: (row: T) => ReactNode;
    emptyText?: string;
};

export default function AdminTable<T extends Record<string, unknown>>({
    columns,
    data,
    loading = false,
    actions,
    emptyText = "Không có dữ liệu",
}: Props<T>) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table>
                <TableHead>
                    {columns.map((c) => (
                        <TableHeadCell key={String(c.key)}>{c.title}</TableHeadCell>
                    ))}
                    {actions && <TableHeadCell>Thao tác</TableHeadCell>}
                </TableHead>
                <TableBody className="divide-y">
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length + (actions ? 1 : 0)}>Đang tải...</TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length + (actions ? 1 : 0)}>{emptyText}</TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, idx) => (
                            <TableRow key={idx} className="bg-white">
                                {columns.map((c) => (
                                    <TableCell key={String(c.key)}>
                                        {c.render ? c.render(row) : (() => {
                                            const value = row[c.key];
                                            if (typeof value === "string" || typeof value === "number") return value;
                                            if (Array.isArray(value)) return value.join(", ");
                                            if (typeof value === "boolean") return value ? "true" : "false";
                                            if (value == null) return "";
                                            try { return JSON.stringify(value); } catch { return String(value); }
                                        })()}
                                    </TableCell>
                                ))}
                                {actions && <TableCell>{actions(row)}</TableCell>}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
