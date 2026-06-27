
import {
  MdDashboard,
  MdPeople,
  MdReceiptLong,
  MdChildCare,
  MdGavel,
  MdMeetingRoom,
  MdChevronLeft,
  MdChevronRight,
  MdAdminPanelSettings,
} from "react-icons/md";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const primaryMenuClass = ({ isActive }) =>
    `
      relative
      flex
      items-center
      ${collapsed ? "justify-center px-3" : "gap-3 px-4"}
      py-3
      rounded-xl
      text-sm
      transition-all
      duration-300
      overflow-hidden
      group
      ${
        isActive
          ? "font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
          : "hover:bg-white/[0.07] hover:translate-x-1"
      }
    `;

  const primaryMenuStyle = (isActive) =>
    isActive
      ? {
          background:
            "linear-gradient(90deg, rgba(211,172,43,0.28), rgba(211,172,43,0.08))",
          color: "#E8C649",
          boxShadow:
            "inset 3px 0 0 #D3AC2B, 0 8px 20px rgba(0,0,0,0.12)",
        }
      : {
          color: "rgba(255,255,255,0.67)",
          boxShadow: "inset 3px 0 0 transparent",
        };

  const secondaryMenuClass = ({ isActive }) =>
    `
      relative
      flex
      items-center
      ${collapsed ? "justify-center px-3" : "gap-3 px-4"}
      py-3
      rounded-xl
      text-sm
      transition-all
      duration-300
      overflow-hidden
      group
      ${
        isActive
          ? "font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
          : "hover:bg-white/[0.07] hover:translate-x-1"
      }
    `;

  const secondaryMenuStyle = (isActive) =>
    isActive
      ? {
          background:
            "linear-gradient(90deg, rgba(126,200,245,0.24), rgba(126,200,245,0.06))",
          color: "#8ED3FA",
          boxShadow:
            "inset 3px 0 0 #7EC8F5, 0 8px 20px rgba(0,0,0,0.12)",
        }
      : {
          color: "rgba(255,255,255,0.6)",
          boxShadow: "inset 3px 0 0 transparent",
        };

  return (
    <aside
      className={`
        relative
        flex
        min-h-screen
        shrink-0
        flex-col
        overflow-visible
        transition-all
        duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
      style={{
        background:
          "linear-gradient(180deg, #30394B 0%, #293040 45%, #222938 100%)",
        boxShadow: "8px 0 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Dekorasi latar */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[#D3AC2B]/[0.07] blur-2xl" />

        <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[#7EC8F5]/[0.05] blur-3xl" />
      </div>

      {/* Tombol Collapse */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Buka sidebar" : "Tutup sidebar"}
        className="
          absolute
          -right-4
          top-8
          z-50
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border-4
          border-[#F5F7FB]
          bg-[#D3AC2B]
          text-[#293040]
          shadow-[0_6px_18px_rgba(0,0,0,0.25)]
          transition-all
          duration-300
          hover:scale-110
          hover:bg-[#E4BE3E]
          active:scale-95
        "
      >
        {collapsed ? (
          <MdChevronRight size={20} />
        ) : (
          <MdChevronLeft size={20} />
        )}
      </button>

      {/* Logo */}
      <div
        className={`
          relative
          z-10
          flex
          min-h-[96px]
          items-center
          border-b
          border-white/10
          px-4
          py-5
          ${collapsed ? "justify-center" : "gap-3"}
        `}
      >
        <div
          className="
            relative
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#E3BF3E]
            to-[#C59A16]
            shadow-[0_10px_25px_rgba(211,172,43,0.25)]
            transition-transform
            duration-300
            hover:rotate-3
            hover:scale-105
          "
        >
          <div className="absolute inset-1 rounded-xl border border-white/20" />

          <MdAdminPanelSettings className="relative z-10 text-[29px] text-[#293040]" />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-bold tracking-tight text-white">
              LPKA Sistem Web
            </h1>

            <p className="mt-1 truncate text-[11px] text-white/40">
              Politeknik Caltex Riau
            </p>
          </div>
        )}
      </div>

      {/* Daftar Menu */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && (
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/30">
              MENU UTAMA
            </p>

            <span className="h-1.5 w-1.5 rounded-full bg-[#D3AC2B]" />
          </div>
        )}

        <ul className="space-y-1.5">
          <li>
            <NavLink
              to="/"
              title={collapsed ? "Dashboard" : ""}
              className={primaryMenuClass}
              style={({ isActive }) =>
                primaryMenuStyle(isActive)
              }
            >
              <MdDashboard className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Dashboard
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/kamar"
              title={collapsed ? "Data Kamar" : ""}
              className={primaryMenuClass}
              style={({ isActive }) =>
                primaryMenuStyle(isActive)
              }
            >
              <MdReceiptLong className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Data Kamar
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pembina"
              title={collapsed ? "Data Pembina" : ""}
              className={primaryMenuClass}
              style={({ isActive }) =>
                primaryMenuStyle(isActive)
              }
            >
              <MdPeople className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Data Pembina
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        {/* Pembatas */}
        <div className="my-6">
          {collapsed ? (
            <div className="mx-auto h-px w-8 bg-white/10" />
          ) : (
            <div className="flex items-center gap-3 px-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />

              <span className="text-[10px] font-semibold tracking-[0.18em] text-[#7EC8F5]">
                BINAAN
              </span>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
            </div>
          )}
        </div>

        <ul className="space-y-1.5">
          <li>
            <NavLink
              to="/anak-binaan"
              title={collapsed ? "Data Anak Binaan" : ""}
              className={secondaryMenuClass}
              style={({ isActive }) =>
                secondaryMenuStyle(isActive)
              }
            >
              <MdChildCare className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Data Anak Binaan
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pelanggaran"
              title={
                collapsed
                  ? "Pelanggaran & Sanksi"
                  : ""
              }
              className={secondaryMenuClass}
              style={({ isActive }) =>
                secondaryMenuStyle(isActive)
              }
            >
              <MdGavel className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Pelanggaran & Sanksi
                </span>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/penempatan"
              title={collapsed ? "Penempatan" : ""}
              className={secondaryMenuClass}
              style={({ isActive }) =>
                secondaryMenuStyle(isActive)
              }
            >
              <MdMeetingRoom className="shrink-0 text-[22px] transition-transform duration-300 group-hover:scale-110" />

              {!collapsed && (
                <span className="truncate">
                  Penempatan
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 p-4">
        {collapsed ? (
          <div
            className="
              mx-auto
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
            "
            title="LPKA Sistem Web"
          >
            <span className="text-xs font-bold text-[#D3AC2B]">
              LP
            </span>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

              <span className="text-xs font-semibold text-white/65">
                Sistem Aktif
              </span>
            </div>

            <div className="mt-2 text-[10px] text-white/25">
              © 2025 LPKA Sistem Web
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

