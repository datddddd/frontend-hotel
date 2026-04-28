import React from "react";
import { X } from "lucide-react";

const UpdateBookingModal = ({ isOpen, onClose, editingBooking, formData, setFormData, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Cập nhật trạng thái</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
            <p className="text-sm text-slate-500 mb-1">Đang chỉnh sửa cho:</p>
            <p className="font-bold text-indigo-600">{editingBooking?.full_name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Trạng thái mới</label>
            <select
              className="w-full bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-xl p-3 outline-none transition-all shadow-sm"
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option value="BOOKED">Booked (Chờ nhận)</option>
              <option value="checked_in">Checked In (Đã nhận)</option>
              <option value="checked_out">Checked Out (Đã trả)</option>
            </select>
          </div>

          {Number(editingBooking?.remaining_amount) > 0 && (
            <label className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-indigo-600"
                checked={formData.payFull}
                onChange={(e) => setFormData((prev) => ({ ...prev, payFull: e.target.checked }))}
              />
              <div>
                <p className="font-semibold text-amber-700">Thanh toán hết</p>
                <p className="text-sm text-amber-600">
                  Thu nốt: {(Number(editingBooking?.remaining_amount) || 0).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </label>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookingModal;