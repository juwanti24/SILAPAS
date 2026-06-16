import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSpinner, FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Kamar() {
  const [kamars, setKamars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nama_kamar: "",
    blok: "",
    kapasitas: "",
    status: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/kamars")
      .then((response) => {
        setKamars(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data kamar:", error);
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
      .post("http://127.0.0.1:8000/api/kamars", form)
      .then(() => {
        setShowForm(false);
        setForm({ nama_kamar: "", blok: "", kapasitas: "", status: "" });
        fetchData();
      })
      .catch((error) => {
        console.error("Gagal menyimpan data:", error);
      });
  };

  const statusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-500";
    const s = status.toLowerCase();
    if (s === "aktif" || s === "tersedia") return "bg-green-100 text-green-700";
    if (s === "penuh") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1f3d]">Data Kamar</h1>
          <p className="text-sm text-gray-400 mt-0.5">Dashboard / Data Kamar</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
        >
          <FaPlus />
          Tambah Kamar
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
            Tambah Data Kamar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Nama Kamar
              </label>
              <input
                type="text"
                name="nama_kamar"
                value={form.nama_kamar}
                onChange={handleChange}
                placeholder="Contoh: Kamar A1"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Blok
              </label>
              <input
                type="text"
                name="blok"
                value={form.blok}
                onChange={handleChange}
                placeholder="Contoh: A, B, C"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Kapasitas
              </label>
              <input
                type="number"
                name="kapasitas"
                value={form.kapasitas}
                onChange={handleChange}
                placeholder="Jumlah kapasitas"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              >
                <option value="">Pilih Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Penuh">Penuh</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
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
              <th className="text-left px-5 py-3.5 font-semibold">
                Nama Kamar
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">Blok</th>
              <th className="text-left px-5 py-3.5 font-semibold">Kapasitas</th>
              <th className="text-left px-5 py-3.5 font-semibold">Status</th>
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
            ) : kamars.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-400">
                  <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                  <p>Belum ada data kamar</p>
                </td>
              </tr>
            ) : (
              kamars.map((kamar, index) => (
                <tr
                  key={kamar.id_kamar}
                  className="border-t border-gray-100 hover:bg-amber-50 transition"
                >
                  <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                  <td className="px-5 py-3.5 font-semibold">
                    <Link
                      to={`/kamar/${kamar.id_kamar}`}
                      className="text-[#0f1f3d] hover:text-[#D3AC2B] transition"
                    >
                      {kamar.nama_kamar}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{kamar.blok}</td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {kamar.kapasitas} orang
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(kamar.status)}`}
                    >
                      {kamar.status}
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
