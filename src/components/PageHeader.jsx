export default function PageHeader({ title, breadcrumb, children }) {
    const breadcrumbItems = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

    return (
        <div
            id="pageheader-container"
            className="flex items-center justify-between w-full px-6 py-5"
        >
            {/* Kiri — judul + breadcrumb */}
            <div id="pageheader-left" className="flex flex-col">
                {/* Gold accent bar + judul */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-1 h-6 rounded-full shrink-0"
                        style={{ backgroundColor: "#D3AC2B" }}
                    />
                    <span
                        id="page-title"
                        className="text-xl font-semibold"
                        style={{ color: "#293040", letterSpacing: "-0.01em" }}
                    >
                        {title}
                    </span>
                </div>

                {/* Breadcrumb */}
                <div
                    id="breadcrumb-links"
                    className="flex items-center gap-1.5 mt-1.5 ml-4"
                >
                    <span className="text-xs" style={{ color: "#8A90A0" }}>
                        Dashboard
                    </span>
                    {breadcrumbItems.map((item, index) => (
                        <span key={index} className="flex items-center gap-1.5">
                            <span className="text-xs" style={{ color: "#D0D3DA" }}>/</span>
                            <span className="text-xs" style={{ color: "#8A90A0" }}>
                                {item}
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Kanan — tombol Add */}
            <div id="action-button">
                <button
                    id="add-button"
                    className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 active:opacity-80"
                    style={{ backgroundColor: "#293040", color: "#D3AC2B" }}
                >
                    Add {children}
                </button>
            </div>
        </div>
    );
}