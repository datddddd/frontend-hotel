// src/routes/adminRoutes.jsx
import { Navigate } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import RoomTypes from '../pages/Room-types';
import Rooms from '../pages/Rooms';
import Bookings from '../pages/Bookings';
import Customers from '../pages/Customers';
import ProtectedRoute from '../layouts/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

const adminRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
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