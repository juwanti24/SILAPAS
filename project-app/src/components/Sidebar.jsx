import {
    MdDashboard,
    MdPeople,
    MdReceiptLong,
    MdChildCare,
    MdGavel,
    MdMeetingRoom
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl px-4 py-3 space-x-3 text-sm transition-all duration-150
        ${isActive ? "font-semibold" : "hover:font-medium"}`;

    const menuStyle = (isActive) =>
        isActive
            ? { backgroundColor: "rgba(211,172,43,0.15)", color: "#D3AC2B" }
            : { color: "rgba(255,255,255,0.55)" };

    // Style khusus untuk menu 4-6 (secondary group)
    const menuClassSecondary = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-lg px-4 py-2.5 space-x-3 text-sm transition-all duration-150
        ${isActive ? "font-semibold" : "hover:font-medium"}`;

    const menuStyleSecondary = (isActive) =>
        isActive
            ? {
                backgroundColor: "rgba(100,180,255,0.12)",
                color: "#7EC8F5",
                borderLeft: "3px solid #7EC8F5",
            }
            : {
                color: "rgba(255,255,255,0.45)",
                borderLeft: "3px solid transparent",
            };

    return (
        <div
            id="sidebar"
            className="flex min-h-screen w-64 flex-col py-6 px-4"
            style={{ backgroundColor: "#293040" }}
        >
            {/* Logo */}
            <div
                id="sidebar-logo"
                className="flex items-center gap-3 px-2 pb-6 mb-2"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}
            >
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#D3AC2B" }}
                >
                    {/* Ganti logo: ikon MdMeetingRoom sebagai simbol lembaga */}
                    <MdChildCare style={{ color: "#293040", fontSize: "20px" }} />
                </div>
                <div>
                    <span
                        id="logo-title"
                        className="font-semibold text-sm leading-tight"
                        style={{ color: "#FFFFFF" }}
                    >
                        LPKA Sistem Web
                    </span>
                    <p
                        id="logo-subtitle"
                        className="text-xs leading-tight mt-0.5"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                        Politeknik Caltex Riau
                    </p>
                </div>
            </div>

            {/* Menu utama */}
            <div id="sidebar-menu" className="mt-4 flex-1">
                <p
                    className="text-xs font-medium px-2 mb-2"
                    style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.09em" }}
                >
                    MENU UTAMA
                </p>
                <ul id="menu-list" className="space-y-1">
                    <li>
                        <NavLink
                            id="menu-1"
                            to="/"
                            className={menuClass}
                            style={({ isActive }) => menuStyle(isActive)}
                        >
                            <MdDashboard className="text-lg flex-shrink-0" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-2"
                            to="/orders"
                            className={menuClass}
                            style={({ isActive }) => menuStyle(isActive)}
                        >
                            <MdReceiptLong className="text-lg flex-shrink-0" />
                            <span>Data Kamar</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-3"
                            to="/customers"
                            className={menuClass}
                            style={({ isActive }) => menuStyle(isActive)}
                        >
                            <MdPeople className="text-lg flex-shrink-0" />
                            <span>Data Pembina</span>
                        </NavLink>
                    </li>
                </ul>

                {/* Divider untuk grup secondary */}
                <div className="my-3 px-2 flex items-center gap-2">
                    <div style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
                    <span
                        className="text-xs font-medium"
                        style={{ color: "rgba(100,180,255,0.5)", letterSpacing: "0.09em" }}
                    >
                        BINAAN
                    </span>
                    <div style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
                </div>

                <ul className="space-y-1">
                    <li>
                        <NavLink
                            id="menu-4"
                            to="/anak-binaan"
                            className={menuClassSecondary}
                            style={({ isActive }) => menuStyleSecondary(isActive)}
                        >
                            <MdChildCare className="text-lg flex-shrink-0" />
                            <span>Data Anak Binaan</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-5"
                            to="/pelanggaran"
                            className={menuClassSecondary}
                            style={({ isActive }) => menuStyleSecondary(isActive)}
                        >
                            <MdGavel className="text-lg flex-shrink-0" />
                            <span>Pelanggaran & Sanksi</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-6"
                            to="/penempatan"
                            className={menuClassSecondary}
                            style={({ isActive }) => menuStyleSecondary(isActive)}
                        >
                            <MdMeetingRoom className="text-lg flex-shrink-0" />
                            <span>Penempatan</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div
                id="sidebar-footer"
                className="mt-auto pt-4"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
            >
                <div
                    id="footer-card"
                    className="rounded-xl p-3 mb-5 flex items-center gap-3"
                    style={{
                        backgroundColor: "rgba(211,172,43,0.12)",
                        border: "0.5px solid rgba(211,172,43,0.25)",
                    }}
                >
                    <div
                        id="footer-text"
                        className="flex-1 text-xs"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                        <span>Atur menu melalui tombol di bawah!</span>
                        <div
                            id="add-menu-button"
                            className="flex justify-center items-center p-1.5 mt-2 rounded-lg cursor-pointer"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.6)",
                            }}
                        >
                            <span>Add Menus</span>
                        </div>
                    </div>
                    <img
                        id="footer-avatar"
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        src="./public/img/cat.png"
                        alt="avatar"
                    />
                </div>

                <span
                    id="footer-brand"
                    className="block text-xs font-semibold"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                >
                    LPKA Sistem Web
                </span>
                <p
                    id="footer-copyright"
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                >
                    © 2025 All Rights Reserved
                </p>
            </div>
        </div>
    );
}