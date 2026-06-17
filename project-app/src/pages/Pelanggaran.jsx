import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSpinner, FaInbox, FaEdit } from "react-icons/fa";

export default function Pelanggaran() {
  const [pelanggarans, setPelanggarans] = useState([]);
  const [anakList, setAnakList] = useState([]); // list anak untuk dropdown
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({
    jenis_pelanggaran: "",
    deskripsi: "",
    sanksi: "",
    tanggal_pelanggaran: "",
    status: "",
  });

  const [form, setForm] = useState({
    id_anak: "",
    jenis_pelanggaran: "",
    deskripsi: "",
    sanksi: "",
    tanggal_pelanggaran: "",
  });

  useEffect(() => {
    fetchData();
    fetchAnakList();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/pelanggarans")
      .then((response) => setPelanggarans(response.data))
      .catch((error) =>
        console.error("Gagal mengambil data pelanggaran:", error),
      )
      .finally(() => setLoading(false));
  };

  // Fetch semua anak binaan untuk isi dropdown
  const fetchAnakList = () => {
    axios
      .get("http://127.0.0.1:8000/api/anak-binaans")
      .then((response) => setAnakList(response.data))
      .catch((error) => console.error("Gagal mengambil data anak:", error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id_anak || !form.jenis_pelanggaran || !form.tanggal_pelanggaran) {
      alert("Nama Anak, Jenis Pelanggaran, dan Tanggal wajib diisi.");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/pelanggarans", form)
      .then(() => {
        setShowForm(false);
        setForm({
          id_anak: "",
          jenis_pelanggaran: "",
          deskripsi: "",
          sanksi: "",
          tanggal_pelanggaran: "",
        });
        fetchData();
      })
      .catch((error) => console.error("Gagal menyimpan data:", error));
  };

  const handleOpenEdit = (p) => {
    setEditTarget(p);
    setEditForm({
      jenis_pelanggaran: p.jenis_pelanggaran,
      deskripsi: p.deskripsi ?? "",
      sanksi: p.sanksi ?? "",
      tanggal_pelanggaran: p.tanggal_pelanggaran,
      status: p.status ?? "Belum Selesai",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/pelanggarans/${editTarget.id_pelanggaran}`,
        editForm,
      )
      .then(() => {
        setEditTarget(null);
        fetchData();
      })
      .catch((error) => console.error("Gagal mengupdate data:", error));
  };

  const statusBadge = (status) => {
    if (!status || status === "Belum Selesai")
      return "bg-red-50 text-red-700 border border-red-100";
    if (status === "Dalam Proses")
      return "bg-yellow-50 text-yellow-700 border border-yellow-100";
    return "bg-green-50 text-green-700 border border-green-100";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1f3d]">
            Pelanggaran & Sanksi
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Dashboard / Pelanggaran & Sanksi
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
        >
          <FaPlus />
          Tambah Pelanggaran
        </button>
      </div>

      {/* Form Tambah */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-[#0f1f3d] border-b border-gray-100 pb-3">
            Tambah Data Pelanggaran
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Dropdown nama anak — value yang dikirim tetap id_anak */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Nama Anak <span className="text-red-400">*</span>
              </label>
              <select
                name="id_anak"
                value={form.id_anak}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              >
                <option value="">-- Pilih Anak Binaan --</option>
                {anakList.map((anak) => (
                  <option key={anak.id_anak} value={anak.id_anak}>
                    {anak.nama_anak}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Jenis Pelanggaran <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="jenis_pelanggaran"
                value={form.jenis_pelanggaran}
                onChange={handleChange}
                placeholder="Jenis pelanggaran"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Tanggal Pelanggaran <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="tanggal_pelanggaran"
                value={form.tanggal_pelanggaran}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi pelanggaran"
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Sanksi
              </label>
              <textarea
                name="sanksi"
                value={form.sanksi}
                onChange={handleChange}
                placeholder="Sanksi yang diberikan"
                rows={2}
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
              <th className="text-left px-5 py-3.5 font-semibold">Nama Anak</th>
              <th className="text-left px-5 py-3.5 font-semibold">
                Jenis Pelanggaran
              </th>
              <th className="text-left px-5 py-3.5 font-semibold">Sanksi</th>
              <th className="text-left px-5 py-3.5 font-semibold">Tanggal</th>
              <th className="text-center px-5 py-3.5 font-semibold">Status</th>
              <th className="text-center px-5 py-3.5 font-semibold">Aksi</th>
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
            ) : pelanggarans.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400">
                  <FaInbox className="mx-auto text-3xl mb-2 opacity-40" />
                  <p>Belum ada data pelanggaran</p>
                </td>
              </tr>
            ) : (
              pelanggarans.map((p, index) => (
                <tr
                  key={p.id_pelanggaran}
                  className="border-t border-gray-100 hover:bg-amber-50 transition"
                >
                  <td className="px-5 py-3.5 text-gray-400">{index + 1}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#0f1f3d]">
                    {p.nama_anak ?? (
                      <span className="text-gray-400 italic">-</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">
                    {p.jenis_pelanggaran}
                  </td>
                  <td className="px-5 py-3.5 max-w-[160px] truncate text-gray-600">
                    {p.sanksi ?? "-"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {p.tanggal_pelanggaran}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge(p.status)}`}
                    >
                      {p.status ?? "Belum Selesai"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="flex items-center gap-1.5 mx-auto bg-[#293040] text-[#D3AC2B] px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#1e2535] transition"
                    >
                      <FaEdit className="text-xs" />
                      Edit Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Status */}
      {editTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#0f1f3d] text-lg">
                Edit Data Pelanggaran
              </h3>
              <button
                onClick={() => setEditTarget(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Info anak */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5 mb-4 text-sm">
              <span className="text-gray-500">Anak: </span>
              <span className="font-semibold text-[#0f1f3d]">
                {editTarget.nama_anak}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Jenis Pelanggaran
                </label>
                <input
                  type="text"
                  name="jenis_pelanggaran"
                  value={editForm.jenis_pelanggaran}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={editForm.deskripsi}
                  onChange={handleEditChange}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Sanksi
                </label>
                <textarea
                  name="sanksi"
                  value={editForm.sanksi}
                  onChange={handleEditChange}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Tanggal Pelanggaran
                </label>
                <input
                  type="date"
                  name="tanggal_pelanggaran"
                  value={editForm.tanggal_pelanggaran}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Status Penyelesaian
                </label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AC2B]"
                >
                  <option value="Belum Selesai">Belum Selesai</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Selesai">Selesai</option>
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
    </div>
  );
}
