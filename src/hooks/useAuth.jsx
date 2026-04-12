import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

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
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return response.data;
    } catch (error) { throw error; }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (data) => {
    await axios.post('http://localhost:5000/api/register', data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Đừng dùng 'export' ở đây
const useAuth = () => useContext(AuthContext);

// Export tập trung ở cuối file
export { AuthProvider, useAuth };