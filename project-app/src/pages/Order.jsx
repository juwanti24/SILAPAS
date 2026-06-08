import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
    const [kamars, setKamars] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/kamars")
            .then((response) => {
                setKamars(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data kamar:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">
                        Data Kamar
                    </h1>
                    <p className="text-gray-500">
                        Dashboard / Data Kamar
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#293040] text-[#D3AC2B] px-6 py-3 rounded-lg font-semibold"
                >
                    Add Kamar
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#0f1f3d]">
                        Tambah Data Kamar
                    </h2>

                    <input
                        type="text"
                        placeholder="Nama Kamar"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Blok"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="number"
                        placeholder="Kapasitas"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Status"
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
                {kamars.map((kamar) => (
                    <div
                        key={kamar.id_kamar}
                        className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">
                            {kamar.nama_kamar}
                        </h2>

                        <p>
                            Blok: <b>{kamar.blok}</b>
                        </p>

                        <p>
                            Kapasitas: <b>{kamar.kapasitas}</b>
                        </p>

                        <p>
                            Status: <b>{kamar.status}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}