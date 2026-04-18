import { useState } from "react";

/**
 * HomeSearch — Thanh tìm kiếm phòng hiển thị trên trang Home.
 * Cho phép tìm tương đối theo: loại phòng, số người, khoảng giá.
 * Khi submit sẽ gọi callback onSearch(filters) lên component cha.
 */
const HomeSearch = ({ onSearch, loading }) => {
  const [roomName, setRoomName] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      room_name: roomName.trim(),
      max_guests: maxGuests,
      min_price: minPrice,
      max_price: maxPrice,
    });
  };

  const handleReset = () => {
    setRoomName("");
    setMaxGuests("");
    setMinPrice("");
    setMaxPrice("");
    onSearch(null); // null = reset, hiển thị tất cả
  };

  return (
    <div className="relative -mt-20 z-20 max-w-5xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
        }}
      >
        {/* Tiêu đề */}
        <h3 className="text-white text-xl font-serif font-bold mb-5 text-center tracking-wide">
          🔍 Tìm kiếm phòng
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Loại phòng */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/80 text-xs uppercase tracking-widest font-medium">
              Loại phòng
            </label>
            <input
              type="text"
              placeholder="VD: Deluxe, Suite..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
          </div>

          {/* Số người */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/80 text-xs uppercase tracking-widest font-medium">
              Số người (tối thiểu)
            </label>
            <input
              type="number"
              min="1"
              placeholder="VD: 2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
          </div>

          {/* Giá tối thiểu */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/80 text-xs uppercase tracking-widest font-medium">
              Giá từ (VNĐ)
            </label>
            <input
              type="number"
              min="0"
              step="100000"
              placeholder="VD: 500000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
          </div>

          {/* Giá tối đa */}
          <div className="flex flex-col gap-1.5">
            <label className="text-white/80 text-xs uppercase tracking-widest font-medium">
              Giá đến (VNĐ)
            </label>
            <input
              type="number"
              min="0"
              step="100000"
              placeholder="VD: 2000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-2.5 rounded-lg uppercase tracking-wider text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-2.5 rounded-lg uppercase tracking-wider text-sm transition-all duration-300"
          >
            Đặt lại
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeSearch;
