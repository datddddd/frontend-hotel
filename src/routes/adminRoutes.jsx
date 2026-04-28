// src/routes/adminRoutes.jsx
import { Navigate } from 'react-router-dom';

import Dashboard from '../pages/Admin/Dashboard';
import Users from '../pages/Admin/Users';
import RoomTypes from '../pages/Admin/Room-types';
import Rooms from '../pages/Admin/Rooms';
import Bookings from '../pages/Admin/Bookings';
import Customers from '../pages/Admin/Customers';
import ProtectedRoute from '../layouts/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

const adminRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "room-types", element: <RoomTypes /> },
      { path: "rooms", element: <Rooms /> },
      { path: "bookings", element: <Bookings /> },
      { path: "customers", element: <Customers /> },
    ]
  }
];

export default adminRoutes;