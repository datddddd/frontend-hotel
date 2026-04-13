import { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    room_number: "",
    room_type_id: "",
    status: "available"
  });

  // ================= FETCH ROOMS =================
  const fetchRooms = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/rooms?page=${page}&limit=${limit}`
      );
      setRooms(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Lỗi fetch rooms:", err);
    }
  };

  // ================= FETCH ROOM TYPES =================
  const fetchRoomTypes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/room-types");
      setRoomTypes(res.data);
    } catch (err) {
      console.error("Lỗi fetch room types:", err);
    }
  };

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  // ================= OPEN MODAL =================
  const openModal = (room = null) => {
    if (room) {
      setEditingId(room.id);
      setFormData({
        room_number: room.room_number,
        room_type_id: room.room_type_id,
        status: room.status || "available"
      });
    } else {
      setEditingId(null);
      setFormData({
        room_number: "",
        room_type_id: "",
        status: "available"
      });
    }
    setIsModalOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/rooms/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/rooms",
          formData
        );
        setCurrentPage(1); // về trang đầu
      }

      setIsModalOpen(false);
      fetchRooms(currentPage);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);

      if (rooms.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchRooms(currentPage);
      }
    } catch (err) {
      alert("Không thể xóa");
    }
  };

  // ================= PAGINATION =================
  const getPages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    let pages = [];

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Quản lý phòng ({currentPage}/{totalPages})
        </h1>

        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2 items-center"
        >
          <Plus size={18}/> Thêm phòng
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(r => (
          <div key={r.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">
              Phòng {r.room_number}
            </h3>

            <p className="text-sm text-gray-600">
              Loại: {r.room_name}
            </p>

            {/* STATUS */}
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
              r.status === "available"
                ? "bg-green-100 text-green-700"
                : r.status === "occupied"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {r.status}
            </span>

            {/* ACTION */}
            <div className="flex gap-2 mt-4">
              <button onClick={() => openModal(r)}>
                <Edit size={16}/>
              </button>
              <button onClick={() => handleDelete(r.id)}>
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          <ChevronLeft/>
        </button>

        {getPages().map(p => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1 rounded ${
              currentPage === p
                ? "bg-indigo-600 text-white"
                : "bg-white border"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          <ChevronRight/>
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30">
          <div className="bg-white p-6 rounded w-96">

            <h2 className="mb-4 font-bold text-lg">
              {editingId ? "Sửa phòng" : "Thêm phòng"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                className="w-full border p-2 rounded"
                placeholder="Số phòng"
                value={formData.room_number}
                onChange={e =>
                  setFormData({
                    ...formData,
                    room_number: e.target.value
                  })
                }
                required
              />

              <select
                className="w-full border p-2 rounded"
                value={formData.room_type_id}
                onChange={e =>
                  setFormData({
                    ...formData,
                    room_type_id: e.target.value
                  })
                }
                required
              >
                <option value="">Chọn loại phòng</option>
                {roomTypes.map(rt => (
                  <option key={rt.id} value={rt.id}>
                    {rt.room_name}
                  </option>
                ))}
              </select>

              {/* STATUS */}
              <select
                className="w-full border p-2 rounded"
                value={formData.status}
                onChange={e =>
                  setFormData({
                    ...formData,
                    status: e.target.value
                  })
                }
              >
                <option value="available">Available (Sẵn sàng)</option>
                <option value="maintenance">Maintenance (Bảo trì)</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Lưu
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Rooms;