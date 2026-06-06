import "../assets/tailwind.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex" style={{ backgroundColor: "#F2F3F5" }}>
            <div className="flex flex-row flex-1">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    <main className="flex-1 p-6 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}