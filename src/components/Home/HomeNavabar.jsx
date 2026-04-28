import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const role = (user?.role || '').toUpperCase();
  const isAdmin = role === 'ADMIN';
  const displayName = user?.name?.trim() || (isAdmin ? 'Admin' : 'User');

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setKeyword('');
  };

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md text-white z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/home" className="text-2xl font-serif font-bold tracking-tighter hover:text-gold-400">
          LAKESIDE
        </Link>

        {/* Ô tìm kiếm */}
        <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm phòng, số khách, giá..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full px-5 py-2 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
            {keyword && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-sm transition-colors"
                aria-label="Xóa"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Tìm
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
          <Link to="/home" className="hover:text-gold-400 transition">Home</Link>
          <a href="#rooms" className="hover:text-gold-400 transition">Rooms</a>
          {user && (
            <Link to="/my-bookings" className="hover:text-gold-400 transition italic">My Bookings</Link>
          )}


          {/* Kiểm tra điều kiện hiển thị nút */}
          {/* Kiểm tra điều kiện hiển thị nút */}
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Welcome</span>
                <span className="text-gold-400 italic font-serif text-sm capitalize">{displayName}</span>
              </div>

              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="border border-blue-400/40 text-blue-400 px-4 py-1.5 hover:bg-blue-400 hover:text-white transition-all duration-300 text-[10px] font-bold tracking-[0.1em]"
                  >
                    ADMIN PANEL
                  </Link>
                )}

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

                <button
                  onClick={handleLogout}
                  className="border border-red-500/40 text-red-500 px-4 py-1.5 hover:bg-red-500 hover:text-white transition-all duration-300 text-[10px] font-bold tracking-[0.1em]"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-8 py-2 hover:bg-amber-500 hover:text-white transition-all duration-500 font-bold text-[10px] tracking-[0.2em]"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>

      {/* Ô tìm kiếm cho mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm phòng, số khách, giá..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full px-5 py-2 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
            {keyword && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-sm transition-colors"
                aria-label="Xóa"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Tìm
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;