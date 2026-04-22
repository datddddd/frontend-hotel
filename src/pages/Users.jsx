import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Edit, Trash2, Plus, KeyRound, ChevronLeft, ChevronRight } from "lucide-react";
import UserModal from "../components/UserModal";
import Loading from "./Loading";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        user_name: "", email: "", password: "", role_user: "user", status_user: "active"
    });

    // State cho phân trang
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });
    const [loading, setLoading] = useState(false);
    const limit = 6;

    // Hàm lấy dữ liệu (sử dụng useCallback để tránh tạo lại hàm không cần thiết)
    const fetchCustomers = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=${limit}`);
            setCustomers(res.data.data);
            setPagination({
                currentPage: res.data.pagination.currentPage,
                totalPages: res.data.pagination.totalPages
            });
        } catch (err) {
            console.error("Lỗi khi tải danh sách:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers(1);
    }, [fetchCustomers]);

    // Các hàm xử lý giữ nguyên logic của bạn
    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ user_name: "", email: "", password: "", role_user: "user", status_user: "active" });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (user) => {
        setEditingId(user.id);
        setFormData({ ...user, password: "" });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                // Load lại trang hiện tại sau khi xóa
                fetchCustomers(pagination.currentPage);
                alert("Đã xóa thành công!");
            } catch (err) {
                alert("Không thể xóa người dùng này.");
            }
        }
    };

    const handleDeleteTrue = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}/force`);
                // Load lại trang hiện tại sau khi xóa
                fetchCustomers(pagination.currentPage);
                alert("Đã xóa vĩnh viễn!");
            } catch (err) {
                alert("Không thể xóa người dùng này.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/users/${editingId}`, formData);
            } else {
                await axios.post("http://localhost:5000/api/users", formData);
            }
            setIsModalOpen(false);
            fetchCustomers(pagination.currentPage);
        } catch (err) {
            alert("Lỗi: " + err.response?.data?.message);
        }
    };

    const handleResetPassword = async (user) => {
        const randomPassword = Math.random().toString(36).slice(-8);
        if (window.confirm(`Cấp mật khẩu mới cho [${user.user_name}]: ${randomPassword}`)) {
            try {
                await axios.put(`http://localhost:5000/api/users/${user.id}/reset-password`, {
                    newPassword: randomPassword
                });
                alert(`Thành công! Mật khẩu mới là: ${randomPassword}`);
            } catch (err) {
                alert("Lỗi khi đặt lại mật khẩu!");
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Quản Lý Khách Hàng</h1>
                <button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={20} /> Thêm mới
                </button>
            </div>

            <div className="space-y-3 mb-8">
                {customers.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">{c.user_name}</h3>
                            <p className="text-sm text-slate-500">{c.email}</p>
                        </div>

                        <div className="flex items-center gap-8 flex-1 justify-center">
                            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-600 uppercase">
                                {c.role_user}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${c.status_user === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                <span className="text-sm text-slate-600">{c.status_user === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button onClick={() => handleResetPassword(c)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"><KeyRound size={18} /></button>
                            <button onClick={() => handleOpenEdit(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                            <button onClick={() => handleDelete(c.id)} className="p-2 text-green-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                            <button onClick={() => handleDeleteTrue(c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>

                        </div>
                    </div>
                ))}
            </div>

            {/* THANH PHÂN TRANG (PAGINATION) */}
            <div className="flex justify-center items-center gap-2">
                <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => fetchCustomers(pagination.currentPage - 1)}
                    className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={20} />
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => fetchCustomers(index + 1)}
                        className={`w-10 h-10 border rounded-lg font-medium transition-colors ${pagination.currentPage === index + 1
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-slate-50 text-slate-600"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => fetchCustomers(pagination.currentPage + 1)}
                    className="p-2 border rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                isEditing={!!editingId}
            />
        </div>
    );
};

export default Customers;