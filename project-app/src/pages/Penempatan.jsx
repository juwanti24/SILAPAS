import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSpinner, FaInbox } from "react-icons/fa";

export default function Penempatan() {
    const [penempatans, setPenempatans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id_anak: "",
        id_kamar: "",
        tanggal_penempatan: "",
        status_penempatan: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/penempatans")
            .then((response) => {
                setPenempatans(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data penempatan:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios
            .post("http://127.0.0.1:8000/api/penempatans", form)
            .then(() => {
                setShowForm(false);
                setForm({ id_anak: "", id_kamar: "", tanggal_penempatan: "", status_penempatan: "" });
                fetchData();
            })
            .catch((error) => {
                console.error("Gagal menyimpan data:", error);
            });
    };

    const statusColor = (status) => {
        if (!status) return "bg-gray-100 text-gray-500";
        const s = status.toLowerCase();
        if (s === "tersedia") return "bg-green-100 text-green-700";
        if (s === "penuh") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-500";
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">Data Penempatan</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Dashboard / Data Penempatan</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
                >
                    <FaPlus />
                    Tambah Penempatan
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
                        Tambah Data Penempatan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">ID Anak</label>
                            <input
                                type="number"
                                name="id_anak"
                                value={form.id_anak}
                                onChange={handleChange}
                                placeholder="ID Anak Binaan"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">ID Kamar</label>
                            <input
                                type="number"
                                name="id_kamar"
                                value={form.id_kamar}
                                onChange={handleChange}
                                placeholder="ID Kamar"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Tanggal Penempatan</label>
                            <input
                                type="date"
                                name="tanggal_penempatan"
                                value={form.tanggal_penempatan}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Status Penempatan</label>
                            <select
                                name="status_penempatan"
                                value={form.status_penempatan}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            >
                                <option value="">Pilih Status</option>
                                <option value="Tersedia">Tersedia</option>
                                <option value="Penuh">Penuh</option>
                                <option value="Keluar">Keluar</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#293040] text-[#D3AC2B] px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#1e2535] transition"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-100 text-gray-600 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#293040] text-[#D3AC2B]">
                            <th className="text-left px-5 py-3.5 font-semibold">#</th>
                            <th className="text-left px-5 py-3.5 font-semibold">ID Penempatan</th>
                            <th className="text-left px-5 py-3.5 font-semibold">ID Anak</th>
                            <th className="text-left px-5 py-3.5 font-semibold">ID Kamar</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Tanggal Penempatan</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-16 text-gray-400">
                                    <FaSpinner className="animate-spin mx-auto text-2xl mb-2 text-[#D3AC2B]" />
                                    <p>Memuat data...</p>
                                </td>
                            </tr>
                        ) : penempatans.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-16 text-gray-400">
                                    <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                                    <p>Belum ada data penempatan</p>
                                </td>
                            </tr>
                        ) : (
                            penempatans.map((p, index) => (
                                <tr
                                    key={p.id_penempatan}
                                    className="border-t border-gray-100 hover:bg-amber-50 transition"
                                >
                                    <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                                    <td className="px-5 py-3.5 font-semibold text-[#0f1f3d]">#{p.id_penempatan}</td>
                                    <td className="px-5 py-3.5 text-gray-600">{p.id_anak}</td>
                                    <td className="px-5 py-3.5 text-gray-600">{p.id_kamar}</td>
                                    <td className="px-5 py-3.5 text-gray-600">{p.tanggal_penempatan}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(p.status_penempatan)}`}>
                                            {p.status_penempatan}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}