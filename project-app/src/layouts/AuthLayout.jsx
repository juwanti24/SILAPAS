import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
            style={{ backgroundColor: "#F2F3F5" }}
        >
            <div className="w-full max-w-2xl mb-3">
                <p
                    className="text-center text-xs font-semibold"
                    style={{ color: "#3B475C", letterSpacing: "0.15em" }}
                >
                    LEMBAGA PEMBINAAN KHUSUS ANAK
                </p>
            </div>

            <div
                className="w-full max-w-2xl overflow-hidden"
                style={{
                    borderRadius: "16px",
                    border: "0.5px solid #E4E6EA",
                    boxShadow: "0 4px 24px rgba(41,48,64,0.08)",
                }}
            >
                <div className="flex flex-col sm:flex-row">
                    <div
                        className="sm:w-[45%] flex flex-col justify-between p-8"
                        style={{ backgroundColor: "#293040" }}
                    >
                        <div>
                            <div className="flex items-center gap-2.5 mb-7">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: "#D3AC2B" }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z"
                                            fill="#293040"
                                        />
                                    </svg>
                                </div>
                                <span
                                    className="text-base font-semibold"
                                    style={{ color: "#FFFFFF" }}
                                >
                                    LPKA Sistem Web
                                </span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[
                                    
                                    "Manajemen data anak binaan",
                                    "Akses terbatas petugas internal",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: "#D3AC2B" }}
                                        />
                                        <span
                                            className="text-sm"
                                            style={{ color: "rgba(255,255,255,0.65)" }}
                                        >
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p
                            className="text-xs mt-10"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                            © 2025 LPKA Sistem Web
                        </p>
                    </div>

                    <div className="flex-1 flex items-center bg-white p-8">
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
            <p
                className="text-center text-xs mt-5"
                style={{ color: "#8A90A0" }}
            >
                Akses terbatas untuk petugas internal LPKA · Politeknik Caltex Riau
            </p>
        </div>
    );
}