import { useEffect, useState } from "react";
import api from "../services/api";

/**
 * Rooms & Suites — ảnh và tên lấy từ bảng room_types (API GET /room-types).
 * Backend lưu ảnh trên Cloudinary, trả về URL tuyệt đối trong cột image1 / image2.
 */
const ROOM_TYPES_ENDPOINT = "/room-types";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";
const ROOMS_PER_PAGE = 3;

/** Lấy danh sách ảnh hợp lệ từ 1 row room_type */
function getRoomImages(row) {
  const images = [row.image1, row.image2].filter(Boolean);
  return images.length > 0 ? images : [PLACEHOLDER];
}

/* ---- Card hiển thị từng loại phòng ---- */
function RoomCard({ room }) {
  const images = getRoomImages(room);
  const [imgIdx, setImgIdx] = useState(0);

  const hasMultiple = images.length > 1;

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white group">
      {/* Ảnh + điều hướng */}
      <div className="relative">
        <img
          src={images[imgIdx]}
          alt={room.room_name || "Room"}
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Nút prev / next khi có 2 ảnh */}
        {hasMultiple && (
          <>
            <button
              aria-label="Ảnh trước"
              onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ‹
            </button>
            <button
              aria-label="Ảnh sau"
              onClick={() => setImgIdx((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ›
            </button>

            {/* Dot indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imgIdx ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thông tin phòng */}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{room.room_name}</h3>

        {room.description && (
          <p className="text-slate-500 text-sm mt-1 line-clamp-2">
            {room.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          {room.price_per_night != null && (
            <p className="text-lg font-bold text-emerald-600">
              {Number(room.price_per_night).toLocaleString("vi-VN")}đ
              <span className="text-sm font-normal text-slate-500"> / đêm</span>
            </p>
          )}

          {room.max_guests != null && (
            <p className="text-sm text-slate-500">
              👤 Tối đa {room.max_guests} khách
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Component chính ---- */
const Rooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get(ROOM_TYPES_ENDPOINT);
        if (!cancelled) setRoomTypes(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!cancelled) setRoomTypes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.ceil(roomTypes.length / ROOMS_PER_PAGE);
  const startIndex = page * ROOMS_PER_PAGE;
  const visibleRooms = roomTypes.slice(startIndex, startIndex + ROOMS_PER_PAGE);

  useEffect(() => {
    if (page > 0 && page >= totalPages) {
      setPage(0);
    }
  }, [page, totalPages]);

  const handlePrev = () => {
    if (totalPages <= 1) return;
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    if (totalPages <= 1) return;
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <div id="rooms" className="py-16 max-w-7xl mx-auto px-4">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-center flex-1">Rooms & Suites</h2>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Xem 3 phòng trước"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Xem 3 phòng tiếp theo"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              ›
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <p className="text-center text-slate-500">Đang tải phòng...</p>
      ) : roomTypes.length === 0 ? (
        <p className="text-center text-slate-500">
          Chưa có loại phòng để hiển thị.
        </p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          {totalPages > 1 && (
            <p className="text-center text-sm text-slate-500 mt-4">
              Trang {page + 1}/{totalPages}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Rooms;
