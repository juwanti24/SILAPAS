export default function NotFound() {
  return (
    <div
      id="order-container"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-4 text-center"
    >
      <h1 className="text-9xl font-bold text-indigo-600 leading-none">404</h1>

      <h2 className="text-2xl font-semibold mt-4 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 text-base max-w-sm mb-8">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
    </div>
  );
}
