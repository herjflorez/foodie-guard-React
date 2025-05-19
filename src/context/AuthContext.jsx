import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/checkUser`, { token });
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Token inválido');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
