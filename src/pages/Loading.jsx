const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
      <p className="mt-4 text-slate-700 font-medium">Đang tải dữ liệu...</p>
      <p className="mt-1 text-sm text-slate-500">Vui lòng chờ trong giây lát</p>
    </div>
  );
};

export default Loading;
