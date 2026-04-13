// src/routes/publicRoutes.jsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingPage from "../pages/BookingPage";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/register", element: <Register /> },
];

export default publicRoutes;