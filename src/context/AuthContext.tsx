import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type UserType = 'alumno' | 'profesor' | 'administrativo';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de ejemplo (simulación sin backend)
const mockUsers = {
  alumno: [
    { id: '1', email: 'alumno@colegio.com', password: '123456', name: 'Jose Bayona', type: 'alumno' as UserType }
  ],
  profesor: [
    { id: '2', email: 'profesor@colegio.com', password: '123456', name: 'María García', type: 'profesor' as UserType }
  ],
  administrativo: [
    { id: '3', email: 'admin@colegio.com', password: '123456', name: 'Carlos Pérez', type: 'administrativo' as UserType }
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    // Buscar el usuario en todos los tipos
    const allUsers = [
      ...mockUsers.alumno,
      ...mockUsers.profesor,
      ...mockUsers.administrativo
    ];
    
    const foundUser = allUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        type: foundUser.type
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
