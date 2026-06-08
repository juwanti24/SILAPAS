import { useEffect, useState } from "react";
import axios from "axios";

export default function Pelanggaran() {
    const [pelanggarans, setPelanggarans] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/pelanggarans")
            .then((response) => {
                setPelanggarans(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data pelanggaran:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">
                        Pelanggaran & Sanksi
                    </h1>
                    <p className="text-gray-500">
                        Dashboard / Pelanggaran & Sanksi
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#293040] text-[#D3AC2B] px-6 py-3 rounded-lg font-semibold"
                >
                    Add Pelanggaran
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#0f1f3d]">
                        Tambah Data Pelanggaran
                    </h2>

                    <input
                        type="number"
                        placeholder="ID Anak"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Jenis Pelanggaran"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <textarea
                        placeholder="Deskripsi"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    ></textarea>

                    <textarea
                        placeholder="Sanksi"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    ></textarea>

                    <input
                        type="date"
                        placeholder="Tanggal Pelanggaran"
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
                {pelanggarans.map((pelanggaran) => (
                    <div
                        key={pelanggaran.id_pelanggaran}
                        className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">
                            {pelanggaran.jenis_pelanggaran}
                        </h2>

                        <p>
                            ID Anak: <b>{pelanggaran.id_anak}</b>
                        </p>

                        <p>
                            Deskripsi: <b>{pelanggaran.deskripsi}</b>
                        </p>

                        <p>
                            Sanksi: <b>{pelanggaran.sanksi}</b>
                        </p>

                        <p>
                            Tanggal Pelanggaran:{" "}
                            <b>{pelanggaran.tanggal_pelanggaran}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}