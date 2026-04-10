import { Users, BedDouble, CalendarCheck, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Tổng Quan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng Phòng" value="120" icon={<BedDouble size={24} />} color="bg-blue-50 text-blue-600" />
        <StatCard title="Đặt Phòng" value="45" icon={<CalendarCheck size={24} />} color="bg-green-50 text-green-600" />
        <StatCard title="Tổng Khách Hàng" value="890" icon={<Users size={24} />} color="bg-purple-50 text-purple-600" />
        <StatCard title="Doanh Thu (MTD)" value="$12,400" icon={<DollarSign size={24} />} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Đặt Phòng Gần Đây</h2>
        {/* Placeholder for recent activity table */}
        <p className="text-slate-500">Không có hoạt động nào để hiển thị.</p>
      </div>
    </div>
  );
};
export default Dashboard;