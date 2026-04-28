import React from "react";
import { Edit, Trash2, DoorOpen, Search } from "lucide-react";

const BookingTable = ({ bookings, loading, limit, onEdit, onDelete }) => {
  // Hàm phụ trợ style (giữ nguyên logic của bạn)
  const getStatusStyle = (status) => {
    const styles = {
      BOOKED: "bg-blue-50 text-blue-600 border-blue-100",
      checked_in: "bg-emerald-50 text-emerald-600 border-emerald-100",
      checked_out: "bg-slate-50 text-slate-500 border-slate-100",
    };
    return styles[status] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="p-6 border-b border-slate-50 animate-pulse">
            <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center">
        <div className="flex flex-col items-center opacity-40">
          <Search size={48} className="mb-2" />
          <p className="text-lg font-medium">Không tìm thấy dữ liệu phù hợp</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-4 font-semibold text-slate-600 text-sm">Khách hàng</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Phòng</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Thời gian</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Trạng thái</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">Thanh toán</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                      {b.full_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{b.full_name}</p>
                      <p className="text-xs text-slate-400">ID: #{b.id.toString().slice(-4)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <DoorOpen size={16} className="text-slate-400" />
                    <span className="font-medium">Phòng {b.room_number}</span>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <div className="flex flex-col text-slate-600">
                    <span>{new Date(b.check_in_date).toLocaleDateString("vi-VN")}</span>
                    <span className="text-slate-400 text-xs">đến {new Date(b.check_out_date).toLocaleDateString("vi-VN")}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border ${getStatusStyle(b.status)}`}>
                    {b.status.replace("_", " ")}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <p className="font-semibold text-slate-800">{(Number(b.paid_amount) || 0).toLocaleString()}₫</p>
                    <p className="text-xs text-slate-500">Còn lại: {(Number(b.remaining_amount) || 0).toLocaleString()}₫</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(b)} className="p-2 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(b.id)} className="p-2 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;