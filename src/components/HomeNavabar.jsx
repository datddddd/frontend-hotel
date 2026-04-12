import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import hook này

const Navbar = () => {
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md text-white z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link to="/home" className="text-2xl font-serif font-bold tracking-tighter hover:text-gold-400">
          LAKESIDE
        </Link>
        
        <div className="flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium">
          <Link to="/home" className="hover:text-gold-400 transition">Home</Link>
          <a href="#rooms" className="hover:text-gold-400 transition">Rooms</a>
          
          {/* Kiểm tra điều kiện hiển thị nút */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gold-400 lowercase italic">Hi, {user.name || 'Admin'}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600/80 text-white px-6 py-2 hover:bg-red-700 transition-all font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-black px-6 py-2 hover:bg-gold-500 hover:text-white transition-all font-bold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;