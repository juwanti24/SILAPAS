export default function Register() {
    return (
        <div>
            <div className="mb-7">
                <h2
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#293040", letterSpacing: "-0.01em" }}
                >
                    Buat akun baru
                </h2>
                <p className="text-sm" style={{ color: "#8A90A0" }}>
                    Daftarkan akun petugas LPKA Anda
                </p>
            </div>
            <form>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "#3B475C" }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
                        style={{
                            backgroundColor: "#F7F8FA",
                            border: "0.5px solid #D0D3DA",
                            color: "#293040",
                        }}
                        placeholder="admin@lpka.go.id"
                        onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                        onBlur={(e) => (e.target.style.borderColor = "#D0D3DA")}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "#3B475C" }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
                        style={{
                            backgroundColor: "#F7F8FA",
                            border: "0.5px solid #D0D3DA",
                            color: "#293040",
                        }}
                        placeholder="••••••••"
                        onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                        onBlur={(e) => (e.target.style.borderColor = "#D0D3DA")}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "#3B475C" }}
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
                        style={{
                            backgroundColor: "#F7F8FA",
                            border: "0.5px solid #D0D3DA",
                            color: "#293040",
                        }}
                        placeholder="••••••••"
                        onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                        onBlur={(e) => (e.target.style.borderColor = "#D0D3DA")}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90 active:opacity-80"
                    style={{
                        backgroundColor: "#293040",
                        color: "#D3AC2B",
                        letterSpacing: "0.01em",
                    }}
                >
                    Daftar sekarang
                </button>
            </form>

            {/* Back to login */}
            <p className="text-center text-xs mt-6" style={{ color: "#8A90A0" }}>
                Sudah punya akun?{" "}
                <a
                    href="/login"
                    className="font-medium transition-opacity hover:opacity-75"
                    style={{ color: "#D3AC2B" }}
                >
                    Masuk ke sistem
                </a>
            </p>
        </div>
    );
}