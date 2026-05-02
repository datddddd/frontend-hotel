const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4">
      <div className="relative flex items-center justify-center">
        {/* Vòng xoay nền (mờ) */}
        <div className="h-16 w-16 rounded-full border-4 border-slate-200/50"></div>

        {/* Vòng xoay chính có hiệu ứng glow */}
        <div className="absolute h-16 w-16 rounded-full border-4 border-transparent border-t-blue-600 animate-spin shadow-lg"></div>

        {/* Điểm nhấn ở giữa (tùy chọn) */}
        <div className="absolute h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          Đang xử lý
          <span className="inline-flex w-4 ml-1">
            <span className="animate-[bounce_1s_infinite_100ms]">.</span>
            <span className="animate-[bounce_1s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1s_infinite_300ms]">.</span>
          </span>
        </h3>
        <p className="mt-2 text-slate-500 text-sm font-medium">
          Hệ thống đang chuẩn bị dữ liệu cho bạn
        </p>
      </div>

      {/* Trang trí thêm: các thanh skeleton mờ phía sau để gợi ý nội dung đang tải */}
      <div className="mt-12 w-full max-w-xs space-y-3 opacity-20">
        <div className="h-2 bg-slate-300 rounded-full w-3/4 mx-auto animate-pulse"></div>
        <div className="h-2 bg-slate-300 rounded-full w-1/2 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;