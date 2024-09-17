import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
  };

  const register = async (credentials) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', credentials);
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user with token if exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
