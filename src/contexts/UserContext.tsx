import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/User';

interface UserContextProps {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // In a real app, we would make an API call here
    // For demo purposes, we'll simulate a successful login
    if (email && password) {
      const mockUser: User = {
        id: 1,
        name: 'Тестовый Пользователь',
        email,
        favorites: [],
        orders: [],
      };
      
      setUser(mockUser);
      return Promise.resolve();
    }
    
    return Promise.reject(new Error('Неверный email или пароль'));
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, we would make an API call here
    // For demo purposes, we'll simulate a successful registration
    if (name && email && password) {
      const mockUser: User = {
        id: 1,
        name,
        email,
        favorites: [],
        orders: [],
      };
      
      setUser(mockUser);
      return Promise.resolve();
    }
    
    return Promise.reject(new Error('Пожалуйста, заполните все поля'));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};