import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra xem đã có token trong máy chưa khi vừa load trang
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const register = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/register', data);
    } catch (error) {
      throw error;
    }
  };


  const login = async (credentials) => {
    try {
      // Gọi đến API Node.js (Port 5000)
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      
      const { token, user: userData } = response.data;

      // Lưu vào LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Cập nhật State
      setUser(userData);
      
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);