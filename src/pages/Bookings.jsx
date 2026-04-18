import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  Calendar,
  Filter,
  MoreVertical,
  User,
  DoorOpen
} from "lucide-react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({ status: "BOOKED" });

  const [filters, setFilters] = useState({
    status: "",
    search: "",
    check_in: "",
    check_out: ""
  });

  const [searchInput, setSearchInput] = useState("");

  // ================= FETCH =================
  const fetchBookings = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        params: { page, limit, ...filters }
      });
      setBookings(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage, fetchBookings]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput }));
    }, 500);
    return () => clearTimeout(delay);
  }, [searchInput]);

  // ================= ACTION =================
  const openModal = (booking) => {
    setEditingBooking(booking);
    setFormData({ status: booking.status });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${editingBooking.id}/status`,
        formData
      );
      setIsModalOpen(false);
      fetchBookings(currentPage);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa booking này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings(currentPage);
    } catch (err) {
      alert("Không thể xóa");
    }
  };

  const handleReset = () => {
    setFilters({ status: "", search: "", check_in: "", check_out: "" });
    setSearchInput("");
    setCurrentPage(1);
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "checked_in":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "checked_out":
        return "bg-slate-50 text-slate-500 border-slate-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "PARTIAL_PAID":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-700">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Quản lý Đặt phòng
          </h1>
          <p className="text-slate-500 mt-1">Hiển thị {bookings.length} kết quả trên trang {currentPage}</p>
        </div>
        <button 
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <RotateCcw size={18} /> <span className="font-medium">Làm mới bộ lọc</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* FILTER BAR */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[280px] relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20}/>
            <input
              placeholder="Tìm tên khách, số phòng..."
              className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-xl pl-11 p-2.5 transition-all outline-none"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
              <select
                className="appearance-none bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-xl pl-10 pr-8 py-2.5 outline-none text-sm"
                value={filters.status}
                onChange={e => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="BOOKED">Chờ nhận phòng</option>
                <option value="checked_in">Đã nhận phòng</option>
                <option value="checked_out">Đã trả phòng</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 ring-1 ring-slate-200 rounded-xl px-3 py-1">
               <Calendar size={16} className="text-slate-400" />
               <input
                type="date"
                className="bg-transparent border-none focus:ring-0 text-sm p-1.5 outline-none"
                value={filters.check_in}
                onChange={e => setFilters({ ...filters, check_in: e.target.value })}
              />
              <span className="text-slate-300">|</span>
              <input
                type="date"
                className="bg-transparent border-none focus:ring-0 text-sm p-1.5 outline-none"
                value={filters.check_out}
                onChange={e => setFilters({ ...filters, check_out: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-4 font-semibold text-slate-600 text-sm">Khách hàng</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Phòng</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Thời gian lưu trú</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Trạng thái</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm">Thanh toán</th>
                  <th className="p-4 font-semibold text-slate-600 text-sm text-right">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  [...Array(limit)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="6" className="p-6"><div className="h-10 bg-slate-100 rounded-lg w-full"></div></td>
                    </tr>
                  ))
                ) : bookings.length > 0 ? (
                  bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                            {b.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{b.full_name}</p>
                            <p className="text-xs text-slate-400 leading-tight">ID: #{b.id.toString().slice(-4)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <DoorOpen size={16} className="text-slate-400" />
                          <span className="font-medium">Phòng {b.room_number}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        <div className="flex flex-col">
                          <span>{new Date(b.check_in_date).toLocaleDateString("vi-VN")}</span>
                          <span className="text-slate-400 text-xs">đến {new Date(b.check_out_date).toLocaleDateString("vi-VN")}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusStyle(b.status)}`}>
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1 text-sm">
                          <p className="font-semibold text-slate-800">
                            Đã trả: {(Number(b.paid_amount) || 0).toLocaleString("vi-VN")}₫
                          </p>
                          <p className="text-slate-500">
                            Còn lại: {(Number(b.remaining_amount) || 0).toLocaleString("vi-VN")}₫
                          </p>
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPaymentStatusStyle(b.payment_status)}`}>
                            {b.payment_status === "PARTIAL_PAID" ? "Còn thiếu" : "Đã thanh toán"}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openModal(b)}
                            className="p-2 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 rounded-lg transition-colors"
                          >
                            <Edit size={18}/>
                          </button>
                          <button 
                            onClick={() => handleDelete(b.id)}
                            className="p-2 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg transition-colors"
                          >
                            <Trash2 size={18}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center">
                       <div className="flex flex-col items-center opacity-40">
                          <Search size={48} className="mb-2" />
                          <p className="text-lg font-medium">Không tìm thấy dữ liệu phù hợp</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-2 px-2">
          <p className="text-sm text-slate-500">
            Trang <span className="font-semibold text-slate-900">{currentPage}</span> / {totalPages}
          </p>
          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              <ChevronLeft size={20}/>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === i + 1 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                  : "bg-white border border-slate-200 hover:border-indigo-300 text-slate-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all"
            >
              <ChevronRight size={20}/>
            </button>
          </div>
        </div>
      </div>

      {/* MODERN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
               <h2 className="text-xl font-bold text-slate-900">Cập nhật trạng thái</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
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
                  onChange={e => setFormData({ status: e.target.value })}
                >
                  <option value="BOOKED">Booked (Chờ nhận)</option>
                  <option value="checked_in">Checked In (Đã nhận)</option>
                  <option value="checked_out">Checked Out (Đã trả)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Hủy bỏ
                </button>
                <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;