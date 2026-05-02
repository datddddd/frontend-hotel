import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Home/HomeNavabar';
import { useAuth } from '../hooks/useAuth';
import { bookingService } from '../services/bookingService';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payingBooking, setPayingBooking] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBookings();
      setBookings(response?.data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Không thể tải danh sách đặt phòng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate, fetchBookings]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Bạn có chắc muốn hủy phòng này?')) return;
    try {
      await bookingService.updateStatus(bookingId, { status: 'cancelled' });
      alert('Hủy thành công');
      fetchBookings();
    } catch {
      alert('Lỗi khi hủy phòng');
    }
  };

  const confirmPayFull = async (bookingId) => {
    try {
      const res = await bookingService.payFull(bookingId, {
        payment_method: 'transfer',
      });
      alert(res.data.message || 'Thanh toán thành công');
      setPayingBooking(null);
      fetchBookings();
    } catch {
      alert('Thanh toán lỗi');
    }
  };

  // Helper render badges (Màu sắc nhẹ nhàng hơn cho nền trắng)
  const renderStatusBadge = (status) => {
    const configs = {
      booked: "bg-blue-100 text-blue-600 border border-blue-200",
      checked_in: "bg-green-100 text-green-600 border border-green-200",
      checked_out: "bg-gray-100 text-gray-600 border border-gray-200",
      cancelled: "bg-red-100 text-red-600 border border-red-200",
    };
    const current = status?.toLowerCase();
    return (
      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded-md font-bold ${configs[current] || configs.checked_out}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin w-12 h-12 border-4 border-t-amber-500 border-gray-200 rounded-full mb-4"></div>
        <p className="text-gray-500 animate-pulse font-medium">Đang tải danh sách...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-10">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <header className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Phòng của tôi</h1>
            <p className="text-gray-500 mt-1">Quản lý các lịch đặt phòng và trạng thái thanh toán</p>
          </div>
          <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {bookings.length} lượt đặt
          </span>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <EmptyState onNavigate={() => navigate('/home')} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
              >
                {/* IMAGE SECTION */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={'https://th.bing.com/th/id/OIP.ho7QLJRBtJlqKjTfWhMblwHaE8?w=286&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'}
                    alt={`Phòng ${booking.room_number}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 shadow-sm">
                    {renderStatusBadge(booking.status)}
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-6 space-y-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">Phòng {booking.room_number}</h3>
                    <div className="text-right">
                      <p className="text-amber-600 font-bold text-xl font-mono">
                        {Number(booking.total_price).toLocaleString()}đ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="flex-1 text-center font-medium">{new Date(booking.check_in_date).toLocaleDateString()}</span>
                    <span className="px-3 text-amber-500 font-bold">→</span>
                    <span className="flex-1 text-center font-medium">{new Date(booking.check_out_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Thanh toán:</span>
                    <span className={`font-bold ${booking.payment_status === 'PAID' ? 'text-green-600' :
                        booking.payment_status === 'PARTIAL_PAID' ? 'text-amber-500' : 'text-red-500'
                      }`}>
                      {booking.payment_status === 'PAID' ? '✓ Đã xong' :
                        booking.payment_status === 'PARTIAL_PAID' ? 'Một phần' : 'Chưa thanh toán'}
                    </span>
                  </div>

                  {booking.remaining_amount > 0 && (
                    <div className="bg-amber-50 p-3 rounded-xl flex justify-between items-center border border-amber-100">
                      <span className="text-xs text-amber-700 uppercase font-bold tracking-tight">Dư nợ:</span>
                      <span className="text-amber-600 font-black">
                        {Number(booking.remaining_amount).toLocaleString()}đ
                      </span>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-3 pt-2">
                    {booking.remaining_amount > 0 && booking.status !== 'cancelled' && (
                      <button
                        onClick={() => setPayingBooking(booking)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-sm font-bold transition shadow-md shadow-amber-200"
                      >
                        Thanh toán ngay
                      </button>
                    )}

                    {booking.status === 'booked' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex-1 border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-500 hover:text-red-600 py-3 rounded-xl text-sm font-semibold transition"
                      >
                        Hủy đặt
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR PAYMENT MODAL - Trắng trên nền Overlay xám nhẹ */}
      {payingBooking && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex justify-center items-center z-[100] p-4">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Thanh toán</h2>
              <p className="text-gray-500 text-sm mb-6 font-medium">Phòng {payingBooking.room_number}</p>

              <div className="bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Cần thanh toán:</p>
                <p className="text-3xl font-black text-amber-600">{Number(payingBooking.remaining_amount).toLocaleString()}₫</p>
              </div>

              <div className="flex justify-center mb-8 bg-gray-50 p-6 rounded-3xl mx-auto w-fit shadow-inner">
                <img
                  src={`https://img.vietqr.io/image/MB-0987654321-compact.png?amount=${payingBooking.remaining_amount}&addInfo=Thanh toan no phong ${payingBooking.room_number}&accountName=KHACH SAN TIVI`}
                  alt="QR Code"
                  className="w-44 h-44 mix-blend-multiply"
                />
              </div>

              <button
                onClick={() => confirmPayFull(payingBooking.id)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-amber-200 transition-all mb-4"
              >
                Tôi đã chuyển khoản
              </button>

              <button
                onClick={() => setPayingBooking(null)}
                className="w-full text-gray-400 font-bold py-2 hover:text-gray-600 transition-colors"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ onNavigate }) => (
  <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
    <div className="mb-4 text-6xl drop-shadow-sm">🏨</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">Trống trải quá...</h3>
    <p className="text-gray-500 mb-8 max-w-xs mx-auto">Bạn chưa có lịch đặt phòng nào. Hãy chọn cho mình một căn phòng ưng ý nhé!</p>
    <button
      onClick={onNavigate}
      className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-3.5 rounded-full font-bold transition shadow-lg shadow-amber-200 hover:scale-105 active:scale-95"
    >
      Tìm phòng ngay
    </button>
  </div>
);

export default MyBookings;