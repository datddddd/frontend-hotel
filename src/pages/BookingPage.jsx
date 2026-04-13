import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Calendar, User, CreditCard, Phone, Mail, CheckCircle2 } from "lucide-react";

const BookingPage = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    id_card: "",
    check_in: "",
    check_out: ""
  });

  const [roomTypes, setRoomTypes] = useState([]); // Danh sách loại phòng (Deluxe, VIP...)
  const [selectedType, setSelectedType] = useState(""); // ID loại phòng đang chọn
  const [rooms, setRooms] = useState([]); // Danh sách số phòng trống (101, 102...)
  const [selectedRoom, setSelectedRoom] = useState(null); // Đối tượng phòng cụ thể được chọn
  const [loading, setLoading] = useState(false);

  // 1. Tự động điền thông tin từ Token khi load trang
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/room-types");
        setRoomTypes(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách loại phòng:", err);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setForm(prev => ({
          ...prev,
          full_name: decoded.user_name || "",
          email: decoded.email || ""
        }));
      } catch (err) {
        console.error("Token không hợp lệ:", err);
      }
    }

    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. Tìm phòng trống dựa trên Loại phòng + Ngày
  const handleSearch = async () => {
    if (!form.check_in || !form.check_out || !selectedType) {
      return alert("Vui lòng nhập đầy đủ ngày và chọn loại phòng!");
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/available-rooms?check_in=${form.check_in}&check_out=${form.check_out}&room_type_id=${selectedType}`
      );
      setRooms(res.data);
      setSelectedRoom(null); // Reset phòng khi tìm kiếm lại
    } catch (err) {
      alert("Lỗi khi tìm phòng trống!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Gửi yêu cầu đặt phòng
  const handleBooking = async () => {
    if (!selectedRoom) return alert("Vui lòng chọn một phòng cụ thể!");
    
    try {
      const typeInfo = roomTypes.find(t => t.id == selectedType);
      const data = {
        ...form,
        room_id: selectedRoom.id,
        check_in_date: form.check_in,
        check_out_date: form.check_out,
        total_price: typeInfo?.price_per_night || 0
      };

      await axios.post("http://localhost:5000/api/bookings", data);
      alert("🎉 Chúc mừng! Bạn đã đặt phòng thành công.");
    } catch (err) {
      alert("Đã xảy ra lỗi khi đặt phòng.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-indigo-700 p-8 text-white">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="w-8 h-8" /> Đặt Phòng Trực Tuyến
          </h1>
          <p className="mt-2 text-indigo-100 opacity-90">Hoàn tất thông tin để giữ chỗ ngay hôm nay</p>
        </div>

        <div className="p-8 space-y-10">
          
          {/* BƯỚC 1: THÔNG TIN KHÁCH HÀNG */}
          <section>
            <div className="flex items-center gap-2 mb-6 text-indigo-700">
              <span className="w-7 h-7 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <h2 className="text-xl font-bold">Thông tin cá nhân</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-10 text-slate-400 w-5 h-5" />
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Họ và tên</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Nguyễn Văn A" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>

              <div className="relative">
                <CreditCard className="absolute left-3 top-10 text-slate-400 w-5 h-5" />
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Số CMND/CCCD</label>
                <input name="id_card" value={form.id_card} onChange={handleChange} placeholder="031..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-10 text-slate-400 w-5 h-5" />
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Số điện thoại</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="090..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-10 text-slate-400 w-5 h-5" />
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Ngày nhận phòng</label>
                <input name="check_in" type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Ngày trả phòng</label>
                <input name="check_out" type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* BƯỚC 2: CHỌN LOẠI PHÒNG */}
          <section>
            <div className="flex items-center gap-2 mb-6 text-indigo-700">
              <span className="w-7 h-7 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <h2 className="text-xl font-bold">Chọn hạng phòng</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roomTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`cursor-pointer p-5 border-2 rounded-2xl transition-all duration-300 ${
                    selectedType === type.id 
                    ? "border-indigo-600 bg-indigo-50 shadow-lg scale-105" 
                    : "border-slate-100 bg-white hover:border-indigo-200"
                  }`}
                >
                  <h3 className="font-bold text-slate-800 text-lg">{type.room_name}</h3>
                  <p className="text-indigo-600 font-bold text-xl mt-1">
                    {type.price_per_night?.toLocaleString('vi-VN')}₫ 
                    <span className="text-xs text-slate-400 font-normal"> /đêm</span>
                  </p>
                  <div className="mt-3 text-xs text-slate-500 space-y-1">
                    <p>• Tối đa {type.max_guests} người lớn</p>
                    <p>• Miễn phí Wifi & Buffet sáng</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="mt-8 w-full md:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all disabled:bg-slate-300 flex items-center justify-center gap-2"
            >
              {loading ? "Đang tìm kiếm..." : "Kiểm tra phòng trống"}
            </button>
          </section>

          {/* BƯỚC 3: CHỌN SỐ PHÒNG CỤ THỂ */}
          {rooms.length > 0 && (
            <section className="bg-slate-50 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-6 text-indigo-700">
                <span className="w-7 h-7 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <h2 className="text-xl font-bold">Các phòng còn trống</h2>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`min-w-[100px] py-4 px-6 border-2 rounded-xl font-bold transition-all ${
                      selectedRoom?.id === room.id
                      ? "bg-green-600 border-green-600 text-white shadow-md scale-110"
                      : "bg-white border-slate-200 text-slate-600 hover:border-green-400"
                    }`}
                  >
                    Số {room.room_number}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* NÚT XÁC NHẬN CUỐI CÙNG */}
          {selectedRoom && (
            <div className="text-center pt-8 border-t border-slate-100">
              <p className="mb-4 text-slate-500 italic">
                Bạn đã chọn: <span className="text-indigo-700 font-bold">Phòng {selectedRoom.room_number}</span> - Hạng {roomTypes.find(t=>t.id==selectedType)?.room_name}
              </p>
              <button
                onClick={handleBooking}
                className="group relative px-16 py-5 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-2xl shadow-2xl transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-6 h-6" /> Xác Nhận & Thanh Toán
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;