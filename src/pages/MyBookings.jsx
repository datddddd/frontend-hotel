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

  const { user } = useAuth();
  const navigate = useNavigate();

  // Dùng useCallback để tránh re-render không cần thiết
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

  const handlePayFull = async (bookingId) => {
    try {
      const res = await bookingService.payFull(bookingId, {
        payment_method: 'card',
      });
      alert(res.data.message || 'Thanh toán thành công');
      fetchBookings();
    } catch {
      alert('Thanh toán lỗi');
    }
  };

  // Helper render badges
  const renderStatusBadge = (status) => {
    const configs = {
      booked: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      checked_in: "bg-green-500/20 text-green-400 border border-green-500/30",
      checked_out: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
      cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
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
      <div className="min-h-screen flex flex-col justify-center items-center bg-black">
        <div className="animate-spin w-12 h-12 border-4 border-t-amber-400 border-white/10 rounded-full mb-4"></div>
        <p className="text-gray-400 animate-pulse">Đang tải danh sách...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-10">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold">Phòng của tôi</h1>
            <p className="text-gray-500 mt-1">Quản lý các lịch đặt phòng và trạng thái thanh toán</p>
          </div>
          <span className="text-sm text-gray-400">{bookings.length} lượt đặt</span>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <EmptyState onNavigate={() => navigate('/home')} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300"
              >
                {/* IMAGE SECTION */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={// Trường hợp 3: Ảnh nằm sâu trong room -> room_type
                      'https://th.bing.com/th/id/OIP.ho7QLJRBtJlqKjTfWhMblwHaE8?w=286&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3' // Ảnh dự phòng
                    }
                    alt={`Phòng ${booking.room_number}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute bottom-3 left-3">
                    {renderStatusBadge(booking.status)}
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold tracking-tight">Phòng {booking.room_number}</h3>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold text-lg">
                        {Number(booking.total_price).toLocaleString()}đ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-400 bg-white/5 p-2 rounded-lg">
                    <span className="flex-1 text-center">{new Date(booking.check_in_date).toLocaleDateString()}</span>
                    <span className="px-2 text-amber-400">→</span>
                    <span className="flex-1 text-center">{new Date(booking.check_out_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Thanh toán:</span>
                    <span className={`font-medium ${booking.payment_status === 'PAID' ? 'text-green-400' :
                      booking.payment_status === 'PARTIAL_PAID' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                      {booking.payment_status === 'PAID' ? 'Đã xong' :
                        booking.payment_status === 'PARTIAL_PAID' ? 'Một phần' : 'Chưa thanh toán'}
                    </span>
                  </div>

                  {booking.remaining_amount > 0 && (
                    <div className="bg-amber-400/10 p-2 rounded-lg flex justify-between items-center border border-amber-400/20">
                      <span className="text-xs text-amber-400/80 uppercase">Còn nợ:</span>
                      <span className="text-amber-400 font-bold">
                        {Number(booking.remaining_amount).toLocaleString()}đ
                      </span>
                    </div>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 pt-2">
                    {booking.remaining_amount > 0 && booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handlePayFull(booking.id)}
                        className="flex-1 bg-amber-400 hover:bg-amber-500 text-black py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-amber-400/10"
                      >
                        Thanh toán ngay
                      </button>
                    )}

                    {booking.status === 'booked' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex-1 border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 text-gray-400 hover:text-red-400 py-2.5 rounded-xl text-sm transition"
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
    </div>
  );
};

const EmptyState = ({ onNavigate }) => (
  <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
    <div className="mb-4 text-5xl">🏨</div>
    <p className="text-gray-400 mb-6 text-lg">Bạn chưa có lịch đặt phòng nào.</p>
    <button
      onClick={onNavigate}
      className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-full font-bold transition transform hover:scale-105"
    >
      Khám phá phòng ngay
    </button>
  </div>
);

export default MyBookings;