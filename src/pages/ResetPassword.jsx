import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/reset-password", {
        token,
        newPassword: password,
      });

      alert(response.data.message || "Đổi mật khẩu thành công!");
      navigate("/login"); // Chuyển hướng sau khi thành công
    } catch (error) {
      alert(error.response?.data?.error || "Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();

      // 1. Kiểm tra độ dài
      if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return; // Dừng hàm, không gọi API
      }

      // 2. Kiểm tra khớp mật khẩu (cho trang ResetPassword)
      if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      setLoading(true);
      // ... gọi API như bình thường
    };
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
          <p className="text-gray-500 mt-2">Vui lòng nhập mật khẩu mới của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              }`}
          >
            {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Quay lại trang đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;