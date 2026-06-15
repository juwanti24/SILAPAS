import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ import Link
import { FaUserPlus, FaSpinner, FaInbox, FaSearch } from "react-icons/fa";

export default function AnakBinaan() {
  const [anakBinaans, setAnakBinaans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    nama_anak: "",
    tanggal_lahir: "",
    tanggal_masuk: "",
    jenis_kelamin: "",
    alamat: "",
    id_pembina: "",
  });

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/api/anak-binaans?search=${query}`)
        .then((response) => {
          setAnakBinaans(response.data);
        })
        .catch((error) => {
          console.error("Gagal mengambil data anak binaan:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/anak-binaans", form)
      .then(() => {
        setShowForm(false);
        setForm({
          nama_anak: "",
          tanggal_lahir: "",
          tanggal_masuk: "",
          jenis_kelamin: "",
          alamat: "",
          id_pembina: "",
        });
        setQuery("");
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
          <h1 className="text-2xl font-bold text-[#0f1f3d]">
            Data Anak Binaan
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Dashboard / Data Anak Binaan
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
        >
          <FaUserPlus />
          Tambah Anak Binaan
        </button>
      </div>

      {/* Form Tambah */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
            Tambah Data Anak Binaan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Nama Anak
              </label>
              <input
                type="text"
                name="nama_anak"
                value={form.nama_anak}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Jenis Kelamin
              </label>
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
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Tanggal Masuk
              </label>
              <input
                type="date"
                name="tanggal_masuk"
                value={form.tanggal_masuk}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Alamat
              </label>
              <input
                type="text"
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                placeholder="Alamat lengkap"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                ID Pembina
              </label>
              <input
                type="number"
                name="id_pembina"
                value={form.id_pembina}
                onChange={handleChange}
                placeholder="ID Pembina"
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

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama anak binaan..."
          className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D3AC2B] transition"
        />
        {loading && (
          <FaSpinner className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-[#D3AC2B]" />
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#293040] text-[#D3AC2B]">
              <th className="text-left px-5 py-3.5 font-semibold">#</th>
              <th className="text-left px-5 py-3.5 font-semibold">Nama Anak</th>
              <th className="text-left px-5 py-3.5 font-semibold">
                Jenis Kelamin
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">
                Tanggal Lahir
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">
                Tanggal Masuk
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">
                ID Pembina
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">Alamat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400">
                  <FaSpinner className="animate-spin mx-auto text-2xl mb-2 text-[#D3AC2B]" />
                  <p>Memuat data...</p>
                </td>
              </tr>
            ) : anakBinaans.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400">
                  <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                  <p>
                    {query
                      ? `Tidak ada hasil untuk "${query}"`
                      : "Belum ada data anak binaan"}
                  </p>
                </td>
              </tr>
            ) : (
              anakBinaans.map((anak, index) => (
                <tr
                  key={anak.id_anak}
                  className="border-t border-gray-100 hover:bg-amber-50 transition"
                >
                  <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                  <td className="px-5 py-3.5">
                    {/* ✅ Nama jadi link ke halaman detail */}
                    <span className="font-semibold text-[#0f1f3d]">
                      {anak.nama_anak}
                    </span>
                  </td>
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
                  <td className="px-5 py-3.5 text-gray-600">
                    {anak.tanggal_lahir}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {anak.tanggal_masuk}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {anak.id_pembina}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 max-w-[200px] truncate">
                    {anak.alamat}
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
