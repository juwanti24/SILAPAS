import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

export default function EditPembina() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_pembina: "",
    jenis_kelamin: "",
    no_hp: "",
    alamat: "",
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pembinas/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/pembinas/${id}`, form)
      .then(() => {
        navigate("/pembina");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/pembina"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D3AC2B] mb-6"
      >
        <FaArrowLeft />
        Kembali
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-[#0f1f3d] mb-6">Edit Pembina</h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Nama Pembina</label>

            <input
              type="text"
              name="nama_pembina"
              value={form.nama_pembina}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Jenis Kelamin</label>

            <select
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Laki-laki">Laki-laki</option>

              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">No HP</label>

            <input
              type="text"
              name="no_hp"
              value={form.no_hp}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Alamat</label>

            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#293040] text-[#D3AC2B] px-6 py-2 rounded-lg font-semibold hover:bg-[#1e2535]"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
