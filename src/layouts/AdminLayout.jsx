import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BedDouble, CalendarCheck, Users, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Rooms', path: '/admin/rooms', icon: <BedDouble size={20} /> },
    { name: 'RoomsType', path: '/admin/room-types', icon: <BedDouble size={20} /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <CalendarCheck size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-200 px-4">
          {/* Bọc Link quanh phần Logo */}
          <Link
            to="/home"
            className="font-bold text-xl text-blue-600 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <BedDouble size={24} />
            {isSidebarOpen && <h1 className="text-xl font-bold">LakeSide</h1>}
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button onClick={logout} className="flex items-center gap-3 text-slate-600 hover:text-red-600 w-full px-3 py-2 rounded-lg transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-slate-700">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-slate-700">{user?.name || user?.email || 'Admin'}</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;