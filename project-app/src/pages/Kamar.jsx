import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSpinner, FaInbox, FaEdit, FaTrash } from "react-icons/fa";

export default function Kamar() {
  const [kamars, setKamars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  // state untuk modal edit
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({
    nama_kamar: "",
    blok: "",
    kapasitas: "",
    status: "",
  });

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
      .then((response) => setKamars(response.data))
      .catch((error) => console.error("Gagal mengambil data kamar:", error))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nama_kamar || !form.kapasitas) {
      alert("Nama Kamar dan Kapasitas wajib diisi.");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/kamars", form)
      .then(() => {
        setShowForm(false);
        setForm({ nama_kamar: "", blok: "", kapasitas: "", status: "" });
        fetchData();
      })
      .catch((error) => console.error("Gagal menyimpan data:", error));
  };

  // Buka modal edit dan isi form
  const handleOpenEdit = (kamar) => {
    setEditTarget(kamar);
    setEditForm({
      nama_kamar: kamar.nama_kamar,
      blok: kamar.blok ?? "",
      kapasitas: kamar.kapasitas,
      status: kamar.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (!editForm.nama_kamar || !editForm.kapasitas) {
      alert("Nama Kamar dan Kapasitas wajib diisi.");
      return;
    }
    axios
      .put(`http://127.0.0.1:8000/api/kamars/${editTarget.id_kamar}`, editForm)
      .then(() => {
        setEditTarget(null);
        fetchData();
      })
      .catch((error) => console.error("Gagal mengupdate data:", error));
  };

  // Buka modal hapus — cek dulu apakah ada penghuni
  const handleOpenDelete = (kamar) => {
    setDeleteError("");
    setDeleteTarget(kamar);
  };

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/kamars/${deleteTarget.id_kamar}`)
      .then(() => {
        setDeleteTarget(null);
        setDeleteError("");
        fetchData();
      })
      .catch((error) => {
        // Jika backend kirim 422 karena kamar masih ada penghuni
        if (error.response?.status === 422) {
          setDeleteError(error.response.data.message);
        } else {
          console.error("Gagal menghapus data:", error);
        }
      });
  };

  const statusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-500";
    const s = status.toLowerCase();
    if (s === "aktif") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-500"; // Tidak Aktif
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

      {/* Form Tambah */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
            Tambah Data Kamar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Nama Kamar <span className="text-red-400">*</span>
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
                Kapasitas <span className="text-red-400">*</span>
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
              <th className="text-center px-5 py-3.5 font-semibold">Aksi</th>
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
            ) : kamars.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-16 text-gray-400">
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
                  <td className="px-5 py-3.5 font-semibold text-[#0f1f3d]">
                    {kamar.nama_kamar}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {kamar.blok ?? "-"}
                  </td>
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
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(kamar)}
                        className="flex items-center gap-1.5 bg-[#293040] text-[#D3AC2B] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#1e2535] transition"
                      >
                        <FaEdit className="text-xs" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDelete(kamar)}
                        className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                      >
                        <FaTrash className="text-xs" />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Kamar */}
      {editTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#0f1f3d] text-lg">
                Edit Data Kamar
              </h3>
              <button
                onClick={() => setEditTarget(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Nama Kamar <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nama_kamar"
                  value={editForm.nama_kamar}
                  onChange={handleEditChange}
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
                  value={editForm.blok}
                  onChange={handleEditChange}
                  placeholder="Contoh: A, B, C"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Kapasitas <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="kapasitas"
                  value={editForm.kapasitas}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Status
                </label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditTarget(null)}
                className="flex-1 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-[#293040] text-[#D3AC2B] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1e2535] transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h3 className="text-center font-bold text-[#0f1f3d] text-lg mb-1">
              Hapus Data Kamar?
            </h3>
            <p className="text-center text-gray-500 text-sm mb-4">
              Kamar{" "}
              <span className="font-semibold text-[#0f1f3d]">
                {deleteTarget.nama_kamar}
              </span>{" "}
              akan dihapus permanen.
            </p>

            {/* Pesan error jika kamar masih ada penghuni */}
            {deleteError && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-4 text-center">
                {deleteError}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                className="flex-1 bg-gray-100 text-gray-600 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
              >
                Batal
              </button>
              {/* Tombol hapus disembunyikan jika ada error penghuni */}
              {!deleteError && (
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition"
                >
                  Ya, Hapus
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
