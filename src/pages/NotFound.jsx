import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Minh họa số 404 lớn phía sau hoặc Icon */}
        <div className="relative mb-8">
          <h2 className="text-[120px] font-black text-slate-200 select-none leading-none">
            404
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Bạn có thể thay bằng một Lucide Icon như <FileQuestion /> */}
            <span className="text-5xl">🔍</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-10 relative z-10">
          <p className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-500 bg-red-50 rounded-full uppercase">
            Trang không tồn tại
          </p>

          <h1 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Ôi hỏng rồi!
          </h1>

          <p className="mt-4 text-slate-500 leading-relaxed">
            Có vẻ như đường dẫn này đã "đi lạc" hoặc không còn tồn tại nữa.
            Đừng lo, hãy để chúng tôi dẫn bạn về nhà.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Về trang chủ
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-all duration-200"
            >
              Quay lại
            </button>
          </div>
        </div>

        {/* Chân trang nhẹ nhàng */}
        <p className="mt-8 text-sm text-slate-400">
          Cần hỗ trợ? <a href="#" className="text-blue-500 hover:underline">Liên hệ kỹ thuật</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;