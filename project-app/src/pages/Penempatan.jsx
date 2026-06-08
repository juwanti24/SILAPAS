import { useEffect, useState } from "react";
import axios from "axios";

export default function Penempatan() {
    const [penempatans, setPenempatans] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/penempatans")
            .then((response) => {
                setPenempatans(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data penempatan:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">
                        Data Penempatan
                    </h1>
                    <p className="text-gray-500">
                        Dashboard / Data Penempatan
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#293040] text-[#D3AC2B] px-6 py-3 rounded-lg font-semibold"
                >
                    Add Penempatan
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#0f1f3d]">
                        Tambah Data Penempatan
                    </h2>

                    <input
                        type="number"
                        placeholder="ID Anak"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="number"
                        placeholder="ID Kamar"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="date"
                        placeholder="Tanggal Penempatan"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Status Penempatan"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <div className="flex gap-3">
                        <button className="bg-[#293040] text-[#D3AC2B] px-5 py-2 rounded-lg font-semibold">
                            Simpan
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-5">
                {penempatans.map((penempatan) => (
                    <div
                        key={penempatan.id_penempatan}
                        className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">
                            Penempatan #{penempatan.id_penempatan}
                        </h2>

                        <p>
                            ID Anak: <b>{penempatan.id_anak}</b>
                        </p>

                        <p>
                            ID Kamar: <b>{penempatan.id_kamar}</b>
                        </p>

                        <p>
                            Tanggal Penempatan:{" "}
                            <b>{penempatan.tanggal_penempatan}</b>
                        </p>

                        <p>
                            Status: <b>{penempatan.status_penempatan}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}