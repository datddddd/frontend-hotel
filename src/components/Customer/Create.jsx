import { useEffect } from "react";

const CustomerModal = ({
isOpen,
onClose,
onSubmit,
formData,
setFormData,
editingId
}) => {
if (!isOpen) return null;

return ( <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50 p-4"> <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl"> <h2 className="mb-6 font-bold text-2xl text-gray-800">
{editingId ? "Cập nhật khách hàng" : "Thêm khách hàng mới"} </h2>

```
    <form onSubmit={onSubmit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên
        </label>
        <input
          className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.full_name}
          onChange={e => setFormData({ ...formData, full_name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại
        </label>
        <input
          className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CCCD
        </label>
        <input
          className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.id_card}
          onChange={e => setFormData({ ...formData, id_card: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Đóng
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold"
        >
          {editingId ? "Lưu thay đổi" : "Tạo khách hàng"}
        </button>
      </div>

    </form>
  </div>
</div>


);
};

export default CustomerModal;
