import { useState } from 'react';

const Customers = () => {
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', card: '**** **** **** 1234', createdAt: '2023-10-01' }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Khách Hàng</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Tên</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Số Điện Thoại</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Thẻ</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Tạo Ngày</th>


            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-slate-800 font-medium">{c.name}</td>
                <td className="px-6 py-4 text-slate-600">{c.email}</td>
                <td className="px-6 py-4 text-slate-600">{c.phone}</td>
                <td className="px-6 py-4 text-slate-600">{c.card}</td>
                <td className="px-6 py-4 text-slate-600">{c.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
}
export default Customers;