import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'admin' | 'user' | null;

interface User {
  username: string;
  role: UserRole;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const defaultUser: User = {
  username: '',
  role: null,
  isAuthenticated: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const login = (username: string, password: string): boolean => {
    // Admin login
    if (username === 'triple charm' && password === '12345') {
      setUser({
        username,
        role: 'admin',
        isAuthenticated: true,
      });
      return true;
    }
    
    // User login
    if (username === 'Jana' && password === '1234') {
      setUser({
        username,
        role: 'user',
        isAuthenticated: true,
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};