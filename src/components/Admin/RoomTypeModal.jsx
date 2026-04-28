import { X } from "lucide-react";

const RoomTypeModal = ({ isOpen, onClose, onSubmit, formData, setFormData, isEditing }) => {
    if (!isOpen) return null;

    const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Content */}
            <form
                onSubmit={onSubmit}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEditing ? "Cập nhật" : "Thêm mới"} loại phòng
                    </h2>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className={labelClass}>Tên loại phòng</label>
                        <input
                            required
                            className={inputClass}
                            placeholder="Ví dụ: Deluxe Ocean View"
                            value={formData.room_name}
                            onChange={e => setFormData({ ...formData, room_name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Giá / Đêm (VND)</label>
                            <input
                                type="number"
                                required
                                className={inputClass}
                                placeholder="1.200.000"
                                value={formData.price_per_night}
                                onChange={e => setFormData({ ...formData, price_per_night: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Sức chứa tối đa</label>
                            <input
                                type="number"
                                required
                                className={inputClass}
                                placeholder="2"
                                value={formData.max_guests}
                                onChange={e => setFormData({ ...formData, max_guests: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Mô tả chi tiết</label>
                        <textarea
                            rows="3"
                            className={inputClass}
                            placeholder="Mô tả về tiện nghi, diện tích..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Đường dẫn ảnh 1 (URL)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, image1: e.target.files[0] })
                            }
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Đường dẫn ảnh 2 (URL)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, image2: e.target.files[0] })
                            }
                        />
                    </div>
                    <div>
                        {formData.image1 && (
                            <img
                                src={
                                    formData.image1 instanceof File
                                        ? URL.createObjectURL(formData.image1)
                                        : formData.image1
                                }
                                className="w-32 h-20 object-cover rounded mt-2"
                            />
                        )}
                    </div>
                    <div>
                        {formData.image2 && (
                            <img
                                src={
                                    formData.image2 instanceof File
                                        ? URL.createObjectURL(formData.image2)
                                        : formData.image2
                                }
                                className="w-32 h-20 object-cover rounded mt-2"
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all active:scale-95"
                    >
                        {isEditing ? "Lưu thay đổi" : "Tạo loại phòng"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomTypeModal;