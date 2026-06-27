
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSpinner,
  FaInbox,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function Kamar() {
  const [kamars, setKamars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteError, setDeleteError] = useState("");

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
      .catch((error) =>
        console.error("Gagal mengambil data kamar:", error)
      )
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

        setForm({
          nama_kamar: "",
          blok: "",
          kapasitas: "",
          status: "",
        });

        fetchData();
      })
      .catch((error) =>
        console.error("Gagal menyimpan data:", error)
      );
  };

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
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = () => {
    if (!editForm.nama_kamar || !editForm.kapasitas) {
      alert("Nama Kamar dan Kapasitas wajib diisi.");
      return;
    }

    axios
      .put(
        `http://127.0.0.1:8000/api/kamars/${editTarget.id_kamar}`,
        editForm
      )
      .then(() => {
        setEditTarget(null);
        fetchData();
      })
      .catch((error) =>
        console.error("Gagal mengupdate data:", error)
      );
  };

  const handleOpenDelete = (kamar) => {
    setDeleteError("");
    setDeleteTarget(kamar);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/kamars/${deleteTarget.id_kamar}`
      )
      .then(() => {
        setDeleteTarget(null);
        setDeleteError("");
        fetchData();
      })
      .catch((error) => {
        if (error.response?.status === 422) {
          setDeleteError(error.response.data.message);
        } else {
          console.error("Gagal menghapus data:", error);
        }
      });
  };

  const statusColor = (status) => {
    if (!status) {
      return "bg-slate-100 text-slate-500 ring-1 ring-slate-200";
    }

    const s = status.toLowerCase();

    if (s === "aktif") {
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    }

    return "bg-slate-100 text-slate-500 ring-1 ring-slate-200";
  };

  return (
    <div className="min-h-full bg-[#F5F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div
        className="
          relative mb-7 overflow-hidden rounded-3xl
          bg-gradient-to-r from-[#182238] via-[#293040] to-[#3B475C]
          p-6 shadow-[0_18px_45px_rgba(24,34,56,0.18)]
          md:p-8
        "
      >
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[35px] border-white/5" />

        <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#D3AC2B]/10" />

        <div
          className="
            relative z-10 flex flex-col gap-5
            sm:flex-row sm:items-center sm:justify-between
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

              Manajemen Kamar
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Data Kamar
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Kelola informasi kamar, kapasitas, blok, dan status kamar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="
              inline-flex w-fit items-center justify-center
              gap-2 rounded-xl bg-[#D3AC2B]
              px-5 py-3 text-sm font-bold text-[#182238]
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#E5BE3C]
              hover:shadow-xl
              active:scale-95
            "
          >
            <FaPlus
              className={`text-xs transition-transform duration-300 ${
                showForm ? "rotate-45" : ""
              }`}
            />

            {showForm ? "Tutup Form" : "Tambah Kamar"}
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-7 grid gap-4 sm:grid-cols-3">
        <div
          className="
            rounded-2xl border border-slate-200 bg-white
            p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Kamar
          </p>

          <p className="mt-2 text-3xl font-bold text-[#182238]">
            {loading ? "—" : kamars.length}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-slate-200 bg-white
            p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Kamar Aktif
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {loading
              ? "—"
              : kamars.filter(
                  (kamar) =>
                    kamar.status?.toLowerCase() === "aktif"
                ).length}
          </p>
        </div>

        <div
          className="
            rounded-2xl border border-slate-200 bg-white
            p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tidak Aktif
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-500">
            {loading
              ? "—"
              : kamars.filter(
                  (kamar) =>
                    kamar.status?.toLowerCase() !== "aktif"
                ).length}
          </p>
        </div>
      </div>

      {/* Form Tambah */}
      {showForm && (
        <div
          className="
            mb-7 overflow-hidden rounded-3xl
            border border-slate-200 bg-white
            shadow-[0_12px_35px_rgba(15,31,61,0.07)]
          "
        >
          <div
            className="
              flex items-center gap-3
              border-b border-slate-100
              bg-slate-50/70 px-6 py-5
            "
          >
            <div className="h-9 w-1 rounded-full bg-[#D3AC2B]" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Tambah Data Kamar
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Lengkapi data kamar pada form berikut
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Nama Kamar
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="nama_kamar"
                  value={form.nama_kamar}
                  onChange={handleChange}
                  placeholder="Contoh: Kamar A1"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none
                    transition duration-200
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Blok
                </label>

                <input
                  type="text"
                  name="blok"
                  value={form.blok}
                  onChange={handleChange}
                  placeholder="Contoh: A, B, C"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none
                    transition duration-200
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Kapasitas
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="kapasitas"
                  value={form.kapasitas}
                  onChange={handleChange}
                  placeholder="Jumlah kapasitas"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none
                    transition duration-200
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none
                    transition duration-200
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                >
                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">
                    Tidak Aktif
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  rounded-xl border border-slate-200
                  bg-white px-5 py-2.5
                  text-sm font-semibold text-slate-600
                  transition hover:bg-slate-100
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="
                  rounded-xl bg-[#293040]
                  px-6 py-2.5 text-sm
                  font-semibold text-[#D3AC2B]
                  shadow-md transition
                  hover:-translate-y-0.5
                  hover:bg-[#1E2535]
                  hover:shadow-lg
                "
              >
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div
        className="
          overflow-hidden rounded-3xl
          border border-slate-200 bg-white
          shadow-[0_10px_35px_rgba(15,31,61,0.06)]
        "
      >
        <div
          className="
            flex flex-col gap-2 border-b border-slate-100
            px-6 py-5 sm:flex-row
            sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-[#D3AC2B]" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Daftar Kamar
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Seluruh data kamar yang tersimpan dalam sistem
              </p>
            </div>
          </div>

          <span
            className="
              w-fit rounded-full bg-slate-100
              px-3 py-1.5 text-xs font-semibold text-slate-500
            "
          >
            {kamars.length} Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead>
              <tr className="bg-[#293040] text-[#E6C34A]">
                <th className="px-6 py-4 text-left font-semibold">
                  No.
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Nama Kamar
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Blok
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Kapasitas
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-center font-semibold">
                  Aksi
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
              ) : kamars.length === 0 ? (
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
                      Belum ada data kamar
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tambahkan data kamar untuk menampilkannya
                    </p>
                  </td>
                </tr>
              ) : (
                kamars.map((kamar, index) => (
                  <tr
                    key={kamar.id_kamar}
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
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-xl bg-[#293040]
                            text-sm font-bold text-[#D3AC2B]
                          "
                        >
                          {kamar.nama_kamar
                            ?.charAt(0)
                            .toUpperCase() || "K"}
                        </div>

                        <span className="font-semibold text-[#182238]">
                          {kamar.nama_kamar}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="
                          inline-flex min-w-9 items-center
                          justify-center rounded-lg
                          bg-slate-100 px-2.5 py-1
                          text-xs font-semibold text-slate-600
                        "
                      >
                        {kamar.blok ?? "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="font-semibold text-[#182238]">
                        {kamar.kapasitas}
                      </span>{" "}
                      orang
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex rounded-full
                          px-3 py-1.5 text-xs
                          font-semibold
                          ${statusColor(kamar.status)}
                        `}
                      >
                        {kamar.status || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEdit(kamar)
                          }
                          className="
                            inline-flex items-center gap-1.5
                            rounded-lg bg-[#293040]
                            px-3 py-2 text-xs font-semibold
                            text-[#D3AC2B]
                            shadow-sm transition
                            hover:-translate-y-0.5
                            hover:bg-[#1E2535]
                            hover:shadow-md
                          "
                        >
                          <FaEdit className="text-xs" />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenDelete(kamar)
                          }
                          className="
                            inline-flex items-center gap-1.5
                            rounded-lg border border-red-100
                            bg-red-50 px-3 py-2
                            text-xs font-semibold text-red-600
                            transition
                            hover:-translate-y-0.5
                            hover:border-red-200
                            hover:bg-red-100
                          "
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
      </div>

      {/* Modal Edit */}
      {editTarget && (
        <div
          className="
            fixed inset-0 z-50 flex
            items-center justify-center
            p-4 backdrop-blur-sm
          "
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
          }}
        >
          <div
            className="
              w-full max-w-md overflow-hidden
              rounded-3xl bg-white
              shadow-[0_25px_80px_rgba(0,0,0,0.3)]
            "
          >
            <div
              className="
                flex items-center justify-between
                bg-[#293040] px-6 py-5
              "
            >
              <div>
                <h3 className="text-lg font-bold text-white">
                  Edit Data Kamar
                </h3>

                <p className="mt-1 text-xs text-white/50">
                  Perbarui informasi kamar
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  bg-white/10 text-lg font-bold
                  text-white/70 transition
                  hover:bg-white/20 hover:text-white
                "
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Nama Kamar
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="nama_kamar"
                  value={editForm.nama_kamar}
                  onChange={handleEditChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Blok
                </label>

                <input
                  type="text"
                  name="blok"
                  value={editForm.blok}
                  onChange={handleEditChange}
                  placeholder="Contoh: A, B, C"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Kapasitas
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="kapasitas"
                  value={editForm.kapasitas}
                  onChange={handleEditChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Status
                </label>

                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">
                    Tidak Aktif
                  </option>
                </select>
              </div>
            </div>

            <div
              className="
                flex gap-3 border-t border-slate-100
                bg-slate-50/70 px-6 py-5
              "
            >
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="
                  flex-1 rounded-xl border border-slate-200
                  bg-white px-4 py-2.5
                  text-sm font-semibold text-slate-600
                  transition hover:bg-slate-100
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleEditSubmit}
                className="
                  flex-1 rounded-xl bg-[#293040]
                  px-4 py-2.5 text-sm
                  font-semibold text-[#D3AC2B]
                  shadow-md transition
                  hover:bg-[#1E2535]
                  hover:shadow-lg
                "
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteTarget && (
        <div
          className="
            fixed inset-0 z-50 flex
            items-center justify-center
            p-4 backdrop-blur-sm
          "
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
          }}
        >
          <div
            className="
              w-full max-w-sm rounded-3xl
              bg-white p-6
              shadow-[0_25px_80px_rgba(0,0,0,0.3)]
            "
          >
            <div
              className="
                mx-auto mb-5 flex h-16 w-16
                items-center justify-center
                rounded-2xl bg-red-50
                ring-8 ring-red-50/50
              "
            >
              <FaTrash className="text-xl text-red-500" />
            </div>

            <h3 className="text-center text-xl font-bold text-[#182238]">
              Hapus Data Kamar?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Kamar{" "}
              <span className="font-bold text-[#182238]">
                {deleteTarget.nama_kamar}
              </span>{" "}
              akan dihapus secara permanen.
            </p>

            {deleteError && (
              <div
                className="
                  mt-5 rounded-xl border border-red-200
                  bg-red-50 px-4 py-3
                  text-center text-sm leading-5 text-red-600
                "
              >
                {deleteError}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteError("");
                }}
                className="
                  flex-1 rounded-xl border border-slate-200
                  bg-white px-4 py-2.5
                  text-sm font-semibold text-slate-600
                  transition hover:bg-slate-100
                "
              >
                Batal
              </button>

              {!deleteError && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                    flex-1 rounded-xl bg-red-500
                    px-4 py-2.5 text-sm
                    font-semibold text-white
                    shadow-md shadow-red-500/20
                    transition
                    hover:-translate-y-0.5
                    hover:bg-red-600
                    hover:shadow-lg
                  "
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

