import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSpinner,
  FaBed,
  FaPlus,
  FaUser,
  FaExclamationTriangle,
} from "react-icons/fa";
export default function Penempatan() {
  const [kamars, setKamars] = useState([]);
  const [anakBelum, setAnakBelum] = useState([]);

  const [kamarList, setKamarList] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    id_anak: "",
    id_kamar: "",
  });

  const [loading, setLoading] = useState(true);
  const [showPindahModal, setShowPindahModal] = useState(false);

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

      const [dashboardRes, belumRes, kamarRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/penempatan-dashboard"),
        axios.get("http://127.0.0.1:8000/api/anak-belum-ditempatkan"),
        axios.get("http://127.0.0.1:8000/api/kamars"),
      ]);

      setKamars(dashboardRes.data);
      setAnakBelum(belumRes.data);
      setKamarList(kamarRes.data);
    } catch (err) {
      console.error(err);
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
        },
      );

      setShowPindahModal(false);

      setPindahData({
        id_penempatan: "",
        id_kamar: "",
      });

      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memindahkan penghuni");
    }
  };
  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/penempatans", form);

      setShowForm(false);

      setForm({
        id_anak: "",
        id_kamar: "",
      });

      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#D3AC2B] mx-auto mb-3" />
          <p className="text-gray-500">Memuat data penempatan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f1f3d]">Data Penempatan</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Dashboard / Data Penempatan
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#293040] text-[#D3AC2B] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e2535] transition"
        >
          <FaPlus />
          Tambah Penempatan
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Tambah Penempatan</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="id_anak"
              value={form.id_anak}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Pilih Anak Binaan</option>

              {anakBelum.map((anak) => (
                <option key={anak.id_anak} value={anak.id_anak}>
                  {anak.nama_anak}
                </option>
              ))}
            </select>

            <select
              name="id_kamar"
              value={form.id_kamar}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="">Pilih Kamar</option>

              {kamarList
                .filter((kamar) => {
                  const data = kamars.find(
                    (k) => k.id_kamar === kamar.id_kamar,
                  );

                  return data && data.jumlah_penghuni < data.kapasitas;
                })
                .map((kamar) => (
                  <option key={kamar.id_kamar} value={kamar.id_kamar}>
                    {kamar.nama_kamar}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-[#293040] text-[#D3AC2B] px-5 py-2 rounded-lg"
            >
              Simpan
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 px-5 py-2 rounded-lg"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Card Anak tak ada kamar */}

      <div className="rounded-xl shadow-sm overflow-hidden mb-8 border">
        {/* Header */}
        <div
          className={`p-4 text-white ${
            anakBelum.length > 0 ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">
                {anakBelum.length > 0
                  ? "Anak Belum Memiliki Kamar"
                  : "Seluruh Anak Sudah Ditempatkan"}
              </h3>

              <p
                className={`text-sm ${
                  anakBelum.length > 0 ? "text-red-100" : "text-green-100"
                }`}
              >
                {anakBelum.length > 0
                  ? `${anakBelum.length} anak menunggu penempatan`
                  : "Tidak ada anak yang membutuhkan kamar"}
              </p>
            </div>

            <div className="text-3xl">
              {anakBelum.length > 0 ? <FaExclamationTriangle /> : <FaUser />}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-4">
          {anakBelum.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                <FaUser className="text-green-600 text-xl" />
              </div>

              <p className="font-semibold text-green-600">
                Semua anak sudah memiliki kamar
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Tidak ada penempatan yang perlu dilakukan
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {anakBelum.map((anak) => (
                <div
                  key={anak.id_anak}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <FaUser className="text-red-600" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {anak.nama_anak}
                    </p>

                    <p className="text-xs text-gray-400">ID #{anak.id_anak}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPindahModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h2 className="text-lg font-bold mb-4">Pindahkan Penghuni</h2>

            <select
              value={pindahData.id_kamar}
              onChange={(e) =>
                setPindahData({
                  ...pindahData,
                  id_kamar: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            >
              <option value="">Pilih Kamar Baru</option>

              {kamarList
                .filter((kamar) => {
                  const data = kamars.find(
                    (k) => k.id_kamar === kamar.id_kamar,
                  );

                  return data && data.jumlah_penghuni < data.kapasitas;
                })
                .map((kamar) => (
                  <option key={kamar.id_kamar} value={kamar.id_kamar}>
                    {kamar.nama_kamar}
                  </option>
                ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPindahModal(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handlePindahSubmit}
                className="px-4 py-2 bg-[#293040] text-[#D3AC2B] rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
      {/* card kamar*/}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {kamars.map((kamar) => (
          <div
            key={kamar.id_kamar}
            className="bg-white rounded-xl border shadow-sm overflow-hidden"
          >
            <div className="bg-[#293040] text-white p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{kamar.nama_kamar}</h3>

                  <p className="text-sm text-gray-300">Blok {kamar.blok}</p>
                </div>

                <FaBed size={24} className="text-[#D3AC2B]" />
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 text-sm font-semibold">
                {kamar.jumlah_penghuni}/{kamar.kapasitas} Penghuni
              </div>

              <div className="mb-3">
                {kamar.jumlah_penghuni < kamar.kapasitas ? (
                  <span className="text-green-600 text-sm">Tersedia</span>
                ) : (
                  <span className="text-red-600 text-sm">Penuh</span>
                )}
              </div>

              {kamar.penghuni.length === 0 ? (
                <p className="text-gray-400">Belum ada penghuni</p>
              ) : (
                kamar.penghuni.map((anak) => (
                  <div
                    key={anak.id_anak}
                    className="flex items-center gap-2 py-2 border-b last:border-0"
                  >
                    <FaUser className="text-[#D3AC2B]" />

                    {anak.nama_anak}
                    <button
                      onClick={() => handlePindahClick(anak)}
                      className="ml-auto bg-[#293040] text-[#D3AC2B] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-[#1e2535] hover:shadow-md transition"
                    >
                      Pindah
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}