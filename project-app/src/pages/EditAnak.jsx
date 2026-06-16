import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

export default function EditAnak() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [pembinas, setPembinas] = useState([]);
    const [form, setForm] = useState({
        nama_anak: "",
        tanggal_lahir: "",
        tanggal_masuk: "",
        jenis_kelamin: "",
        alamat: "",
        id_pembina: "",
    });

    useEffect(() => {

        axios
            .get(`http://127.0.0.1:8000/api/anak-binaans/${id}`)
            .then((res) => {
                setForm(res.data);
            });

        axios
            .get("http://127.0.0.1:8000/api/pembinas")
            .then((response) => {
                setPembinas(response.data);
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
            .put(
                `http://127.0.0.1:8000/api/anak-binaans/${id}`,
                form
            )
            .then(() => {
                navigate("/anak-binaan");
            });

    };

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <Link
                to="/anak-binaan"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D3AC2B] mb-6"
            >
                <FaArrowLeft />
                Kembali
            </Link>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

                <h1 className="text-2xl font-bold text-[#0f1f3d] mb-6">
                    Edit Anak Binaan
                </h1>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="nama_anak"
                        value={form.nama_anak}
                        onChange={handleChange}
                        placeholder="Nama Anak"
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        name="jenis_kelamin"
                        value={form.jenis_kelamin}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>

                    <input
                        type="date"
                        name="tanggal_lahir"
                        value={form.tanggal_lahir}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />

                    <input
                        type="date"
                        name="tanggal_masuk"
                        value={form.tanggal_masuk}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
    name="id_pembina"
    value={form.id_pembina || ""}
    onChange={handleChange}
    className="border rounded-lg px-3 py-2"
>
    <option value="">
        Pilih Pembina
    </option>

    {pembinas.map((pembina) => (
        <option
            key={pembina.id_pembina}
            value={pembina.id_pembina}
        >
            {pembina.nama_pembina} (ID: {pembina.id_pembina})
        </option>
    ))}
</select>

                    <input
                        type="text"
                        name="alamat"
                        value={form.alamat}
                        onChange={handleChange}
                        placeholder="Alamat"
                        className="border rounded-lg px-3 py-2"
                    />

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