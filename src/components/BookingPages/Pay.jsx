import React from "react";

const PaymentModal = ({
    bookingSummary,
    form,
    selectedRoom,
    paymentAmount,
    setPaymentAmount,
    onConfirm,
    onClose
}) => {
    // Nếu không có dữ liệu summary thì không render gì cả
    if (!bookingSummary) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[70] p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className="bg-indigo-600 p-6 text-white text-center">
                    <h2 className="text-xl font-bold">Xác nhận đặt phòng</h2>
                    <p className="text-indigo-100 text-sm opacity-80 mt-1">
                        Vui lòng kiểm tra lại thông tin trước khi hoàn tất
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="bg-slate-50 p-5 rounded-2xl space-y-3 border border-slate-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Khách hàng:</span>
                            <span className="font-bold text-slate-800">{form.full_name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Số phòng:</span>
                            <span className="font-bold text-slate-800">{selectedRoom?.room_number}</span>
                        </div>
                        <div className="flex justify-between text-sm pt-3 border-t border-slate-200 mt-2">
                            <span className="font-bold text-slate-700 text-lg">Tổng hóa đơn:</span>
                            <span className="font-bold text-indigo-600 text-lg">
                                {bookingSummary.total.toLocaleString()}₫
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700">Hình thức thanh toán</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setPaymentAmount(bookingSummary.total / 2)}
                                className={`py-3 rounded-xl border-2 transition-all font-bold ${paymentAmount < bookingSummary.total
                                        ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                        : "border-slate-100 text-slate-400"
                                    }`}
                            >
                                Cọc 50%
                            </button>
                            <button
                                onClick={() => setPaymentAmount(bookingSummary.total)}
                                className={`py-3 rounded-xl border-2 transition-all font-bold ${paymentAmount === bookingSummary.total
                                        ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                                        : "border-slate-100 text-slate-400"
                                    }`}
                            >
                                Hết 100%
                            </button>
                        </div>
                    </div>

                    <div className="text-center py-2">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Số tiền cần trả ngay:</p>
                        <p className="text-3xl font-black text-slate-900">{paymentAmount.toLocaleString()}₫</p>
                    </div>

                    <div className="flex justify-center py-4">
                        <img 
                            src={`https://img.vietqr.io/image/MB-0987654321-compact.png?amount=${paymentAmount}&addInfo=Thanh toan phong ${selectedRoom?.room_number || form.full_name}&accountName=KHACH SAN TIVI`} 
                            alt="Mã QR Thanh toán" 
                            className="w-48 h-48 rounded-xl shadow-md border border-slate-200"
                        />
                        <p className="text-xs text-slate-500 mt-2 text-center absolute -bottom-6">Quét mã QR để thanh toán nhanh</p>
                    </div>

                    <button
                        onClick={() => onConfirm("transfer")}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-6"
                    >
                        Xác nhận đã chuyển khoản
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-slate-400 font-medium py-2 hover:text-rose-500 transition-colors"
                    >
                        Thay đổi lựa chọn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;