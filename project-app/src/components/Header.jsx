import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import {
  FaBell,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [
    jumlahBelumDitempatkan,
    setJumlahBelumDitempatkan,
  ] = useState(0);

  const [profilePhoto, setProfilePhoto] = useState(
    () =>
      localStorage.getItem("profilePhoto") ||
      "/img/cat.png"
  );

  // Memperbarui notifikasi setiap berpindah halaman
  useEffect(() => {
    fetchNotifikasiPenempatan();
  }, [location.pathname]);

  const fetchNotifikasiPenempatan = () => {
    axios
      .get(
        "http://127.0.0.1:8000/api/anak-belum-ditempatkan"
      )
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setJumlahBelumDitempatkan(data.length);
      })
      .catch((error) => {
        console.error(
          "Gagal mengambil notifikasi penempatan:",
          error
        );

        setJumlahBelumDitempatkan(0);
      });
  };

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleChangePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageResult = reader.result;

      setProfilePhoto(imageResult);

      localStorage.setItem(
        "profilePhoto",
        imageResult
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <header
      id="header-container"
      className="
        sticky top-0 z-40
        flex min-h-[72px]
        items-center justify-between
        border-b border-slate-200/80
        bg-white/95 px-4
        shadow-[0_4px_20px_rgba(15,23,42,0.04)]
        backdrop-blur-xl
        sm:px-6
      "
    >
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <FaSearch
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-sm text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Cari data..."
          className="
            w-full rounded-xl
            border border-slate-200
            bg-slate-50/80
            py-2.5 pl-11 pr-4
            text-sm text-[#293040]
            outline-none
            transition-all duration-200
            placeholder:text-slate-400
            hover:border-slate-300
            focus:border-[#D3AC2B]
            focus:bg-white
            focus:ring-4
            focus:ring-[#D3AC2B]/10
          "
        />
      </div>

      {/* Menu Header */}
      <div className="ml-4 flex shrink-0 items-center gap-2">
        {/* Notifikasi Penempatan */}
        <button
          type="button"
          title={`${jumlahBelumDitempatkan} anak belum mendapatkan kamar`}
          onClick={() => navigate("/penempatan")}
          className="
            group relative
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-slate-50
            text-[#3B475C]
            transition-all duration-200
            hover:-translate-y-0.5
            hover:border-[#D3AC2B]/40
            hover:bg-amber-50
            hover:text-[#B68D10]
            hover:shadow-md
          "
        >
          <FaBell
            className="
              text-[15px]
              transition-transform
              group-hover:rotate-12
            "
          />

          <span
            className={`
              absolute -right-1.5 -top-1.5
              flex h-5 min-w-5
              items-center justify-center
              rounded-full
              border-2 border-white
              px-1 text-[9px]
              font-bold text-white
              shadow-sm
              ${
                jumlahBelumDitempatkan > 0
                  ? "bg-red-500"
                  : "bg-emerald-500"
              }
            `}
          >
            {jumlahBelumDitempatkan > 99
              ? "99+"
              : jumlahBelumDitempatkan}
          </span>
        </button>

        {/* Menu Pelanggaran */}
        <button
          type="button"
          title="Lihat Pelanggaran dan Sanksi"
          onClick={() => navigate("/pelanggaran")}
          className="
            group hidden h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-slate-50
            text-[#3B475C]
            transition-all duration-200
            hover:-translate-y-0.5
            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600
            hover:shadow-md
            sm:flex
          "
        >
          <FaClipboardList
            className="
              text-[16px]
              transition-transform duration-200
              group-hover:scale-110
            "
          />
        </button>

        {/* Ganti Foto Profil */}
        <button
          type="button"
          title="Ganti foto profil"
          onClick={handleOpenFile}
          className="
            group hidden h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-slate-50
            text-[#3B475C]
            transition-all duration-200
            hover:-translate-y-0.5
            hover:border-[#D3AC2B]/40
            hover:bg-amber-50
            hover:text-[#B68D10]
            hover:shadow-md
            sm:flex
          "
        >
          <SlSettings
            className="
              text-[16px]
              transition-transform duration-500
              group-hover:rotate-90
            "
          />
        </button>

        {/* Input File Tersembunyi */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleChangePhoto}
          className="hidden"
        />

        {/* Pembatas */}
        <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <div
          className="
            flex items-center gap-3
            rounded-xl px-2 py-1.5
          "
        >
          <div className="hidden text-right md:block">
            <p className="text-[11px] text-slate-400">
              Selamat datang,
            </p>

            <p className="text-sm font-bold leading-tight text-[#293040]">
              Admin
            </p>
          </div>

          <div className="relative shrink-0">
            <img
              src={profilePhoto}
              alt="Profil Admin"
              className="
                h-10 w-10
                rounded-xl object-cover
                ring-2 ring-[#D3AC2B]
                ring-offset-2 ring-offset-white
              "
            />

            <span
              className="
                absolute -bottom-0.5 -right-0.5
                h-3 w-3 rounded-full
                border-2 border-white
                bg-emerald-500
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
}

