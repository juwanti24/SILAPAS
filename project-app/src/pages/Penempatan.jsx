
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSpinner,
  FaBed,
  FaPlus,
  FaUser,
  FaUsers,
  FaDoorOpen,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function Penempatan() {
  const [kamars, setKamars] = useState([]);
  const [anakBelum, setAnakBelum] = useState([]);
  const [kamarList, setKamarList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPindahModal, setShowPindahModal] =
    useState(false);

  const [form, setForm] = useState({
    id_anak: "",
    id_kamar: "",
  });

  const [pindahData, setPindahData] = useState({
    id_penempatan: "",
    id_kamar: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [dashboardRes, belumRes, kamarRes] =
        await Promise.all([
          axios.get(
            "http://127.0.0.1:8000/api/penempatan-dashboard"
          ),
          axios.get(
            "http://127.0.0.1:8000/api/anak-belum-ditempatkan"
          ),
          axios.get(
            "http://127.0.0.1:8000/api/kamars"
          ),
        ]);

      setKamars(dashboardRes.data);
      setAnakBelum(belumRes.data);
      setKamarList(kamarRes.data);
    } catch (error) {
      console.error(
        "Gagal mengambil data penempatan:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePindahClick = (anak) => {
    setPindahData({
      id_penempatan: anak.id_penempatan,
      id_kamar: "",
    });

    setShowPindahModal(true);
  };

  const handlePindahSubmit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/penempatans/${pindahData.id_penempatan}`,
        {
          id_kamar: pindahData.id_kamar,
        }
      );

      setShowPindahModal(false);

      setPindahData({
        id_penempatan: "",
        id_kamar: "",
      });

      fetchData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Gagal memindahkan penghuni"
      );
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/penempatans",
        form
      );

      setShowForm(false);

      setForm({
        id_anak: "",
        id_kamar: "",
      });

      fetchData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Gagal menyimpan"
      );
    }
  };

  const totalPenghuni = kamars.reduce(
    (total, kamar) =>
      total + Number(kamar.jumlah_penghuni || 0),
    0
  );

  const totalKapasitas = kamars.reduce(
    (total, kamar) =>
      total + Number(kamar.kapasitas || 0),
    0
  );

  const kamarTersedia = kamars.filter(
    (kamar) =>
      Number(kamar.jumlah_penghuni) <
      Number(kamar.kapasitas)
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#F5F7FB]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
            <FaSpinner className="animate-spin text-3xl text-[#D3AC2B]" />
          </div>

          <p className="font-semibold text-slate-600">
            Memuat data penempatan...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] p-4 md:p-6 lg:p-8">
      {/* Header */}
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

        <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-[#7EC8F5]/10" />

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
              <span className="h-2 w-2 rounded-full bg-[#7EC8F5]" />

              Manajemen Penempatan
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Data Penempatan
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Kelola penempatan anak binaan dan pantau
              kapasitas setiap kamar.
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
                text-xs transition-transform duration-300
                ${showForm ? "rotate-45" : ""}
              `}
            />

            {showForm
              ? "Tutup Form"
              : "Tambah Penempatan"}
          </button>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-[#D3AC2B]" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Kamar
              </p>

              <p className="mt-2 text-3xl font-bold text-[#182238]">
                {kamars.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
              <FaDoorOpen className="text-xl text-[#B68D10]" />
            </div>
          </div>
        </div>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Penghuni
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {totalPenghuni}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <FaUsers className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kamar Tersedia
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-600">
                {kamarTersedia}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <FaBed className="text-xl text-emerald-600" />
            </div>
          </div>
        </div>

        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-slate-200 bg-white p-5
            shadow-[0_8px_25px_rgba(15,31,61,0.05)]
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Belum Ditempatkan
              </p>

              <p className="mt-2 text-3xl font-bold text-red-600">
                {anakBelum.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
              <FaExclamationTriangle className="text-xl text-red-500" />
            </div>
          </div>
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
                Tambah Penempatan
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Pilih anak binaan dan kamar yang tersedia
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Anak Binaan
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

                  {anakBelum.map((anak) => (
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
                  Kamar Tujuan
                </label>

                <select
                  name="id_kamar"
                  value={form.id_kamar}
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
                    Pilih Kamar
                  </option>

                  {kamarList
                    .filter((kamar) => {
                      const data = kamars.find(
                        (item) =>
                          item.id_kamar ===
                          kamar.id_kamar
                      );

                      return (
                        data &&
                        data.jumlah_penghuni <
                          data.kapasitas
                      );
                    })
                    .map((kamar) => (
                      <option
                        key={kamar.id_kamar}
                        value={kamar.id_kamar}
                      >
                        {kamar.nama_kamar}
                      </option>
                    ))}
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
                Simpan Penempatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Anak Belum Memiliki Kamar */}
      <div
        className="
          mb-8 overflow-hidden rounded-3xl
          border border-slate-200 bg-white
          shadow-[0_10px_35px_rgba(15,31,61,0.06)]
        "
      >
        <div
          className={`
            relative overflow-hidden px-6 py-5
            ${
              anakBelum.length > 0
                ? "bg-gradient-to-r from-red-600 to-red-500"
                : "bg-gradient-to-r from-emerald-600 to-emerald-500"
            }
          `}
        >
          <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full border-[22px] border-white/10" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                {anakBelum.length > 0
                  ? "Anak Belum Memiliki Kamar"
                  : "Seluruh Anak Sudah Ditempatkan"}
              </h3>

              <p className="mt-1 text-sm text-white/75">
                {anakBelum.length > 0
                  ? `${anakBelum.length} anak menunggu penempatan`
                  : "Tidak ada anak yang membutuhkan kamar"}
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl text-white">
              {anakBelum.length > 0 ? (
                <FaExclamationTriangle />
              ) : (
                <FaCheckCircle />
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          {anakBelum.length === 0 ? (
            <div className="py-7 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-8 ring-emerald-50/50">
                <FaCheckCircle className="text-2xl text-emerald-600" />
              </div>

              <p className="font-semibold text-emerald-700">
                Semua anak sudah memiliki kamar
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Tidak ada penempatan yang perlu dilakukan
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {anakBelum.map((anak) => (
                <div
                  key={anak.id_anak}
                  className="
                    flex items-center gap-3 rounded-2xl
                    border border-red-100 bg-red-50/40
                    p-4 transition
                    hover:-translate-y-0.5
                    hover:border-red-200
                    hover:shadow-md
                  "
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
                    <FaUser className="text-red-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#182238]">
                      {anak.nama_anak}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      ID #{anak.id_anak}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daftar Kamar */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-[#7EC8F5]" />

          <div>
            <h2 className="text-lg font-bold text-[#182238]">
              Daftar Kamar
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Informasi kapasitas dan penghuni setiap kamar
            </p>
          </div>
        </div>

        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm">
          {kamars.length} Kamar
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {kamars.map((kamar) => {
          const jumlahPenghuni = Number(
            kamar.jumlah_penghuni || 0
          );

          const kapasitas = Number(kamar.kapasitas || 0);

          const penuh =
            jumlahPenghuni >= kapasitas;

          const persentase =
            kapasitas > 0
              ? Math.min(
                  (jumlahPenghuni / kapasitas) * 100,
                  100
                )
              : 0;

          return (
            <div
              key={kamar.id_kamar}
              className="
                group overflow-hidden rounded-3xl
                border border-slate-200 bg-white
                shadow-[0_8px_25px_rgba(15,31,61,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_rgba(15,31,61,0.12)]
              "
            >
              <div className="relative overflow-hidden bg-[#293040] px-5 py-5 text-white">
                <div className="absolute -right-7 -top-9 h-24 w-24 rounded-full bg-white/5" />

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                      Kamar
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      {kamar.nama_kamar}
                    </h3>

                    <p className="mt-1 text-sm text-white/50">
                      Blok {kamar.blok || "-"}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <FaBed className="text-xl text-[#D3AC2B]" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#182238]">
                    Kapasitas Penghuni
                  </span>

                  <span className="text-sm font-bold text-[#182238]">
                    {jumlahPenghuni}/{kapasitas}
                  </span>
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`
                      h-full rounded-full transition-all
                      ${
                        penuh
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }
                    `}
                    style={{
                      width: `${persentase}%`,
                    }}
                  />
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`
                      inline-flex rounded-full px-3 py-1.5
                      text-xs font-semibold
                      ${
                        penuh
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      }
                    `}
                  >
                    {penuh ? "Penuh" : "Tersedia"}
                  </span>

                  <span className="text-xs text-slate-400">
                    {Math.max(
                      kapasitas - jumlahPenghuni,
                      0
                    )}{" "}
                    tempat tersisa
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Daftar Penghuni
                  </p>

                  {kamar.penghuni.length === 0 ? (
                    <div className="rounded-xl bg-slate-50 px-4 py-5 text-center">
                      <FaUser className="mx-auto mb-2 text-xl text-slate-300" />

                      <p className="text-sm text-slate-400">
                        Belum ada penghuni
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {kamar.penghuni.map((anak) => (
                        <div
                          key={anak.id_anak}
                          className="
                            flex items-center gap-3
                            rounded-xl border border-slate-100
                            bg-slate-50/50 px-3 py-3
                            transition hover:bg-amber-50/60
                          "
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#293040] text-xs font-bold text-[#D3AC2B]">
                            {anak.nama_anak
                              ?.charAt(0)
                              .toUpperCase() || "A"}
                          </div>

                          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#182238]">
                            {anak.nama_anak}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handlePindahClick(anak)
                            }
                            className="
                              inline-flex items-center gap-1.5
                              rounded-lg bg-[#293040]
                              px-3 py-1.5 text-xs
                              font-semibold text-[#D3AC2B]
                              shadow-sm transition
                              hover:-translate-y-0.5
                              hover:bg-[#1E2535]
                              hover:shadow-md
                            "
                          >
                            <FaExchangeAlt className="text-[10px]" />

                            Pindah
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Pindah */}
      {showPindahModal && (
        <div
          className="
            fixed inset-0 z-50 flex
            items-center justify-center
            p-4 backdrop-blur-sm
          "
          style={{
            backgroundColor:
              "rgba(15, 23, 42, 0.6)",
          }}
        >
          <div
            className="
              w-full max-w-md overflow-hidden
              rounded-3xl bg-white
              shadow-[0_25px_80px_rgba(0,0,0,0.3)]
            "
          >
            <div className="flex items-center justify-between bg-[#293040] px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Pindahkan Penghuni
                </h2>

                <p className="mt-1 text-xs text-white/50">
                  Pilih kamar tujuan yang masih tersedia
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPindahModal(false)
                }
                className="
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  bg-white/10 text-lg font-bold
                  text-white/70 transition
                  hover:bg-white/20
                  hover:text-white
                "
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Kamar Baru
              </label>

              <select
                value={pindahData.id_kamar}
                onChange={(e) =>
                  setPindahData({
                    ...pindahData,
                    id_kamar: e.target.value,
                  })
                }
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
                  Pilih Kamar Baru
                </option>

                {kamarList
                  .filter((kamar) => {
                    const data = kamars.find(
                      (item) =>
                        item.id_kamar ===
                        kamar.id_kamar
                    );

                    return (
                      data &&
                      data.jumlah_penghuni <
                        data.kapasitas
                    );
                  })
                  .map((kamar) => (
                    <option
                      key={kamar.id_kamar}
                      value={kamar.id_kamar}
                    >
                      {kamar.nama_kamar}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5">
              <button
                type="button"
                onClick={() =>
                  setShowPindahModal(false)
                }
                className="
                  flex-1 rounded-xl border
                  border-slate-200 bg-white
                  px-4 py-2.5 text-sm
                  font-semibold text-slate-600
                  transition hover:bg-slate-100
                "
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handlePindahSubmit}
                className="
                  flex-1 rounded-xl
                  bg-[#293040] px-4 py-2.5
                  text-sm font-semibold
                  text-[#D3AC2B]
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
    </div>
  );
}

