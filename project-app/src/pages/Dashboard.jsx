import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUserFriends,
    FaDoorOpen,
    FaClipboardList,
    FaSpinner,
    FaInbox,
    FaArrowRight,
    FaPlus,
    FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StatCard({
    icon: Icon,
    value,
    label,
    description,
    iconBackground,
    iconColor = "#FFFFFF",
    accentColor,
    loading,
}) {
    return (
        <div
            className="
                group relative overflow-hidden rounded-2xl border
                border-slate-200 bg-white p-5
                shadow-[0_8px_25px_rgba(15,31,61,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_35px_rgba(15,31,61,0.12)]
            "
        >
            <div
                className="absolute left-0 top-0 h-full w-1"
                style={{ backgroundColor: accentColor }}
            />

            <div
                className="absolute -right-7 -top-7 h-24 w-24 rounded-full opacity-[0.06]"
                style={{ backgroundColor: accentColor }}
            />

            <div className="relative flex items-center gap-4">
                <div
                    className="
                        flex h-14 w-14 shrink-0 items-center justify-center
                        rounded-2xl transition-transform duration-300
                        group-hover:scale-105
                    "
                    style={{ backgroundColor: iconBackground }}
                >
                    <Icon
                        className="text-2xl"
                        style={{ color: iconColor }}
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    <h3 className="mt-1 text-3xl font-bold tracking-tight text-[#182238]">
                        {loading ? (
                            <span className="text-slate-300">—</span>
                        ) : (
                            value
                        )}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}


export default function Dashboard() {
    const navigate = useNavigate();

    const [anakBinaans, setAnakBinaans] = useState([]);
    const [kamar, setKamar] = useState([]);
    const [pelanggarans, setPelanggarans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pelanggaranLoading, setPelanggaranLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getAnakBinaans = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/anak-binaans"
                );

                setAnakBinaans(response.data);
            } catch (err) {
                console.error(
                    "Gagal mengambil data anak binaan:",
                    err
                );

                setError(
                    "Data gagal dimuat. Pastikan server Laravel sudah dijalankan."
                );
            } finally {
                setLoading(false);
            }
        };

        getAnakBinaans();
    }, []);

      useEffect(() => {
        const getKamar = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/kamars"
                );

                setKamar(response.data);
            } catch (err) {
                console.error(
                    "Gagal mengambil data kamar:",
                    err
                );

                setError(
                    "Data gagal dimuat. Pastikan server Laravel sudah dijalankan."
                );
            } finally {
                setLoading(false);
            }
        };

        getKamar();
    }, []);

    useEffect(() => {
        const getPelanggarans = async () => {
            try {
                setPelanggaranLoading(true);

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/pelanggarans"
                );

                setPelanggarans(response.data);
            } catch (err) {
                console.error(
                    "Gagal mengambil data pelanggaran:",
                    err
                );
            } finally {
                setPelanggaranLoading(false);
            }
        };

        getPelanggarans();
    }, []);

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const activePelanggaranCount = pelanggarans.filter(
        (p) => p.status === "Belum Selesai"
    ).length;

    const totalPelanggaranCount =
        activePelanggaranCount;

    return (
        <div className="min-h-full bg-[#F5F7FB] p-4 md:p-6 lg:p-8">
            {/* Hero Dashboard */}
            <div
                className="
                    relative mb-7 overflow-hidden rounded-3xl
                    bg-gradient-to-r from-[#182238]
                    via-[#293040] to-[#3B475C]
                    p-6 shadow-[0_18px_45px_rgba(24,34,56,0.18)]
                    md:p-8
                "
            >
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[35px] border-white/5" />
                <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#D3AC2B]/10" />

                <div
                    className="
                        relative z-10 flex flex-col gap-5
                        md:flex-row md:items-center md:justify-between
                    "
                >
                    <div>
                        <div
                            className="
                                mb-3 inline-flex items-center gap-2
                                rounded-full border border-white/10
                                bg-white/10 px-3 py-1.5
                                text-xs font-medium text-slate-200
                                backdrop-blur-sm
                            "
                        >
                            <span className="h-2 w-2 rounded-full bg-[#D3AC2B]" />
                            Ringkasan Sistem LPKA
                        </div>

                        <h1 className="text-2xl font-bold text-white md:text-3xl">
                            Selamat Datang, Admin
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                            Pantau data anak binaan, kamar, dan
                            pelanggaran melalui dashboard sistem.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/anak-binaan")}
                        className="
                            inline-flex w-fit items-center justify-center
                            gap-2 rounded-xl bg-[#D3AC2B]
                            px-5 py-3 text-sm font-bold text-[#182238]
                            shadow-lg shadow-black/10
                            transition-all duration-300
                            hover:-translate-y-0.5 hover:bg-[#E5BE3C]
                            hover:shadow-xl
                        "
                    >
                        <FaPlus className="text-xs" />
                        Tambah Anak Binaan
                    </button>
                </div>
            </div>

            {/* Statistik */}
            <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    icon={FaUserFriends}
                    value={anakBinaans.length}
                    label="Total Anak Binaan"
                    description="Data yang tersimpan dalam sistem"
                    iconBackground="#D3AC2B"
                    iconColor="#182238"
                    accentColor="#D3AC2B"
                    loading={loading}
                />

                <StatCard
                    icon={FaDoorOpen}
                    value={kamar.length}
                    label="Kamar Aktif"
                    description="Kamar yang tersedia dan aktif"
                    iconBackground="#3B475C"
                    accentColor="#3B475C"
                    loading={false}
                />

                <StatCard
                    icon={FaClipboardList}
                    value={totalPelanggaranCount}
                    label="Pelanggaran Aktif"
                    description="Pelanggaran yang belum selesai"
                    iconBackground="#B93636"
                    accentColor="#B93636"
                    loading={pelanggaranLoading}
                />
            </div>

            {/* Tabel Anak Binaan */}
            <div
                className="
                    overflow-hidden rounded-3xl border border-slate-200
                    bg-white shadow-[0_10px_35px_rgba(15,31,61,0.06)]
                "
            >
                {/* Header Tabel */}
                <div
                    className="
                        flex flex-col gap-4 border-b border-slate-100
                        px-5 py-5 sm:flex-row sm:items-center
                        sm:justify-between md:px-6
                    "
                >
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-[#D3AC2B]" />

                            <div>
                                <h2 className="text-lg font-bold text-[#182238]">
                                    Daftar Anak Binaan
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Menampilkan maksimal 10 data terbaru
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/anak-binaan")}
                        className="
                            inline-flex items-center gap-2 text-sm
                            font-semibold text-[#B38D16]
                            transition hover:text-[#7D610B]
                        "
                    >
                        Lihat Semua
                        <FaArrowRight className="text-xs" />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 md:mx-6">
                        <FaExclamationTriangle className="mt-0.5 shrink-0" />

                        <div>
                            <p className="text-sm font-semibold">
                                Gagal memuat data
                            </p>

                            <p className="mt-1 text-xs text-red-600">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                        <thead>
                            <tr className="bg-[#293040] text-[#E6C34A]">
                                <th className="px-6 py-4 text-left font-semibold">
                                    No.
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Nama Anak
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Jenis Kelamin
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Tanggal Masuk
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    ID Pembina
                                </th>

                                <th className="px-6 py-4 text-left font-semibold">
                                    Alamat
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-20 text-center"
                                    >
                                        <FaSpinner className="mx-auto mb-3 animate-spin text-3xl text-[#D3AC2B]" />

                                        <p className="font-medium text-slate-500">
                                            Memuat data...
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Mohon tunggu sebentar
                                        </p>
                                    </td>
                                </tr>
                            ) : anakBinaans.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-20 text-center"
                                    >
                                        <div
                                            className="
                                                mx-auto mb-4 flex h-16 w-16
                                                items-center justify-center
                                                rounded-2xl bg-slate-100
                                            "
                                        >
                                            <FaInbox className="text-3xl text-slate-300" />
                                        </div>

                                        <p className="font-semibold text-slate-600">
                                            Belum ada data anak binaan
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Tambahkan data untuk menampilkannya
                                            di dashboard
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                anakBinaans
                                    .slice(0, 10)
                                    .map((anak, index) => (
                                        <tr
                                            key={
                                                anak.id_anak ??
                                                index
                                            }
                                            className="
                                                border-t border-slate-100
                                                transition-colors duration-200
                                                odd:bg-white even:bg-slate-50/50
                                                hover:bg-amber-50/70
                                            "
                                        >
                                            <td className="px-6 py-4">
                                                <div
                                                    className="
                                                        flex h-8 w-8 items-center
                                                        justify-center rounded-lg
                                                        bg-slate-100 text-xs
                                                        font-bold text-slate-500
                                                    "
                                                >
                                                    {index + 1}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="
                                                            flex h-9 w-9 shrink-0
                                                            items-center justify-center
                                                            rounded-full bg-[#293040]
                                                            text-xs font-bold
                                                            text-[#E6C34A]
                                                        "
                                                    >
                                                        {anak.nama_anak
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                            "A"}
                                                    </div>

                                                    <span className="font-semibold text-[#182238]">
                                                        {anak.nama_anak}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`
                                                        inline-flex rounded-full
                                                        px-3 py-1.5 text-xs
                                                        font-semibold
                                                        ${
                                                            anak.jenis_kelamin ===
                                                            "Laki-laki"
                                                                ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                                                : "bg-pink-50 text-pink-700 ring-1 ring-pink-200"
                                                        }
                                                    `}
                                                >
                                                    {anak.jenis_kelamin ||
                                                        "-"}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                                {formatDate(
                                                    anak.tanggal_masuk
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                {anak.id_pembina ? (
                                                    <span
                                                        className="
                                                            inline-flex rounded-lg
                                                            bg-slate-100 px-2.5
                                                            py-1 text-xs font-semibold
                                                            text-slate-600
                                                        "
                                                    >
                                                        #{anak.id_pembina}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400">
                                                        Belum ada
                                                    </span>
                                                )}
                                            </td>

                                            <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                                                {anak.alamat || "-"}
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && anakBinaans.length > 10 && (
                    <div
                        className="
                            flex items-center justify-center
                            border-t border-slate-100
                            bg-slate-50/70 px-5 py-4
                        "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/anak-binaan")
                            }
                            className="
                                inline-flex items-center gap-2
                                text-sm font-semibold text-slate-500
                                transition hover:text-[#B38D16]
                            "
                        >
                            Lihat {anakBinaans.length - 10} data lainnya
                            <FaArrowRight className="text-xs" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}