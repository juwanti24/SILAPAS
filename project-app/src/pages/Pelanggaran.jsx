import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSpinner,
  FaInbox,
  FaEdit,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Pelanggaran() {
  const [pelanggarans, setPelanggarans] = useState([]);
  const [anakList, setAnakList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editTarget, setEditTarget] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Notifikasi pop up (pengganti alert bawaan browser)
  const [notif, setNotif] = useState(null);
  // notif: { type: "success" | "error", title: string, message: string }

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

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/pelanggarans"
      );

      setPelanggarans(response.data);
    } catch (error) {
      console.error(
        "Gagal mengambil data pelanggaran:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAnakList = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/anak-binaans"
      );

      setAnakList(response.data);
    } catch (error) {
      console.error(
        "Gagal mengambil data anak binaan:",
        error
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((formLama) => ({
      ...formLama,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.id_anak ||
      !form.jenis_pelanggaran.trim() ||
      !form.tanggal_pelanggaran
    ) {
      setNotif({
        type: "error",
        title: "Data Belum Lengkap",
        message:
          "Nama Anak, Jenis Pelanggaran, dan Tanggal wajib diisi.",
      });
      return;
    }

    try {
      setSaving(true);

      await axios.post(
        "http://127.0.0.1:8000/api/pelanggarans",
        {
          id_anak: form.id_anak,
          jenis_pelanggaran:
            form.jenis_pelanggaran.trim(),
          deskripsi: form.deskripsi.trim(),
          sanksi: form.sanksi.trim(),
          tanggal_pelanggaran:
            form.tanggal_pelanggaran,
        }
      );

      setForm({
        id_anak: "",
        jenis_pelanggaran: "",
        deskripsi: "",
        sanksi: "",
        tanggal_pelanggaran: "",
      });

      setShowForm(false);

      await fetchData();

      setNotif({
        type: "success",
        title: "Berhasil Disimpan",
        message: "Data pelanggaran berhasil disimpan.",
      });
    } catch (error) {
      console.error(
        "Gagal menyimpan data pelanggaran:",
        error
      );

      const pesanError =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Data gagal disimpan. Pastikan server Laravel sudah berjalan.";

      setNotif({
        type: "error",
        title: "Gagal Menyimpan",
        message: pesanError,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleOpenEdit = (pelanggaran) => {
    setEditTarget(pelanggaran);

    setEditForm({
      jenis_pelanggaran:
        pelanggaran.jenis_pelanggaran || "",
      deskripsi: pelanggaran.deskripsi || "",
      sanksi: pelanggaran.sanksi || "",
      tanggal_pelanggaran:
        pelanggaran.tanggal_pelanggaran || "",
      status:
        pelanggaran.status || "Belum Selesai",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((formLama) => ({
      ...formLama,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (
      !editForm.jenis_pelanggaran.trim() ||
      !editForm.tanggal_pelanggaran
    ) {
      setNotif({
        type: "error",
        title: "Data Belum Lengkap",
        message:
          "Jenis Pelanggaran dan Tanggal wajib diisi.",
      });
      return;
    }

    try {
      setSavingEdit(true);

      await axios.put(
        `http://127.0.0.1:8000/api/pelanggarans/${editTarget.id_pelanggaran}`,
        {
          jenis_pelanggaran:
            editForm.jenis_pelanggaran.trim(),
          deskripsi: editForm.deskripsi.trim(),
          sanksi: editForm.sanksi.trim(),
          tanggal_pelanggaran:
            editForm.tanggal_pelanggaran,
          status: editForm.status,
        }
      );

      setEditTarget(null);

      await fetchData();

      setNotif({
        type: "success",
        title: "Berhasil Diperbarui",
        message: "Data pelanggaran berhasil diperbarui.",
      });
    } catch (error) {
      console.error(
        "Gagal memperbarui data pelanggaran:",
        error
      );

      setNotif({
        type: "error",
        title: "Gagal Memperbarui",
        message:
          error.response?.data?.message ||
          "Data pelanggaran gagal diperbarui.",
      });
    } finally {
      setSavingEdit(false);
    }
  };

  const statusBadge = (status) => {
    if (!status || status === "Belum Selesai") {
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    }

    if (status === "Dalam Proses") {
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    }

    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  };

  const jumlahBelumSelesai = pelanggarans.filter(
    (item) =>
      !item.status ||
      item.status === "Belum Selesai"
  ).length;

  const jumlahDalamProses = pelanggarans.filter(
    (item) => item.status === "Dalam Proses"
  ).length;

  const jumlahSelesai = pelanggarans.filter(
    (item) => item.status === "Selesai"
  ).length;

  return (
    <div className="min-h-full bg-[#F5F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div
        className="
          relative mb-7 overflow-hidden rounded-3xl
          bg-gradient-to-r from-[#182238]
          via-[#293040] to-[#3B475C]
          p-6
          shadow-[0_18px_45px_rgba(24,34,56,0.18)]
          md:p-8
        "
      >
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[35px] border-white/5" />

        <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-red-400/10" />

        <div
          className="
            relative z-10 flex flex-col gap-5
            sm:flex-row sm:items-center
            sm:justify-between
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
              <span className="h-2 w-2 rounded-full bg-red-400" />

              Manajemen Pelanggaran
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Pelanggaran & Sanksi
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Kelola data pelanggaran, sanksi, dan
              status penyelesaian anak binaan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="
              inline-flex w-fit items-center
              justify-center gap-2 rounded-xl
              bg-[#D3AC2B] px-5 py-3
              text-sm font-bold text-[#182238]
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#E5BE3C]
              hover:shadow-xl
              active:scale-95
            "
          >
            <FaPlus
              className={`
                text-xs transition-transform
                duration-300
                ${showForm ? "rotate-45" : ""}
              `}
            />

            {showForm
              ? "Tutup Form"
              : "Tambah Pelanggaran"}
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#D3AC2B]" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Pelanggaran
          </p>

          <p className="mt-2 text-3xl font-bold text-[#182238]">
            {loading ? "—" : pelanggarans.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Seluruh data pelanggaran
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Belum Selesai
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "—" : jumlahBelumSelesai}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Belum ditindaklanjuti
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-amber-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dalam Proses
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {loading ? "—" : jumlahDalamProses}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Sedang ditindaklanjuti
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_25px_rgba(15,31,61,0.05)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selesai
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {loading ? "—" : jumlahSelesai}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Sudah diselesaikan
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
            <div className="h-9 w-1 rounded-full bg-red-500" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Tambah Data Pelanggaran
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Lengkapi data pelanggaran pada form berikut
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Nama Anak
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <select
                  name="id_anak"
                  value={form.id_anak}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border
                    border-slate-200 bg-slate-50/50
                    px-4 py-3 text-sm text-slate-700
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                >
                  <option value="">
                    Pilih Anak Binaan
                  </option>

                  {anakList.map((anak) => (
                    <option
                      key={anak.id_anak}
                      value={anak.id_anak}
                    >
                      {anak.nama_anak}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Jenis Pelanggaran
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="jenis_pelanggaran"
                  value={form.jenis_pelanggaran}
                  onChange={handleChange}
                  placeholder="Jenis pelanggaran"
                  className="
                    w-full rounded-xl border
                    border-slate-200 bg-slate-50/50
                    px-4 py-3 text-sm text-slate-700
                    outline-none transition
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Tanggal Pelanggaran
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="date"
                  name="tanggal_pelanggaran"
                  value={form.tanggal_pelanggaran}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border
                    border-slate-200 bg-slate-50/50
                    px-4 py-3 text-sm text-slate-700
                    outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Deskripsi
                </label>

                <textarea
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  placeholder="Deskripsi pelanggaran"
                  rows={4}
                  className="
                    w-full resize-none rounded-xl
                    border border-slate-200
                    bg-slate-50/50 px-4 py-3
                    text-sm text-slate-700 outline-none
                    transition placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Sanksi
                </label>

                <textarea
                  name="sanksi"
                  value={form.sanksi}
                  onChange={handleChange}
                  placeholder="Sanksi yang diberikan"
                  rows={4}
                  className="
                    w-full resize-none rounded-xl
                    border border-slate-200
                    bg-slate-50/50 px-4 py-3
                    text-sm text-slate-700 outline-none
                    transition placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={saving}
                className="
                  rounded-xl border border-slate-200
                  bg-white px-5 py-2.5
                  text-sm font-semibold text-slate-600
                  transition hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  relative z-10 inline-flex
                  min-w-[130px] items-center
                  justify-center gap-2 rounded-xl
                  bg-[#293040] px-6 py-2.5
                  text-sm font-semibold text-[#D3AC2B]
                  shadow-md transition
                  hover:-translate-y-0.5
                  hover:bg-[#1E2535]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Data"
                )}
              </button>
            </div>
          </form>
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
            flex flex-col gap-2
            border-b border-slate-100
            px-6 py-5
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-red-500" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Daftar Pelanggaran
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Data pelanggaran dan sanksi anak binaan
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {pelanggarans.length} Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead>
              <tr className="bg-[#293040] text-[#E6C34A]">
                <th className="px-6 py-4 text-left font-semibold">
                  No.
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Nama Anak
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Jenis Pelanggaran
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Sanksi
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Tanggal
                </th>

                <th className="px-6 py-4 text-center font-semibold">
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
                    colSpan={7}
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
              ) : pelanggarans.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-20 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                      <FaInbox className="text-3xl text-slate-300" />
                    </div>

                    <p className="font-semibold text-slate-600">
                      Belum ada data pelanggaran
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tambahkan data untuk menampilkannya
                    </p>
                  </td>
                </tr>
              ) : (
                pelanggarans.map(
                  (pelanggaran, index) => (
                    <tr
                      key={pelanggaran.id_pelanggaran}
                      className="
                        border-t border-slate-100
                        transition-colors duration-200
                        odd:bg-white
                        even:bg-slate-50/50
                        hover:bg-amber-50/70
                      "
                    >
                      <td className="px-6 py-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                          {index + 1}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#293040] text-sm font-bold text-[#D3AC2B]">
                            {pelanggaran.nama_anak
                              ?.charAt(0)
                              .toUpperCase() || "A"}
                          </div>

                          <span className="font-semibold text-[#182238]">
                            {pelanggaran.nama_anak || "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        <span className="font-medium">
                          {pelanggaran.jenis_pelanggaran}
                        </span>
                      </td>

                      <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                        {pelanggaran.sanksi || "-"}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {pelanggaran.tanggal_pelanggaran}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`
                            inline-flex rounded-full
                            px-3 py-1.5 text-xs
                            font-semibold
                            ${statusBadge(
                              pelanggaran.status
                            )}
                          `}
                        >
                          {pelanggaran.status ||
                            "Belum Selesai"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEdit(pelanggaran)
                          }
                          className="
                            mx-auto inline-flex items-center
                            gap-1.5 rounded-lg
                            bg-[#293040] px-3 py-2
                            text-xs font-semibold
                            text-[#D3AC2B]
                            shadow-sm transition
                            hover:-translate-y-0.5
                            hover:bg-[#1E2535]
                            hover:shadow-md
                          "
                        >
                          <FaEdit className="text-xs" />
                          Edit Status
                        </button>
                      </td>
                    </tr>
                  )
                )
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
            overflow-y-auto p-4
            backdrop-blur-sm
          "
          style={{
            backgroundColor:
              "rgba(15, 23, 42, 0.6)",
          }}
        >
          <div
            className="
              my-6 w-full max-w-md
              overflow-hidden rounded-3xl bg-white
              shadow-[0_25px_80px_rgba(0,0,0,0.3)]
            "
          >
            <div className="flex items-center justify-between bg-[#293040] px-6 py-5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Edit Data Pelanggaran
                </h3>

                <p className="mt-1 text-xs text-white/50">
                  Perbarui pelanggaran dan status
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditTarget(null)}
                disabled={savingEdit}
                className="
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  bg-white/10 text-lg font-bold
                  text-white/70 transition
                  hover:bg-white/20
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm">
                <span className="text-slate-500">
                  Anak binaan:
                </span>

                <span className="ml-1 font-bold text-[#182238]">
                  {editTarget.nama_anak}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Jenis Pelanggaran
                  </label>

                  <input
                    type="text"
                    name="jenis_pelanggaran"
                    value={editForm.jenis_pelanggaran}
                    onChange={handleEditChange}
                    className="
                      w-full rounded-xl border
                      border-slate-200
                      bg-slate-50/50 px-4 py-3
                      text-sm text-slate-700
                      outline-none transition
                      focus:border-[#D3AC2B]
                      focus:bg-white focus:ring-4
                      focus:ring-[#D3AC2B]/10
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={editForm.deskripsi}
                    onChange={handleEditChange}
                    rows={3}
                    className="
                      w-full resize-none rounded-xl
                      border border-slate-200
                      bg-slate-50/50 px-4 py-3
                      text-sm text-slate-700
                      outline-none transition
                      focus:border-[#D3AC2B]
                      focus:bg-white focus:ring-4
                      focus:ring-[#D3AC2B]/10
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Sanksi
                  </label>

                  <textarea
                    name="sanksi"
                    value={editForm.sanksi}
                    onChange={handleEditChange}
                    rows={3}
                    className="
                      w-full resize-none rounded-xl
                      border border-slate-200
                      bg-slate-50/50 px-4 py-3
                      text-sm text-slate-700
                      outline-none transition
                      focus:border-[#D3AC2B]
                      focus:bg-white focus:ring-4
                      focus:ring-[#D3AC2B]/10
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Tanggal Pelanggaran
                  </label>

                  <input
                    type="date"
                    name="tanggal_pelanggaran"
                    value={editForm.tanggal_pelanggaran}
                    onChange={handleEditChange}
                    className="
                      w-full rounded-xl border
                      border-slate-200
                      bg-slate-50/50 px-4 py-3
                      text-sm text-slate-700
                      outline-none transition
                      focus:border-[#D3AC2B]
                      focus:bg-white focus:ring-4
                      focus:ring-[#D3AC2B]/10
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Status Penyelesaian
                  </label>

                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="
                      w-full rounded-xl border
                      border-slate-200
                      bg-slate-50/50 px-4 py-3
                      text-sm text-slate-700
                      outline-none transition
                      focus:border-[#D3AC2B]
                      focus:bg-white focus:ring-4
                      focus:ring-[#D3AC2B]/10
                    "
                  >
                    <option value="Belum Selesai">
                      Belum Selesai
                    </option>

                    <option value="Dalam Proses">
                      Dalam Proses
                    </option>

                    <option value="Selesai">
                      Selesai
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                disabled={savingEdit}
                className="
                  flex-1 rounded-xl border
                  border-slate-200 bg-white
                  px-4 py-2.5 text-sm
                  font-semibold text-slate-600
                  transition hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleEditSubmit}
                disabled={savingEdit}
                className="
                  flex flex-1 items-center
                  justify-center gap-2 rounded-xl
                  bg-[#293040] px-4 py-2.5
                  text-sm font-semibold
                  text-[#D3AC2B]
                  shadow-md transition
                  hover:bg-[#1E2535]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {savingEdit ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Notifikasi (pengganti alert bawaan browser) */}
      {notif && (
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
              className={`
                mx-auto mb-5 flex h-16 w-16
                items-center justify-center
                rounded-2xl
                ${
                  notif.type === "success"
                    ? "bg-emerald-50 ring-8 ring-emerald-50/50"
                    : "bg-red-50 ring-8 ring-red-50/50"
                }
              `}
            >
              {notif.type === "success" ? (
                <FaCheckCircle className="text-xl text-emerald-500" />
              ) : (
                <FaExclamationCircle className="text-xl text-red-500" />
              )}
            </div>

            <h3 className="text-center text-xl font-bold text-[#182238]">
              {notif.title}
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              {notif.message}
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setNotif(null)}
                className={`
                  w-full rounded-xl px-4 py-2.5
                  text-sm font-semibold text-white
                  shadow-md transition
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  ${
                    notif.type === "success"
                      ? "bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600"
                      : "bg-red-500 shadow-red-500/20 hover:bg-red-600"
                  }
                `}
              >
                Oke, Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 