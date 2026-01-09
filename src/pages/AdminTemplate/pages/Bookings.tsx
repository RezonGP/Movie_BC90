import { useState } from "react";
import { BookingService } from "../../../services/booking";
import { Badge, Button, TextInput } from "flowbite-react";

export default function AdminBookings() {
    const [scheduleId, setScheduleId] = useState<number | "">("");
    type Seat = { maGhe: number; tenGhe: string; daDat: boolean };
    type Room = { thongTinPhim?: { tenPhim?: string }; danhSachGhe?: Seat[] };
    const [room, setRoom] = useState<Room | null>(null);

    const loadRoom = async () => {
        if (!scheduleId) return;
        const data = await BookingService.roomSeats(Number(scheduleId));
        setRoom(data as Room);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quản lý đặt vé</h2>
            <div className="flex gap-2">
                <TextInput value={String(scheduleId)} onChange={e => setScheduleId(e.target.value ? Number(e.target.value) : "")} placeholder="Mã lịch chiếu" />
                <Button color="blue" onClick={loadRoom}>Tải phòng</Button>
            </div>
            {room && (
                <div className="bg-white border border-gray-200 p-4 rounded">
                    <div className="font-semibold text-gray-900 mb-2">{room.thongTinPhim?.tenPhim}</div>
                    <div className="grid grid-cols-8 gap-2">
                        {room.danhSachGhe?.map((g) => (
                            <Badge key={g.maGhe} color={g.daDat ? "gray" : "success"} className="text-center px-2 py-2">
                                {g.tenGhe}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
