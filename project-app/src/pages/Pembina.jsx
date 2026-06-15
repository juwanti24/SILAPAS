import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus, FaSpinner, FaInbox } from "react-icons/fa";

export default function Pembina() {
    const [pembinas, setPembinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nama_pembina: "",
        jenis_kelamin: "",
        no_hp: "",
        alamat: "",
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:8000/api/pembinas")
            .then((response) => {
                setPembinas(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data pembina:", error);
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
            .post("http://127.0.0.1:8000/api/pembinas", form)
            .then(() => {
                setShowForm(false);
                setForm({ nama_pembina: "", jenis_kelamin: "", no_hp: "", alamat: "" });
                fetchData();
            })
            .catch((error) => {
                console.error("Gagal menyimpan data:", error);
            });
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">Data Pembina</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Dashboard / Data Pembina</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
                >
                    <FaUserPlus />
                    Tambah Pembina
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
                        Tambah Data Pembina
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Nama Pembina</label>
                            <input
                                type="text"
                                name="nama_pembina"
                                value={form.nama_pembina}
                                onChange={handleChange}
                                placeholder="Nama lengkap"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Jenis Kelamin</label>
                            <select
                                name="jenis_kelamin"
                                value={form.jenis_kelamin}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">No HP</label>
                            <input
                                type="text"
                                name="no_hp"
                                value={form.no_hp}
                                onChange={handleChange}
                                placeholder="08xx-xxxx-xxxx"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">Alamat</label>
                            <input
                                type="text"
                                name="alamat"
                                value={form.alamat}
                                onChange={handleChange}
                                placeholder="Alamat lengkap"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                            />
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
                            <th className="text-left px-5 py-3.5 font-semibold">Nama Pembina</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Jenis Kelamin</th>
                            <th className="text-left px-5 py-3.5 font-semibold">No HP</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-16 text-gray-400">
                                    <FaSpinner className="animate-spin mx-auto text-2xl mb-2 text-[#D3AC2B]" />
                                    <p>Memuat data...</p>
                                </td>
                            </tr>
                        ) : pembinas.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-16 text-gray-400">
                                    <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                                    <p>Belum ada data pembina</p>
                                </td>
                            </tr>
                        ) : (
                            pembinas.map((pembina, index) => (
                                <tr
                                    key={pembina.id_pembina}
                                    className="border-t border-gray-100 hover:bg-amber-50 transition"
                                >
                                    <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                                    <td className="px-5 py-3.5 font-semibold text-[#0f1f3d]">{pembina.nama_pembina}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                pembina.jenis_kelamin === "Laki-laki"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-pink-100 text-pink-700"
                                            }`}
                                        >
                                            {pembina.jenis_kelamin}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600">{pembina.no_hp}</td>
                                    <td className="px-5 py-3.5 text-gray-600 max-w-[200px] truncate">{pembina.alamat}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}