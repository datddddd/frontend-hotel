import { useState, createContext, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

// Đừng dùng 'export' ở đây
const AuthProvider = ({ children }) => {
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
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return response.data;
  };

  const googleLogin = async (googleData) => {
    const response = await api.post('/google-login', googleData);
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (data) => {
    await api.post('/register', data);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Đừng dùng 'export' ở đây
const useAuth = () => useContext(AuthContext);

// Export tập trung ở cuối file
export { AuthProvider, useAuth };