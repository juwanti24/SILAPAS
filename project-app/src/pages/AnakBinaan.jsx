import { useEffect, useState } from "react";
import axios from "axios";

export default function AnakBinaan() {
    const [anakBinaans, setAnakBinaans] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/anak-binaans")
            .then((response) => {
                setAnakBinaans(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data anak binaan:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">
                        Data Anak Binaan
                    </h1>
                    <p className="text-gray-500">
                        Dashboard / Data Anak Binaan
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#293040] text-[#D3AC2B] px-6 py-3 rounded-lg font-semibold"
                >
                    Add Anak Binaan
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-300 rounded-lg p-5 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#0f1f3d]">
                        Tambah Data Anak Binaan
                    </h2>

                    <input
                        type="text"
                        placeholder="Nama Anak"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="date"
                        placeholder="Tanggal Lahir"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="date"
                        placeholder="Tanggal Masuk"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Jenis Kelamin"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="text"
                        placeholder="Alamat"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    />

                    <input
                        type="number"
                        placeholder="ID Pembina"
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
                {anakBinaans.map((anak) => (
                    <div
                        key={anak.id_anak}
                        className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-bold text-[#0f1f3d] mb-2">
                            {anak.nama_anak}
                        </h2>

                        <p>
                            ID Pembina: <b>{anak.id_pembina}</b>
                        </p>

                        <p>
                            Tanggal Lahir: <b>{anak.tanggal_lahir}</b>
                        </p>

                        <p>
                            Tanggal Masuk: <b>{anak.tanggal_masuk}</b>
                        </p>

                        <p>
                            Jenis Kelamin: <b>{anak.jenis_kelamin}</b>
                        </p>

                        <p>
                            Alamat: <b>{anak.alamat}</b>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}