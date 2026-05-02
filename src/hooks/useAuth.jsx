import { useState, createContext, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

// Đừng dùng 'export' ở đây
const AuthProvider = ({ children }) => {
  // Xóa token cũ nếu còn sót lại từ phiên bản trước
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });


  const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    const { user: userData } = response.data;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return response.data;
  };

  const googleLogin = async (googleData) => {
    const response = await api.post('/google-login', googleData);
    const { user: userData } = response.data;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error('Logout error', e);
    }
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (data) => {
    await api.post('/register', data);
  };

  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, register, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Đừng dùng 'export' ở đây
const useAuth = () => useContext(AuthContext);

// Export tập trung ở cuối file
export { AuthProvider, useAuth };