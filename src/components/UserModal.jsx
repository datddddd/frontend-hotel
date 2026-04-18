import { X } from "lucide-react";
import { Edit, Trash2, Plus, KeyRound } from "lucide-react";
const UserModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transition-all">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tên người dùng</label>
            <input
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.user_name}
              onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
              placeholder="Nhập họ tên..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>

          {/* Chỉ hiện mật khẩu khi Thêm mới */}
          {!isEditing && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu</label>
              <input
                required
                type="password"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Trạng thái</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status_user}
                onChange={(e) => setFormData({ ...formData, status_user: e.target.value })}
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Bị khóa</option>
              </select>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-all font-medium"
            >
              {isEditing ? "Cập nhật" : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;