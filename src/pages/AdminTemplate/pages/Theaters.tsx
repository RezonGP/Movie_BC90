import { useState } from "react";
import { TheaterService } from "../../../services/theater";
import { Button, Select } from "flowbite-react";

export default function AdminTheaters() {
    type TheaterSystem = { maHeThongRap: string; tenHeThongRap: string; logo?: string };
    type Cluster = { maCumRap: string; tenCumRap: string; diaChi: string };
    const [systems, setSystems] = useState<TheaterSystem[]>([]);
    const [clusters, setClusters] = useState<Cluster[]>([]);
    const [selectedSystem, setSelectedSystem] = useState<string>("");

    const loadSystems = async () => {
        const data = await TheaterService.systems();
        setSystems(data);
        if (data?.[0]?.maHeThongRap) {
            setSelectedSystem(data[0].maHeThongRap);
        }
    };

    const loadClusters = async (sys: string) => {
        if (!sys) return;
        const data = await TheaterService.clustersBySystem(sys);
        setClusters(data);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quản lý rạp</h2>
            <div className="flex gap-3">
                <Button color="blue" onClick={loadSystems}>Tải hệ thống</Button>
                <Select value={selectedSystem} onChange={async e => { const v = e.target.value; setSelectedSystem(v); await loadClusters(v); }}>
                    {systems.map((s) => (
                        <option key={s.maHeThongRap} value={s.maHeThongRap}>{s.tenHeThongRap}</option>
                    ))}
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clusters.map((c) => (
                    <div key={c.maCumRap} className="bg-white border border-gray-200 p-4 rounded hover:bg-gray-50">
                        <div className="font-semibold text-gray-900">{c.tenCumRap}</div>
                        <div className="text-gray-500 text-sm">{c.diaChi}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
