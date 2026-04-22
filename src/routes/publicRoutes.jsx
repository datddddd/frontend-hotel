// src/routes/publicRoutes.jsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BookingPage from "../pages/BookingPage";
import SearchResults from "../pages/SearchResults";
import Loading from "../pages/Loading";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/register", element: <Register /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/loading", element: <Loading /> },
];

export default publicRoutes;