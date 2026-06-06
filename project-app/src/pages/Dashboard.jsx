import { FaUserFriends, FaDoorOpen, FaClipboardList, FaPrint } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" breadcrumb="Dashboard">
                narapidana
            </PageHeader>

            <div id="dashboard-grid" className="px-6 pb-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* Total Anak Binaan */}
                <div
                    id="dashboard-orders"
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 transition-shadow hover:shadow-sm"
                    style={{ border: "0.5px solid #E4E6EA", borderLeft: "3px solid #D3AC2B" }}>
                    <div
                        id="orders-icon"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#D3AC2B" }}>
                        <FaUserFriends className="text-xl" style={{ color: "#293040" }} />
                    </div>
                    <div id="orders-info" className="flex flex-col min-w-0">
                        <span
                            id="orders-count"
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}>
                            75
                        </span>
                        <span
                            id="orders-text"
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "#8A90A0" }}>
                            Total Anak Binaan
                        </span>
                    </div>
                </div>

                {/* Kamar Aktif */}
                <div
                    id="dashboard-delivered"
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 transition-shadow hover:shadow-sm"
                    style={{ border: "0.5px solid #E4E6EA" }}
                >
                    <div
                        id="delivered-icon"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#3B475C" }}
                    >
                        <FaDoorOpen className="text-xl" style={{ color: "#FFFFFF" }} />
                    </div>
                    <div id="delivered-info" className="flex flex-col min-w-0">
                        <span
                            id="delivered-count"
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            18
                        </span>
                        <span
                            id="delivered-text"
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "#8A90A0" }}
                        >
                            Kamar Aktif
                        </span>
                    </div>
                </div>

                {/* Pelanggaran Aktif */}
                <div
                    id="dashboard-canceled"
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 transition-shadow hover:shadow-sm"
                    style={{ border: "0.5px solid #E4E6EA" }}
                >
                    <div
                        id="canceled-icon"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#A32D2D" }}
                    >
                        <FaClipboardList className="text-xl" style={{ color: "#FFFFFF" }} />
                    </div>
                    <div id="canceled-info" className="flex flex-col min-w-0">
                        <span
                            id="canceled-count"
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            7
                        </span>
                        <span
                            id="canceled-text"
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "#8A90A0" }}
                        >
                            Pelanggaran Aktif
                        </span>
                    </div>
                </div>

                {/* Sterek Dicetak */}
                <div
                    id="dashboard-revenue"
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 transition-shadow hover:shadow-sm"
                    style={{ border: "0.5px solid #E4E6EA" }}
                >
                    <div
                        id="revenue-icon"
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#293040" }}
                    >
                        <FaPrint className="text-xl" style={{ color: "#D3AC2B" }} />
                    </div>
                    <div id="revenue-info" className="flex flex-col min-w-0">
                        <span
                            id="revenue-amount"
                            className="text-2xl font-semibold leading-tight"
                            style={{ color: "#293040", letterSpacing: "-0.02em" }}
                        >
                            3
                        </span>
                        <span
                            id="revenue-text"
                            className="text-xs mt-0.5 truncate"
                            style={{ color: "#8A90A0" }}
                        >
                            Sterek Dicetak Hari Ini
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}