
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserPlus,
  FaSpinner,
  FaInbox,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Pembina() {
  const [deleteId, setDeleteId] = useState(null);
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/pembinas", form)
      .then(() => {
        setShowForm(false);

        setForm({
          nama_pembina: "",
          jenis_kelamin: "",
          no_hp: "",
          alamat: "",
        });

        fetchData();
      })
      .catch((error) => {
        console.error("Gagal menyimpan data:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/pembinas/${deleteId}`
      )
      .then(() => {
        setDeleteId(null);
        fetchData();
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      });
  };

  const selectedPembina = pembinas.find(
    (pembina) => pembina.id_pembina === deleteId
  );

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
              Manajemen Pembina
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Data Pembina
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Kelola informasi dan data pembina anak binaan.
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
            <FaUserPlus
              className={`transition-transform duration-300 ${
                showForm ? "rotate-12" : ""
              }`}
            />

            {showForm ? "Tutup Form" : "Tambah Pembina"}
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
            Total Pembina
          </p>

          <p className="mt-2 text-3xl font-bold text-[#182238]">
            {loading ? "—" : pembinas.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Seluruh pembina terdaftar
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
            {loading
              ? "—"
              : pembinas.filter(
                  (pembina) =>
                    pembina.jenis_kelamin === "Laki-laki"
                ).length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Pembina laki-laki
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
            {loading
              ? "—"
              : pembinas.filter(
                  (pembina) =>
                    pembina.jenis_kelamin === "Perempuan"
                ).length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Pembina perempuan
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
                Tambah Data Pembina
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Lengkapi informasi pembina pada form berikut
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Nama Pembina
                </label>

                <input
                  type="text"
                  name="nama_pembina"
                  value={form.nama_pembina}
                  onChange={handleChange}
                  placeholder="Nama lengkap"
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
                  Jenis Kelamin
                </label>

                <select
                  name="jenis_kelamin"
                  value={form.jenis_kelamin}
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
                  No HP
                </label>

                <input
                  type="text"
                  name="no_hp"
                  value={form.no_hp}
                  onChange={handleChange}
                  placeholder="08xx-xxxx-xxxx"
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
                Daftar Pembina
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Seluruh data pembina yang tersimpan
              </p>
            </div>
          </div>

          <span
            className="
              w-fit rounded-full bg-slate-100
              px-3 py-1.5 text-xs font-semibold text-slate-500
            "
          >
            {pembinas.length} Data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-[#293040] text-[#E6C34A]">
                <th className="px-6 py-4 text-left font-semibold">
                  No.
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Nama Pembina
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Jenis Kelamin
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  No HP
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
              ) : pembinas.length === 0 ? (
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
                      Belum ada data pembina
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Tambahkan pembina untuk menampilkannya
                    </p>
                  </td>
                </tr>
              ) : (
                pembinas.map((pembina, index) => (
                  <tr
                    key={pembina.id_pembina}
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
                            rounded-full bg-[#293040]
                            text-sm font-bold text-[#D3AC2B]
                          "
                        >
                          {pembina.nama_pembina
                            ?.charAt(0)
                            .toUpperCase() || "P"}
                        </div>

                        <span className="font-semibold text-[#182238]">
                          {pembina.nama_pembina}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex rounded-full px-3 py-1.5
                          text-xs font-semibold
                          ${
                            pembina.jenis_kelamin ===
                            "Laki-laki"
                              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                              : "bg-pink-50 text-pink-700 ring-1 ring-pink-200"
                          }
                        `}
                      >
                        {pembina.jenis_kelamin || "-"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {pembina.no_hp || "-"}
                    </td>

                    <td className="max-w-[220px] truncate px-6 py-4 text-slate-600">
                      {pembina.alamat || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/pembina/edit/${pembina.id_pembina}`}
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
                            setDeleteId(pembina.id_pembina)
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

      {/* Modal Konfirmasi Hapus */}
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
              Hapus Data Pembina?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-slate-500">
              Data pembina{" "}
              <span className="font-bold text-[#182238]">
                {selectedPembina?.nama_pembina || ""}
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

