import {
  MdDashboard,
  MdPeople,
  MdReceiptLong,
  MdChildCare,
  MdGavel,
  MdMeetingRoom,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuClass = ({ isActive }) =>
    `
    flex items-center
    rounded-xl
    px-4 py-3
    text-sm
    transition-all
    duration-300
    group
    ${
      isActive
        ? "font-semibold shadow-lg"
        : "hover:bg-white/5 hover:translate-x-1"
    }
  `;

  const menuStyle = (isActive) =>
    isActive
      ? {
          background:
            "linear-gradient(90deg, rgba(211,172,43,0.25), rgba(211,172,43,0.08))",
          color: "#D3AC2B",
        }
      : {
          color: "rgba(255,255,255,0.65)",
        };

  const menuClassSecondary = ({ isActive }) =>
    `
    flex items-center
    rounded-xl
    px-4 py-3
    text-sm
    transition-all
    duration-300
    group
    ${
      isActive
        ? "font-semibold shadow-lg"
        : "hover:bg-white/5 hover:translate-x-1"
    }
  `;

  const menuStyleSecondary = (isActive) =>
    isActive
      ? {
          background:
            "linear-gradient(90deg, rgba(126,200,245,0.25), rgba(126,200,245,0.08))",
          color: "#7EC8F5",
          borderLeft: "3px solid #7EC8F5",
        }
      : {
          color: "rgba(255,255,255,0.55)",
          borderLeft: "3px solid transparent",
        };

  return (
    <div
      className={`
      relative
      flex
      flex-col
      min-h-screen
      transition-all
      duration-300
      ${collapsed ? "w-20" : "w-64"}
      `}
      style={{
        backgroundColor: "#293040",
      }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute
          -right-3
          top-8
          z-50
          bg-[#D3AC2B]
          text-[#293040]
          rounded-full
          p-1.5
          shadow-xl
          hover:scale-110
          transition
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
        className="
          px-4
          py-6
          flex
          items-center
          gap-3
          border-b
          border-white/10
        "
      >
        <div
          className="
            w-11
            h-11
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-lg
          "
          style={{
            backgroundColor: "#D3AC2B",
          }}
        >
          <MdChildCare
            style={{
              color: "#293040",
              fontSize: "22px",
            }}
          />
        </div>

        {!collapsed && (
          <div>
            <h1 className="text-white font-bold text-sm">
              LPKA Sistem Web
            </h1>

            <p className="text-[11px] text-white/40">
              Politeknik Caltex Riau
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 px-3 py-5">
        {!collapsed && (
          <p className="text-[11px] text-white/30 mb-3 px-2 tracking-widest">
            MENU UTAMA
          </p>
        )}

        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={menuClass}
              style={({ isActive }) => menuStyle(isActive)}
            >
              <MdDashboard className="text-xl shrink-0" />

              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/kamar"
              className={menuClass}
              style={({ isActive }) => menuStyle(isActive)}
            >
              <MdReceiptLong className="text-xl shrink-0" />

              {!collapsed && <span>Data Kamar</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pembina"
              className={menuClass}
              style={({ isActive }) => menuStyle(isActive)}
            >
              <MdPeople className="text-xl shrink-0" />

              {!collapsed && <span>Data Pembina</span>}
            </NavLink>
          </li>
        </ul>

        {/* Divider */}
        <div className="my-6">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-white/10" />

              <span className="text-[11px] text-[#7EC8F5] tracking-widest">
                BINAAN
              </span>

              <div className="flex-1 h-px bg-white/10" />
            </div>
          )}
        </div>

        <ul className="space-y-2">
          <li>
            <NavLink
              to="/anak-binaan"
              className={menuClassSecondary}
              style={({ isActive }) =>
                menuStyleSecondary(isActive)
              }
            >
              <MdChildCare className="text-xl shrink-0" />

              {!collapsed && <span>Data Anak Binaan</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pelanggaran"
              className={menuClassSecondary}
              style={({ isActive }) =>
                menuStyleSecondary(isActive)
              }
            >
              <MdGavel className="text-xl shrink-0" />

              {!collapsed && <span>Pelanggaran & Sanksi</span>}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/penempatan"
              className={menuClassSecondary}
              style={({ isActive }) =>
                menuStyleSecondary(isActive)
              }
            >
              <MdMeetingRoom className="text-xl shrink-0" />

              {!collapsed && <span>Penempatan</span>}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div
        className="
          border-t
          border-white/10
          p-4
        "
      >
        {!collapsed && (
          <>
            <div className="text-xs text-white/50 font-semibold">
              LPKA Sistem Web
            </div>

            <div className="text-[11px] text-white/25 mt-1">
              © 2025 All Rights Reserved
            </div>
          </>
        )}
      </div>
    </div>
  );
}