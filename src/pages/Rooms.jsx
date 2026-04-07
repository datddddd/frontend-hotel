import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';
import Modal from '../components/Modal';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({ number: '', type: 'Standard', price: '', status: 'Available' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Rooms
  const fetchRooms = async () => {
    try {
      // const res = await api.get('/rooms');
      // setRooms(res.data);
      
      // MOCK DATA for display purposes
      setRooms([
        { id: 1, number: '101', type: 'Deluxe', price: 150, status: 'Available' },
        { id: 2, number: '102', type: 'Suite', price: 250, status: 'Occupied' },
      ]);
    } catch (error) {
      console.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // await api.put(`/rooms/${currentRoom.id}`, currentRoom);
        setRooms(rooms.map(r => r.id === currentRoom.id ? currentRoom : r)); // Mock update
      } else {
        // await api.post('/rooms', currentRoom);
        setRooms([...rooms, { ...currentRoom, id: Date.now() }]); // Mock create
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save room");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')) {
      try {
        // await api.delete(`/rooms/${id}`);
        setRooms(rooms.filter(r => r.id !== id)); // Mock delete
      } catch (error) {
        console.error("Failed to delete room");
      }
    }
  };

  const openEditModal = (room) => {
    setCurrentRoom(room);
    setIsEditing(true);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentRoom({ number: '', type: 'Standard', price: '', status: 'Available' });
    setIsEditing(false);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Rooms Management</h1>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Room Number</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800 font-medium">{room.number}</td>
                <td className="px-6 py-4 text-slate-600">{room.type}</td>
                <td className="px-6 py-4 text-slate-600">${room.price}/night</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    room.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  <button onClick={() => openEditModal(room)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={isEditing ? 'Edit Room' : 'Add New Room'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
            <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={currentRoom.number} onChange={e => setCurrentRoom({...currentRoom, number: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={currentRoom.type} onChange={e => setCurrentRoom({...currentRoom, type: e.target.value})}>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price per Night ($)</label>
            <input required type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={currentRoom.price} onChange={e => setCurrentRoom({...currentRoom, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={currentRoom.status} onChange={e => setCurrentRoom({...currentRoom, status: e.target.value})}>
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">{isEditing ? 'Update Room' : 'Save Room'}</button>
        </form>
      </Modal>
    </div>
  );
};
export default Rooms;