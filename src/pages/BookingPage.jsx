import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Calendar, User, CreditCard, Phone, Mail,
  CheckCircle2, MapPin, Star, Info, X, ShieldCheck
} from "lucide-react";
import Navbar from "../components/HomeNavabar";
import Footer from "../components/HomeFooter";

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

  // Load dữ liệu ban đầu
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/room-types");
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
    const type = roomTypes.find(t => t.id == selectedType);
    const start = new Date(form.check_in);
    const end = new Date(form.check_out);
    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    return nights * (type?.price_per_night || 0);
  };

  const handleSearch = async () => {
    if (!form.check_in || !form.check_out || !selectedType) {
      return alert("Vui lòng nhập đầy đủ thông tin đặt phòng!");
    }
    setSearchAttempted(true);
    setAvailabilityMessage("");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/available-rooms?check_in=${form.check_in}&check_out=${form.check_out}&room_type_id=${selectedType}`
      );
      setRooms(res.data);
      setSelectedRoom(null);
      if (!Array.isArray(res.data) || res.data.length === 0) {
        setAvailabilityMessage("Không có phòng trống cho loại phòng và thời gian bạn đã chọn.");
      }
    } catch {
      setRooms([]);
      setSelectedRoom(null);
      setAvailabilityMessage("Không thể kiểm tra phòng trống. Vui lòng thử lại.");
      alert("Lỗi khi tìm phòng trống!");
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
      await axios.post("http://localhost:5000/api/bookings", data);
      alert("🎉 Chúc mừng! Bạn đã đặt phòng thành công.");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi đặt phòng!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f8fafc] py-12 px-4 font-sans text-slate-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* CỘT TRÁI: FORM THÔNG TIN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="text-indigo-600" /> Thông tin khách hàng
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Họ và tên</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Số CCCD/Passport</label>
                  <input name="id_card" value={form.id_card} onChange={handleChange} placeholder="00120300xxxx" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Số điện thoại</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="0905 xxx xxx" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Địa chỉ Email</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1 text-indigo-600">Ngày nhận phòng</label>
                  <input type="date" name="check_in" min={new Date().toISOString().split("T")[0]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-indigo-100 bg-indigo-50/30 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1 text-rose-600">Ngày trả phòng</label>
                  <input type="date" name="check_out" min={new Date().toISOString().split("T")[0]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-rose-50/30 focus:ring-2 focus:ring-rose-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            {/* CHỌN LOẠI PHÒNG */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="text-yellow-500" fill="currentColor" /> Chọn loại phòng
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {roomTypes.map(type => (
                  <div key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 group ${selectedType === type.id
                        ? "border-indigo-600 bg-indigo-50/50 shadow-md"
                        : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                      }`}>
                    <h3 className={`font-bold text-lg ${selectedType === type.id ? "text-indigo-700" : "text-slate-700"}`}>
                      {type.room_name}
                    </h3>
                    <p className="text-indigo-600 font-semibold mt-1">
                      {type.price_per_night?.toLocaleString()}₫ <span className="text-[10px] text-slate-400 font-normal">/ đêm</span>
                    </p>
                    <img src={type.image1} alt={type.room_name} className="w-full h-32 object-cover rounded-lg mt-3" />
                    <img src={type.image2} alt={type.room_name} className="w-full h-32 object-cover rounded-lg mt-3" />
                    {selectedType === type.id && (
                      <div className="absolute top-3 right-3 text-indigo-600">
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
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Kiểm tra phòng trống ngay"}
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: KẾT QUẢ & TỔNG KẾT */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-slate-400" /> Chi tiết phòng
              </h2>

              {rooms.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-sm text-slate-500 italic">Vui lòng chọn một số phòng cụ thể:</p>
                  <div className="grid grid-cols-4 gap-3">
                    {rooms.map(room => (
                      <button key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`py-3 rounded-xl font-bold transition-all border ${selectedRoom?.id === room.id
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-lg"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}>
                        {room.room_number}
                      </button>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-dashed border-slate-200 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>Giá mỗi đêm:</span>
                      <span className="font-semibold">{roomTypes.find(t => t.id == selectedType)?.price_per_night?.toLocaleString()}₫</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-2">
                      <span>Tổng tạm tính:</span>
                      <span className="text-indigo-600">{calculateTotal().toLocaleString()}₫</span>
                    </div>
                  </div>

                  <button
                    onClick={handleShowInvoice}
                    disabled={!selectedRoom}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-30"
                  >
                    Xác nhận đặt phòng
                  </button>
                </div>
              ) : searchAttempted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-rose-400">
                    <Calendar size={32} />
                  </div>
                  <p className="text-rose-500 text-sm font-medium">
                    {availabilityMessage || "Không có phòng trống."}
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Calendar size={32} />
                  </div>
                  <p className="text-slate-400 text-sm">Chưa có thông tin phòng.<br />Vui lòng chọn ngày và loại phòng.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MODAL THANH TOÁN */}
        {bookingSummary && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Xác nhận thanh toán</h2>
                  <p className="text-indigo-100 text-sm opacity-80">Mã giao dịch: #BK-{Math.floor(Math.random() * 10000)}</p>
                </div>
                <button onClick={() => setBookingSummary(null)} className="hover:rotate-90 transition-transform">
                  <X />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Khách hàng:</span> <span className="font-medium text-slate-800">{form.full_name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Số phòng:</span> <span className="font-medium text-slate-800">{selectedRoom.room_number}</span></div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-200 mt-2"><span className="font-bold text-slate-700">Tổng cộng:</span> <span className="font-bold text-indigo-600">{bookingSummary.total.toLocaleString()}₫</span></div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Chọn mức đặt cọc</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentAmount(bookingSummary.total / 2)}
                      className={`py-3 rounded-xl border-2 transition-all font-bold ${paymentAmount < bookingSummary.total ? "border-indigo-600 text-indigo-600 bg-indigo-50" : "border-slate-100 text-slate-500"}`}>
                      50% (Cọc)
                    </button>
                    <button
                      onClick={() => setPaymentAmount(bookingSummary.total)}
                      className={`py-3 rounded-xl border-2 transition-all font-bold ${paymentAmount === bookingSummary.total ? "border-indigo-600 text-indigo-600 bg-indigo-50" : "border-slate-100 text-slate-500"}`}>
                      100% (Hết)
                    </button>
                  </div>
                </div>

                <div className="text-center py-2">
                  <p className="text-sm text-slate-400">Số tiền cần thanh toán:</p>
                  <p className="text-3xl font-black text-slate-900">{paymentAmount.toLocaleString()}₫</p>
                </div>

                <div className="grid gap-3">
                  <button
                    onClick={() => handleFinalBooking("cash")}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 transition-all"
                  >
                    <ShieldCheck size={20} /> Hoàn tất đặt phòng
                  </button>
                  <button
                    onClick={() => setBookingSummary(null)}
                    className="w-full bg-white text-slate-400 font-medium py-2 rounded-xl hover:text-rose-500 transition-colors"
                  >
                    Quay lại chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;