// src/routes/index.jsx
import { Routes, Route } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import adminRoutes from './adminRoutes';
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}

      {/* Admin Routes */}
      {adminRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        >
          {route.children.map((child, childIndex) => (
            <Route
              key={childIndex}
              index={child.index}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;