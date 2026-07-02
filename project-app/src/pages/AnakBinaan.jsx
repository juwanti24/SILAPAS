import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaSpinner,
  FaInbox,
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaUpload,
} from "react-icons/fa";

export default function AnakBinaan() {
  const [anakBinaans, setAnakBinaans] = useState([]);
  const [pembinas, setPembinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [query, setQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [form, setForm] = useState({
    nama_anak: "",
    tanggal_lahir: "",
    tanggal_masuk: "",
    jenis_kelamin: "",
    alamat: "",
    id_pembina: "",
    foto_profil: null,
    alasan_masuk: "",
    masa_binaan: "",
  });

  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      axios
        .get(
          `http://127.0.0.1:8000/api/anak-binaans?search=${query}`
        )
        .then((response) => {
          setAnakBinaans(response.data);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.error(
            "Gagal mengambil data anak binaan:",
            error
          );
        })
        .finally(() => {
          setLoading(false);
        });

      axios
        .get("http://127.0.0.1:8000/api/pembinas")
        .then((response) => {
          setPembinas(response.data);
        })
        .catch((error) => {
          console.error(
            "Gagal mengambil data pembina:",
            error
          );
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setForm({
      ...form,
      foto_profil: file,
    });

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFoto(url);
    } else {
      setPreviewFoto(null);
    }
  };

  const resetForm = () => {
    setForm({
      nama_anak: "",
      tanggal_lahir: "",
      tanggal_masuk: "",
      jenis_kelamin: "",
      alamat: "",
      id_pembina: "",
      foto_profil: null,
      alasan_masuk: "",
      masa_binaan: "",
    });
    setPreviewFoto(null);
  };

  const handleSubmit = () => {
    // Catatan: field foto_profil, alasan_masuk, dan masa_binaan
    // masih berupa input kosong menunggu skema database & endpoint
    // upload disiapkan. Saat backend siap, ganti axios.post di bawah
    // dengan multipart/form-data (FormData) agar file ikut terkirim.
    axios
      .post(
        "http://127.0.0.1:8000/api/anak-binaans",
        form
      )
      .then((response) => {
        setShowForm(false);
        resetForm();

        setAnakBinaans((dataLama) => [
          ...dataLama,
          {
            ...form,
            id_anak: response.data.id_anak,
          },
        ]);
      })
      .catch((error) => {
        console.error("Gagal menyimpan data:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/anak-binaans/${deleteId}`
      )
      .then(() => {
        setAnakBinaans((dataLama) =>
          dataLama.filter(
            (item) => item.id_anak !== deleteId
          )
        );

        setDeleteId(null);
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      });
  };

  const selectedAnak = anakBinaans.find(
    (anak) => anak.id_anak === deleteId
  );

  const jumlahLakiLaki = anakBinaans.filter(
    (anak) => anak.jenis_kelamin === "Laki-laki"
  ).length;

  const jumlahPerempuan = anakBinaans.filter(
    (anak) => anak.jenis_kelamin === "Perempuan"
  ).length;

  // ==== Pagination logic ====
  const totalPages = Math.max(
    1,
    Math.ceil(anakBinaans.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedAnakBinaans = anakBinaans.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(
      1,
      safePage - Math.floor(maxVisible / 2)
    );
    let end = Math.min(
      totalPages,
      start + maxVisible - 1
    );

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
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

        <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#7EC8F5]/10" />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
              <span className="h-2 w-2 rounded-full bg-[#7EC8F5]" />
              Manajemen Anak Binaan
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Data Anak Binaan
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Kelola identitas dan informasi anak binaan
              yang tersimpan dalam sistem.
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
            <FaUserPlus />

            {showForm
              ? "Tutup Form"
              : "Tambah Anak Binaan"}
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-7 grid gap-4 sm:grid-cols-3">
        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-[#D3AC2B]" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Anak Binaan
          </p>

          <p className="mt-2 text-3xl font-bold text-[#182238]">
            {loading ? "—" : anakBinaans.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Data yang sedang ditampilkan
          </p>
        </div>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Laki-laki
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {loading ? "—" : jumlahLakiLaki}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Anak binaan laki-laki
          </p>
        </div>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-pink-500" />

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Perempuan
          </p>

          <p className="mt-2 text-3xl font-bold text-pink-600">
            {loading ? "—" : jumlahPerempuan}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Anak binaan perempuan
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
            <div className="h-9 w-1 rounded-full bg-[#7EC8F5]" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Tambah Data Anak Binaan
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Lengkapi data anak binaan pada form berikut
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Upload Foto Profil */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Foto Profil
              </label>

              <div className="flex items-center gap-4">
                <div
                  className="
                    flex h-20 w-20 shrink-0 items-center
                    justify-center overflow-hidden
                    rounded-2xl border border-dashed
                    border-slate-300 bg-slate-50
                  "
                >
                  {previewFoto ? (
                    <img
                      src={previewFoto}
                      alt="Preview foto profil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaImage className="text-2xl text-slate-300" />
                  )}
                </div>

                <label
                  htmlFor="foto_profil"
                  className="
                    inline-flex cursor-pointer items-center
                    gap-2 rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-2.5
                    text-sm font-semibold text-slate-600
                    transition hover:bg-slate-100
                  "
                >
                  <FaUpload className="text-xs" />
                  {form.foto_profil
                    ? form.foto_profil.name
                    : "Pilih Foto"}
                </label>

                <input
                  id="foto_profil"
                  type="file"
                  name="foto_profil"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Nama Anak
                </label>

                <input
                  type="text"
                  name="nama_anak"
                  value={form.nama_anak}
                  onChange={handleChange}
                  placeholder="Nama lengkap"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
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
                  Jenis Kelamin
                </label>

                <select
                  name="jenis_kelamin"
                  value={form.jenis_kelamin}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                >
                  <option value="">
                    Pilih Jenis Kelamin
                  </option>

                  <option value="Laki-laki">
                    Laki-laki
                  </option>

                  <option value="Perempuan">
                    Perempuan
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Tanggal Lahir
                </label>

                <input
                  type="date"
                  name="tanggal_lahir"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Tanggal Masuk
                </label>

                <input
                  type="date"
                  name="tanggal_masuk"
                  value={form.tanggal_masuk}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Masa Binaan
                </label>

                <input
                  type="text"
                  name="masa_binaan"
                  value={form.masa_binaan}
                  onChange={handleChange}
                  placeholder="Contoh: 6 bulan / 1 tahun"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
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
                  Pembina
                </label>

                <select
                  name="id_pembina"
                  value={form.id_pembina}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                >
                  <option value="">
                    Pilih Pembina
                  </option>

                  {pembinas.map((pembina) => (
                    <option
                      key={pembina.id_pembina}
                      value={pembina.id_pembina}
                    >
                      {pembina.nama_pembina} 
                  
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Alamat
                </label>

                <input
                  type="text"
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  placeholder="Alamat lengkap"
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Alasan Masuk
                </label>

                <textarea
                  name="alasan_masuk"
                  value={form.alasan_masuk}
                  onChange={handleChange}
                  placeholder="Jelaskan alasan anak binaan masuk"
                  rows={3}
                  className="
                    w-full resize-none rounded-xl
                    border border-slate-200
                    bg-slate-50/50 px-4 py-3 text-sm
                    text-slate-700 outline-none transition
                    placeholder:text-slate-300
                    focus:border-[#D3AC2B]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#D3AC2B]/10
                  "
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
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

      {/* Search */}
      <div
        className="
          mb-5 rounded-2xl border border-slate-200
          bg-white p-4
          shadow-[0_8px_25px_rgba(15,31,61,0.04)]
        "
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama anak binaan..."
            className="
              w-full rounded-xl border border-slate-200
              bg-slate-50/50 py-3 pl-11 pr-12
              text-sm text-slate-700 outline-none
              transition placeholder:text-slate-400
              focus:border-[#D3AC2B]
              focus:bg-white
              focus:ring-4
              focus:ring-[#D3AC2B]/10
            "
          />

          {loading && (
            <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#D3AC2B]" />
          )}
        </div>
      </div>

      {/* Table */}
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
            <div className="h-8 w-1 rounded-full bg-[#7EC8F5]" />

            <div>
              <h2 className="text-lg font-bold text-[#182238]">
                Daftar Anak Binaan
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Data identitas anak binaan yang tersimpan
              </p>
            </div>
          </div>

          <span
            className="
              w-fit rounded-full bg-slate-100
              px-3 py-1.5 text-xs font-semibold text-slate-500
            "
          >
            {anakBinaans.length} Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-sm">
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
                  Tanggal Lahir
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

                <th className="px-6 py-4 text-center font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
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
                    colSpan={8}
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
                      {query
                        ? `Tidak ada hasil untuk "${query}"`
                        : "Belum ada data anak binaan"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {query
                        ? "Coba gunakan kata pencarian yang berbeda"
                        : "Tambahkan data untuk menampilkannya"}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedAnakBinaans.map((anak, index) => (
                  <tr
                    key={anak.id_anak}
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
                        {(safePage - 1) * itemsPerPage +
                          index +
                          1}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-full bg-[#293040]
                            text-sm font-bold text-[#7EC8F5]
                          "
                        >
                          {anak.nama_anak
                            ?.charAt(0)
                            .toUpperCase() || "A"}
                        </div>

                        <span className="font-semibold text-[#182238]">
                          {anak.nama_anak}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex rounded-full px-3 py-1.5
                          text-xs font-semibold
                          ${
                            anak.jenis_kelamin ===
                            "Laki-laki"
                              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                              : "bg-pink-50 text-pink-700 ring-1 ring-pink-200"
                          }
                        `}
                      >
                        {anak.jenis_kelamin || "-"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {anak.tanggal_lahir || "-"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {anak.tanggal_masuk || "-"}
                    </td>

                  <td className="px-6 py-4">
  {anak.nama_pembina ? (
    <span className="...">{anak.nama_pembina}</span>
  ) : (
    <span className="text-xs text-slate-400">Belum ada</span>
  )}
</td>

                    <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                      {anak.alamat || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/anak-binaan/edit/${anak.id_anak}`}
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
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteId(anak.id_anak)
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

        {/* Pagination */}
        {!loading && anakBinaans.length > 0 && (
          <div
            className="
              flex flex-col items-center justify-between
              gap-4 border-t border-slate-100
              px-6 py-4 sm:flex-row
            "
          >
            <p className="text-xs text-slate-400">
              Menampilkan{" "}
              <span className="font-semibold text-slate-600">
                {(safePage - 1) * itemsPerPage + 1}
              </span>{" "}
              -{" "}
              <span className="font-semibold text-slate-600">
                {Math.min(
                  safePage * itemsPerPage,
                  anakBinaans.length
                )}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-slate-600">
                {anakBinaans.length}
              </span>{" "}
              data
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="
                  inline-flex h-9 w-9 items-center
                  justify-center rounded-lg border
                  border-slate-200 text-slate-500
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:bg-transparent
                "
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {getPageNumbers()[0] > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToPage(1)}
                    className="
                      inline-flex h-9 w-9 items-center
                      justify-center rounded-lg
                      text-xs font-semibold text-slate-500
                      transition hover:bg-slate-100
                    "
                  >
                    1
                  </button>

                  <span className="px-1 text-xs text-slate-300">
                    ...
                  </span>
                </>
              )}

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`
                    inline-flex h-9 w-9 items-center
                    justify-center rounded-lg
                    text-xs font-semibold
                    transition
                    ${
                      page === safePage
                        ? "bg-[#293040] text-[#D3AC2B] shadow-md"
                        : "text-slate-500 hover:bg-slate-100"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              {getPageNumbers()[
                getPageNumbers().length - 1
              ] < totalPages && (
                <>
                  <span className="px-1 text-xs text-slate-300">
                    ...
                  </span>

                  <button
                    type="button"
                    onClick={() => goToPage(totalPages)}
                    className="
                      inline-flex h-9 w-9 items-center
                      justify-center rounded-lg
                      text-xs font-semibold text-slate-500
                      transition hover:bg-slate-100
                    "
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="
                  inline-flex h-9 w-9 items-center
                  justify-center rounded-lg border
                  border-slate-200 text-slate-500
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:bg-transparent
                "
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Hapus */}
      {deleteId && (
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
              Hapus Data Anak Binaan?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Data anak binaan{" "}
              <span className="font-bold text-[#182238]">
                {selectedAnak?.nama_anak || ""}
              </span>{" "}
              akan dihapus secara permanen.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}