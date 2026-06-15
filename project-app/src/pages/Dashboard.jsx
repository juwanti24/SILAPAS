import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserFriends, FaDoorOpen, FaClipboardList, FaSpinner, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [anakBinaans, setAnakBinaans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/anak-binaans")
            .then((response) => {
                setAnakBinaans(response.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil data anak binaan:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#0f1f3d]">Dashboard</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Dashboard</p>
                </div>
                <button
                    onClick={() => navigate("/anak-binaan")}
                    className="bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition text-sm"
                >
                    + Tambah Anak Binaan
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {/* Total Anak Binaan */}
                <div
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 hover:shadow-sm transition-shadow"
                    style={{ border: "0.5px solid #E4E6EA", borderLeft: "3px solid #D3AC2B" }}
                >
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#D3AC2B" }}
                    >
                        <FaUserFriends className="text-xl" style={{ color: "#293040" }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            {loading ? "—" : anakBinaans.length}
                        </span>
                        <span className="text-xs mt-0.5 truncate" style={{ color: "#8A90A0" }}>
                            Total Anak Binaan
                        </span>
                    </div>
                </div>

                {/* Kamar Aktif */}
                <div
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 hover:shadow-sm transition-shadow"
                    style={{ border: "0.5px solid #E4E6EA" }}
                >
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#3B475C" }}
                    >
                        <FaDoorOpen className="text-xl" style={{ color: "#FFFFFF" }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            18
                        </span>
                        <span className="text-xs mt-0.5 truncate" style={{ color: "#8A90A0" }}>
                            Kamar Aktif
                        </span>
                    </div>
                </div>

                {/* Pelanggaran Aktif */}
                <div
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 hover:shadow-sm transition-shadow"
                    style={{ border: "0.5px solid #E4E6EA" }}
                >
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#A32D2D" }}
                    >
                        <FaClipboardList className="text-xl" style={{ color: "#FFFFFF" }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            7
                        </span>
                        <span className="text-xs mt-0.5 truncate" style={{ color: "#8A90A0" }}>
                            Pelanggaran Aktif
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabel Anak Binaan */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-[#0f1f3d]">Daftar Anak Binaan</h2>
                    <button
                        onClick={() => navigate("/anak-binaan")}
                        className="text-xs text-[#D3AC2B] font-semibold hover:underline"
                    >
                        Lihat Semua →
                    </button>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#293040] text-[#D3AC2B]">
                            <th className="text-left px-5 py-3.5 font-semibold">#</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Nama Anak</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Jenis Kelamin</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Tanggal Masuk</th>
                            <th className="text-left px-5 py-3.5 font-semibold">ID Pembina</th>
                            <th className="text-left px-5 py-3.5 font-semibold">Alamat</th>
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
                        ) : anakBinaans.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-16 text-gray-400">
                                    <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                                    <p>Belum ada data anak binaan</p>
                                </td>
                            </tr>
                        ) : (
                            anakBinaans.slice(0, 10).map((anak, index) => (
                                <tr
                                    key={anak.id_anak}
                                    className="border-t border-gray-100 hover:bg-amber-50 transition"
                                >
                                    <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                                    <td className="px-5 py-3.5 font-semibold text-[#0f1f3d]">{anak.nama_anak}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                anak.jenis_kelamin === "Laki-laki"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-pink-100 text-pink-700"
                                            }`}
                                        >
                                            {anak.jenis_kelamin}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600">{anak.tanggal_masuk}</td>
                                    <td className="px-5 py-3.5 text-gray-600">{anak.id_pembina}</td>
                                    <td className="px-5 py-3.5 text-gray-600 max-w-[180px] truncate">{anak.alamat}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Footer tabel jika data > 10 */}
                {!loading && anakBinaans.length > 10 && (
                    <div className="px-5 py-3 border-t border-gray-100 text-center">
                        <button
                            onClick={() => navigate("/anak-binaan")}
                            className="text-xs text-gray-400 hover:text-[#D3AC2B] font-medium transition"
                        >
                            +{anakBinaans.length - 10} data lainnya — Lihat semua
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}