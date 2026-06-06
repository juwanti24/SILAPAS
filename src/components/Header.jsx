import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div
            id="header-container"
            className="flex justify-between items-center px-6 py-3"
            style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "0.5px solid #E4E6EA",
            }}
        >
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-sm">
                <input
                    id="search-input"
                    className="w-full text-sm pl-4 pr-10 py-2 rounded-lg outline-none transition-all"
                    style={{
                        backgroundColor: "#F2F3F5",
                        border: "0.5px solid #E4E6EA",
                        color: "#293040",
                    }}
                    type="text"
                    placeholder="Search here..."
                    onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                    onBlur={(e) => (e.target.style.borderColor = "#E4E6EA")}
                />
                <FaSearch
                    id="search-icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: "#8A90A0" }}
                />
            </div>

            {/* Icons & Profile */}
            <div id="icons-container" className="flex items-center gap-2 ml-4">
                {/* Notification */}
                <div
                    id="notification-icon"
                    className="relative p-2.5 rounded-xl cursor-pointer transition-colors"
                    style={{ backgroundColor: "rgba(41,48,64,0.06)" }}
                >
                    <FaBell style={{ color: "#3B475C", fontSize: "15px" }} />
                    <span
                        id="notification-badge"
                        className="absolute -top-1 -right-1 text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full"
                        style={{ backgroundColor: "#D3AC2B", color: "#293040", fontSize: "9px" }}
                    >
                        50
                    </span>
                </div>

                {/* Chart */}
                <div
                    id="chart-icon"
                    className="p-2.5 rounded-xl cursor-pointer transition-colors"
                    style={{ backgroundColor: "rgba(41,48,64,0.06)" }}
                >
                    <FcAreaChart style={{ fontSize: "15px" }} />
                </div>

                {/* Settings */}
                <div
                    id="settings-icon"
                    className="p-2.5 rounded-xl cursor-pointer transition-colors"
                    style={{ backgroundColor: "rgba(41,48,64,0.06)" }}
                >
                    <SlSettings style={{ color: "#3B475C", fontSize: "15px" }} />
                </div>

                {/* Divider */}
                <div className="w-px h-6 mx-1" style={{ backgroundColor: "#E4E6EA" }} />

                {/* Profile */}
                <div id="profile-container" className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs" style={{ color: "#8A90A0" }}>Hello,</p>
                        <p
                            id="profile-text"
                            className="text-sm font-semibold leading-tight"
                            style={{ color: "#293040" }}
                        >
                            Admin
                        </p>
                    </div>
                    <img
                        id="profile-avatar"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                        style={{ border: "2px solid #D3AC2B" }}
                        src="./public/img/cat.png"
                        alt="profile"
                    />
                </div>
            </div>
        </div>
    );
}