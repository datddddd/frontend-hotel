import { useState } from 'react';

const Bookings = () => {
  const [bookings] = useState([
    { id: 1, guest: 'John Doe', room: '101', checkIn: '2023-11-01', checkOut: '2023-11-05', status: 'Confirmed' }
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Bookings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Guest</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Room</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Dates</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="px-6 py-4 text-slate-800 font-medium">{b.guest}</td>
                <td className="px-6 py-4 text-slate-600">{b.room}</td>
                <td className="px-6 py-4 text-slate-600">{b.checkIn} to {b.checkOut}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Bookings;