import { useEffect, useState } from "react";
import api from "../../services/api";
import { customerService } from "../../services/customerService";
import Create from "../../components/Customer/Create";
import Pagination from "../../components/common/Pagination";
import {
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  CalendarCheck 
} from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    id_card: ""
  });

  const fetchCustomers = async (page = 1, search = "") => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search) params.append("search", search);

      const res = await customerService.getCustomers(params);

      // Backend trả về: { data: [...], pagination: { totalPages: ... } }
      setCustomers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Lỗi fetch customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      setSearchQuery(searchInput.trim());
    }, 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const openModal = (customer = null) => {
    if (customer) {
      setEditingId(customer.id);
      setFormData({
        full_name: customer.full_name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        id_card: customer.id_card || ""
      });
    } else {
      setEditingId(null);
      setFormData({ full_name: "", email: "", phone: "", id_card: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await customerService.updateCustomer(editingId, formData);
      } else {
        await customerService.createCustomer(formData);
        setCurrentPage(1);
      }
      setIsModalOpen(false);
      fetchCustomers(currentPage, searchQuery);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;
    try {
      await customerService.deleteCustomer(id);
      fetchCustomers(currentPage, searchQuery);
    } catch (err) {
      alert("Không thể xóa khách hàng");
    }
  };

  const getPages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    let pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý khách hàng</h1>
          <p className="text-sm text-gray-500">Trang {currentPage}/{totalPages}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm tên hoặc SĐT..."
            className="w-64 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center">
            <Plus size={18} /> Thêm mới
          </button>
        </div>
      </div>

      {/* CUSTOMER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map(c => (
          <div key={c.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative">

            {/* Hiển thị Total Bookings ở góc trên bên phải dạng Badge */}
            <div className="absolute top-4 right-4 flex flex-col items-end">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-2">
                Khách hàng
              </span>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-md border">
                <CalendarCheck size={14} className="text-blue-600" />
                <span>{c.total_bookings || 0} lần đặt</span>
              </div>
            </div>

            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <User size={28} />
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-1">{c.full_name}</h3>

            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} /> {c.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 italic">
                <Mail size={14} /> {c.email || "N/A"}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="flex gap-2">
                <button onClick={() => openModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* MODAL */}
      <Create
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingId={editingId} />
    </div>
  );
};

export default Customers;