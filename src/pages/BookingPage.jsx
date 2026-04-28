import { useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import {
  Calendar, User, CreditCard, Phone, Mail,
  CheckCircle2, MapPin, Star, Info, X, ShieldCheck, Users
} from "lucide-react";
import Navbar from "../components/Home/HomeNavabar";
import Footer from "../components/Home/HomeFooter";
import { bookingService } from "../services/bookingService";
import { roomService } from "../services/roomService";
import Pay from "../components/BookingPages/Pay";
import DetailRoom from "../components/BookingPages/DetailRoom";

const BookingPage = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    id_card: "",
    check_in: "",
    check_out: ""
  });

  const [bookingSummary, setBookingSummary] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  // State mới cho Modal chi tiết
  const [viewingRoomDetail, setViewingRoomDetail] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await roomService.getRoomTypes();
        setRoomTypes(res.data);
      } catch (err) {
        console.error("Lỗi tải loại phòng");
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
        console.error("Token không hợp lệ");
      }
    }
    fetchRoomTypes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!form.check_in || !form.check_out || !selectedType) return 0;
    const type = roomTypes.find(t => t.id === selectedType);
    const start = new Date(form.check_in);
    const end = new Date(form.check_out);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    return nights * (type?.price_per_night || 0);
  };

  const handleSearch = async () => {
    if (!form.check_in || !form.check_out || !selectedType) {
      return alert("Vui lòng nhập đầy đủ thông tin và chọn loại phòng!");
    }
    setSearchAttempted(true);
    setAvailabilityMessage("");
    setLoading(true);
    try {
      const res = await roomService.getAvailableRooms(form.check_in, form.check_out, selectedType);
      setRooms(res.data);
      setSelectedRoom(null);
      if (!Array.isArray(res.data) || res.data.length === 0) {
        setAvailabilityMessage("Rất tiếc, loại phòng này đã hết chỗ trong thời gian này.");
      }
    } catch {
      setRooms([]);
      setAvailabilityMessage("Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowInvoice = () => {
    if (!selectedRoom) return alert("Vui lòng chọn số phòng cụ thể!");
    const total = calculateTotal();
    setBookingSummary({ total });
    setPaymentAmount(total);
  };

  const handleFinalBooking = async (method) => {
    try {
      const total = calculateTotal();
      const data = {
        ...form,
        room_id: selectedRoom.id,
        check_in_date: form.check_in,
        check_out_date: form.check_out,
        total_price: total,
        payment_amount: paymentAmount,
        payment_method: method
      };
      await bookingService.createBooking(data);
      alert("🎉 Đặt phòng thành công! Chúng tôi sẽ sớm liên hệ với bạn.");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi xử lý đơn đặt phòng!");
    }
  };

  return (
    <div className="bg-[#f8fafc]">
      <Navbar />
      <div className="min-h-screen py-12 px-4 font-sans text-slate-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* CỘT TRÁI & GIỮA: FORM VÀ CHỌN PHÒNG */}
          <div className="lg:col-span-2 space-y-6">

            {/* THÔNG TIN KHÁCH HÀNG */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="text-indigo-600" /> Thông tin đặt phòng
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Họ và tên</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Số CCCD/Passport</label>
                  <input name="id_card" value={form.id_card} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Số điện thoại</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Địa chỉ Email</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-indigo-600 ml-1">Ngày nhận phòng</label>
                  <input type="date" name="check_in" min={new Date().toISOString().split("T")[0]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-indigo-100 bg-indigo-50/30 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-rose-600 ml-1">Ngày trả phòng</label>
                  <input type="date" name="check_out" min={form.check_in || new Date().toISOString().split("T")[0]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/30 outline-none" />
                </div>
              </div>
            </div>

            {/* DANH SÁCH LOẠI PHÒNG */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="text-yellow-500" fill="currentColor" /> Chọn hạng phòng
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {roomTypes.map(type => (
                  <div key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`relative p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${selectedType === type.id
                      ? "border-indigo-600 bg-indigo-50/50 shadow-md"
                      : "border-slate-100 hover:border-indigo-200 bg-white"
                      }`}>
                    <div className="relative h-40 mb-4 overflow-hidden rounded-xl">
                      <img src={type.image1} alt={type.room_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setViewingRoomDetail(type); }}
                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        <Info size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-slate-800">{type.room_name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <Users size={14} /> Tối đa {type.max_guests} người
                        </div>
                      </div>
                      <p className="text-indigo-600 font-bold text-right">
                        {type.price_per_night?.toLocaleString()}₫
                        <span className="block text-[10px] text-slate-400 font-normal">/ đêm</span>
                      </p>
                    </div>
                    {selectedType === type.id && (
                      <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Kiểm tra phòng trống"}
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: KẾT QUẢ TÌM KIẾM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-slate-400" /> Trạng thái phòng
              </h2>

              {rooms.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-sm text-slate-500">Chúng tôi tìm thấy <b>{rooms.length}</b> phòng trống. Vui lòng chọn số phòng:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {rooms.map(room => (
                      <button key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`py-3 rounded-xl font-bold transition-all border ${selectedRoom?.id === room.id
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105"
                          : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                          }`}>
                        {room.room_number}
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-dashed border-slate-200 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Tạm tính ({calculateTotal() > 0 ? "1 đêm" : "0 đêm"}):</span>
                      <span className="font-semibold text-slate-900">{calculateTotal().toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t">
                      <span>Tổng tiền:</span>
                      <span className="text-indigo-600">{calculateTotal().toLocaleString()}₫</span>
                    </div>
                  </div>

                  <button
                    onClick={handleShowInvoice}
                    disabled={!selectedRoom}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                  >
                    Tiến hành đặt phòng <ShieldCheck size={20} />
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className={`${searchAttempted ? 'bg-rose-50 text-rose-300' : 'bg-slate-50 text-slate-300'} w-16 h-16 rounded-full flex items-center justify-center mx-auto`}>
                    <Calendar size={32} />
                  </div>
                  <p className={`${searchAttempted ? 'text-rose-500' : 'text-slate-400'} text-sm leading-relaxed px-4`}>
                    {searchAttempted ? availabilityMessage : "Vui lòng chọn đầy đủ thông tin bên trái để kiểm tra phòng trống."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- MODAL XEM CHI TIẾT LOẠI PHÒNG --- */}
        <DetailRoom
          viewingRoomDetail={viewingRoomDetail}
          setViewingRoomDetail={setViewingRoomDetail}
          setSelectedType={setSelectedType}
        />

        {/* MODAL THANH TOÁN (Giữ nguyên logic cũ nhưng làm đẹp hơn) */}
        <Pay
          bookingSummary={bookingSummary}
          form={form}
          selectedRoom={selectedRoom}
          paymentAmount={paymentAmount}
          setPaymentAmount={setPaymentAmount}
          onConfirm={handleFinalBooking}
          onClose={() => setBookingSummary(null)}

        />

      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;