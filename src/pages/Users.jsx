import { useEffect, useState } from "react";
import axios from "axios";
// Thêm KeyRound vào đây
import { Edit, Trash2, Plus, KeyRound } from "lucide-react"; 
import UserModal from "../components/UserModal";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        user_name: "", email: "", password: "", role_user: "user", status_user: "active"
    });

    const fetchCustomers = async () => {
        const res = await axios.get("http://localhost:5000/api/users");
        setCustomers(res.data);
    };

    useEffect(() => { fetchCustomers(); }, []);

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
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${id}`);
                setCustomers(customers.filter((user) => user.id !== id));
                alert("Đã xóa thành công!");
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
            fetchCustomers();
        } catch (err) {
            alert("Lỗi: " + err.response?.data?.message);
        }
    };

    const handleResetPassword = async (user) => {
        const randomPassword = Math.random().toString(36).slice(-8);
        const confirmReset = window.confirm(
            `Bạn muốn cấp mật khẩu mới cho [${user.user_name}]?\nMật khẩu mới sẽ là: ${randomPassword}`
        );

        if (confirmReset) {
            try {
                await axios.put(`http://localhost:5000/api/users/${user.id}/reset-password`, {
                    newPassword: randomPassword
                });
                alert(`Thành công! Hãy gửi mật khẩu này cho người dùng: ${randomPassword}`);
            } catch (err) {
                alert("Lỗi khi đặt lại mật khẩu!");
            }
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Khách Hàng</h1>
                <button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={20} /> Thêm mới
                </button>
            </div>

            <div className="space-y-3">
                {customers.map((c) => (
                    <div
                        key={c.id}
                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                        {/* Thông tin chính */}
                        <div className="flex-1 min-w-[200px]">
                            <h3 className="font-bold text-slate-800">{c.user_name}</h3>
                            <p className="text-sm text-slate-500">{c.email}</p>
                        </div>

                        {/* Role & Status */}
                        <div className="flex items-center gap-8 flex-1 justify-center">
                            <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600 capitalize">
                                {c.role_user}
                            </span>

                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${c.status_user?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                <span className="text-sm text-slate-600">
                                    {c.status_user?.toLowerCase() === 'active' ? 'Hoạt động' : 'Đã khóa'}
                                </span>
                            </div>
                        </div>

                        {/* Nhóm nút hành động */}
                        <div className="flex items-center gap-1 ml-4">
                            <button
                                onClick={() => handleResetPassword(c)}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Cấp mật khẩu mới"
                            >
                                <KeyRound size={18} />
                            </button>

                            <button
                                onClick={() => handleOpenEdit(c)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Sửa"
                            >
                                <Edit size={18} />
                            </button>

                            <button
                                onClick={() => handleDelete(c.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
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