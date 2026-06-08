import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // proses submit
    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        axios
    .post("http://127.0.0.1:8000/api/login", {
        username: dataForm.username,
        password: dataForm.password,
    })
            .then((response) => {
                 localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // error dan loading
    const errorInfo = error ? (
        <div
            className="mb-5 p-4 text-sm rounded-lg flex items-center gap-2"
            style={{
                backgroundColor: "#FCEBEB",
                color: "#A32D2D",
                border: "0.5px solid #F7C1C1",
            }}
        >
            <BsFillExclamationDiamondFill className="shrink-0 text-base" style={{ color: "#A32D2D" }} />
            {error}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div
            className="mb-5 p-4 text-sm rounded-lg flex items-center gap-2"
            style={{
                backgroundColor: "rgba(41,48,64,0.06)",
                color: "#293040",
                border: "0.5px solid #d0d3da",
            }}
        >
            <ImSpinner2 className="animate-spin shrink-0" />
            Mohon tunggu...
        </div>
    ) : null;

    return (
        <div>
            {/* Heading */}
            <div className="mb-7">
                <h2
                    className="text-2xl font-semibold mb-1"
                    style={{ color: "#293040", letterSpacing: "-0.01em" }}
                >
                    Masuk ke sistem
                </h2>
                <p className="text-sm" style={{ color: "#8A90A0" }}>
                    Gunakan akun petugas LPKA Anda
                </p>
            </div>
            {errorInfo}
            {loadingInfo}
            <form onSubmit={handlesubmit}>
                <div className="mb-4">
                    <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "#3B475C" }}
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
                        style={{
                            backgroundColor: "#F7F8FA",
                            border: "0.5px solid #D0D3DA",
                            color: "#293040",
                        }}
                        placeholder="nama pengguna"
                        onChange={handleChange}
                        onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                        onBlur={(e) => (e.target.style.borderColor = "#D0D3DA")}
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label
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
                        name="password"
                        onChange={handleChange}
                        onFocus={(e) => (e.target.style.borderColor = "#D3AC2B")}
                        onBlur={(e) => (e.target.style.borderColor = "#D0D3DA")}
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold rounded-lg transition-opacity hover:opacity-90 active:opacity-80"
                    style={{
                        backgroundColor: "#293040",
                        color: "#D3AC2B",
                        letterSpacing: "0.01em",
                    }}
                >
                    Masuk ke sistem
                </button>
            </form>

            {/* Footer hint */}
            <p className="text-center text-xs mt-6" style={{ color: "#8A90A0" }}>
                Akses terbatas untuk petugas internal LPKA
            </p>
        </div>
    );
}