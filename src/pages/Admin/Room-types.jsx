import { useEffect, useState } from "react";
import api from "../../services/api";
import { Edit, Trash2, Plus, Users, DollarSign } from "lucide-react";
import RoomTypeModal from "../../components/Admin/RoomTypeModal";

const RoomTypes = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        room_name: "",
        price_per_night: "",
        max_guests: "",
        description: "",
        image1: "",
        image2: ""
    });

    const fetchRooms = async () => {
        try {
            const res = await api.get("/room-types");
            setRooms(res.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    };

    useEffect(() => { fetchRooms(); }, []);

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ room_name: "", price_per_night: "", max_guests: "", description: "", image1: "", image2: "" });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (room) => {
        setEditingId(room.id);
        setFormData(room);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa loại phòng này?")) {
            await api.delete(`/room-types/${id}`);
            fetchRooms();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEditing = !!editingId;

        try {
            const form = new FormData();

            form.append("room_name", formData.room_name);
            form.append("price_per_night", formData.price_per_night);
            form.append("max_guests", formData.max_guests);
            form.append("description", formData.description || "");

            if (formData.image1 instanceof File) {
                form.append("image1", formData.image1);
            }

            if (formData.image2 instanceof File) {
                form.append("image2", formData.image2);
            }

            if (isEditing) {
                await api.put(
                    `/room-types/${editingId}`,
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                await api.post(
                    "/room-types",
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            alert(isEditing ? "Cập nhật thành công" : "Thêm thành công");

            setFormData({
                room_name: "",
                price_per_night: "",
                max_guests: "",
                description: "",
                image1: null,
                image2: null,
            });

            setIsModalOpen(false);
            fetchRooms();

        } catch (err) {
            console.error(err);
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý loại phòng</h1>
                        <p className="text-gray-500 text-sm">Danh sách các loại phòng hiện có trong hệ thống</p>
                    </div>
                    <button
                        onClick={handleOpenAdd}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
                    >
                        <Plus size={20} /> Thêm loại phòng
                    </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Hình ảnh</th>
                                <th className="px-6 py-4">Tên phòng</th>
                                <th className="px-6 py-4">Giá / Đêm</th>
                                <th className="px-6 py-4">Sức chứa</th>
                                <th className="px-6 py-4 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-700">
                            {rooms.map(r => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img
                                            src={r.image1 || "https://via.placeholder.com/60"}
                                            alt="room"
                                            className="w-16 h-10 object-cover rounded shadow-sm border border-gray-200"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{r.room_name}</td>
                                    <td className="px-6 py-4 text-emerald-600 font-semibold">
                                        {Number(r.price_per_night).toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 bg-gray-100 w-fit px-2.5 py-1 rounded-full text-xs font-medium">
                                            <Users size={14} /> {r.max_guests} khách
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => handleOpenEdit(r)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Sửa"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Xóa"
                                            >
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

            <RoomTypeModal
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

export default RoomTypes;