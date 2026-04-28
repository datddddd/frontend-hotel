import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BedDouble,
  CalendarCheck,
  DollarSign,
  HandCoins,
  ReceiptText,
  TrendingUp,
  ArrowUpRight,
  Users
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import Loading from "../Loading";



const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  return `${date.getDate()}/${date.getMonth() + 1}`; // Trả về dạng 20/3
};
// Helper: Định dạng tiền tệ
const formatCurrency = (value) =>
  `${(Number(value) || 0).toLocaleString("vi-VN")}₫`;


const StatCard = ({ title, value, note, icon, color }) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
      <div className="bg-slate-50 p-1.5 rounded-lg">
        <ArrowUpRight size={16} className="text-slate-400" />
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
      {note && <p className="text-xs text-slate-400 mt-2 font-medium">{note}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [rangeDays, setRangeDays] = useState(30);
  const [report, setReport] = useState({
    summary: {},
    trend: [],
    recent_bookings: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings/dashboard/report",
          { params: { days: rangeDays } }
        );
        setReport(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [rangeDays]);

  const { summary, trend, recent_bookings: recentBookings } = report;

  // Tính toán công suất phòng
  const occupancyRate = useMemo(() => {
    const total = Number(summary.total_rooms) || 0;
    if (!total) return 0;
    return Math.round(((Number(summary.occupied_rooms) || 0) / total) * 100);
  }, [summary]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      {loading && <Loading />}

      {!loading && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Quản lý Lakeside</h1>
              <p className="text-slate-500 font-medium">Báo cáo tình hình kinh doanh hệ thống</p>
            </div>

            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setRangeDays(days)}
                  className={`px-6 py-2 text-xs font-bold rounded-xl transition-all ${rangeDays === days
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {days} NGÀY
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Tổng Booking"
              value={Number(summary.total_bookings || 0).toLocaleString()}
              note={`Đang lưu trú: ${summary.checked_in_count || 0}`}
              icon={<CalendarCheck size={24} />}
              color="bg-blue-500 text-white"
            />
            <StatCard
              title="Doanh thu dự kiến"
              value={formatCurrency(summary.total_revenue)}
              note={`Trung bình: ${formatCurrency(summary.avg_booking_value)}`}
              icon={<DollarSign size={24} />}
              color="bg-emerald-500 text-white"
            />
            <StatCard
              title="Thực thu"
              value={formatCurrency(summary.collected_revenue)}
              note={`Còn nợ: ${formatCurrency(summary.outstanding_revenue)}`}
              icon={<HandCoins size={24} />}
              color="bg-indigo-500 text-white"
            />
            <StatCard
              title="Công suất phòng"
              value={`${occupancyRate}%`}
              note={`Trống: ${summary.available_rooms || 0} / ${summary.total_rooms || 0} phòng`}
              icon={<BedDouble size={24} />}
              color="bg-orange-500 text-white"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Area Chart: Revenue Trend */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-800">Xu hướng thực thu</h2>
                <TrendingUp size={20} className="text-indigo-500" />
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatXAxis}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      labelFormatter={(value) => {
                        const d = new Date(value);
                        return `Ngày ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
                      }}
                      formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="collected_revenue"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Bookings count */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-800">Lượng đặt phòng</h2>
                <Users size={20} className="text-blue-500" />
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={formatXAxis} // Thêm dòng này để format lại hiển thị
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      dy={10}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                      }}
                      labelFormatter={(value) => {
                        const d = new Date(value);
                        const day = String(d.getDate()).padStart(2, "0");
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const year = d.getFullYear();
                        return `Ngày ${day}/${month}/${year}`;
                      }}
                      formatter={(value) => [`${value} phòng`, "Số phòng đặt"]}
                    />
                    <Bar dataKey="booking_count" radius={[6, 6, 0, 0]}>
                      {trend.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === trend.length - 1 ? '#6366f1' : '#e2e8f0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Giao dịch gần đây</h2>
              <button onClick={() => navigate('/admin/bookings')} className="text-indigo-600 font-bold text-sm hover:underline">Xem tất cả</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 text-left text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                    <th className="px-8 py-4">Khách hàng</th>
                    <th className="px-8 py-4">Phòng</th>
                    <th className="px-8 py-4">Trạng thái</th>
                    <th className="px-8 py-4 text-right">Tổng thanh toán</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-700">{booking.full_name}</div>
                        <div className="text-xs text-slate-400 font-medium">ID: #{booking.id}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-bold">
                          Phòng {booking.room_number}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-8 py-5 text-right font-black text-slate-800">
                        {formatCurrency(booking.total_price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component phụ cho Badge trạng thái
const StatusBadge = ({ status }) => {
  const config = {
    booked: "bg-blue-50 text-blue-600",
    checked_in: "bg-emerald-50 text-emerald-600",
    checked_out: "bg-slate-100 text-slate-500",
    cancelled: "bg-red-50 text-red-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${config[status] || config.booked}`}>
      {status.replace("_", " ")}
    </span>
  );
};

export default Dashboard;