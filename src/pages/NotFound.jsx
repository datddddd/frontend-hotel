import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md border border-slate-100 p-8 text-center">
        <p className="text-sm font-semibold tracking-wide text-red-500">ERROR 404</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
          Không tìm thấy trang
        </h1>
        <p className="mt-3 text-slate-600">
          Địa chỉ bạn nhập không tồn tại hoặc đã được thay đổi.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
