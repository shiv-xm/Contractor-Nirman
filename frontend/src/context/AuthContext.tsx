'use client';

import * as React from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN' | 'CONTRACTOR';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role?: 'CUSTOMER' | 'ADMIN' | 'CONTRACTOR') => void;
  logout: () => void;
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  openSignupModal: boolean;
  setOpenSignupModal: (open: boolean) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  openLoginModal: false,
  setOpenLoginModal: () => {},
  openSignupModal: false,
  setOpenSignupModal: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openSignupModal, setOpenSignupModal] = React.useState(false);

  // Load from localStorage if present
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('nirmansetu_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (role: 'CUSTOMER' | 'ADMIN' | 'CONTRACTOR' = 'CUSTOMER') => {
    let mockUser: AuthUser;
    if (role === 'ADMIN') {
      mockUser = {
        id: 'admin-1',
        name: 'Admin Desk',
        email: 'admin@nirmansetu.in',
        phone: '+91 99999 00001',
        role: 'ADMIN',
      };
    } else if (role === 'CONTRACTOR') {
      mockUser = {
        id: 'ctr-01',
        name: 'Ram Kishore Yadav (Thekedar)',
        email: 'shreeram.civil@example.com',
        phone: '+91 98712 34560',
        role: 'CONTRACTOR',
      };
    } else {
      mockUser = {
        id: 'cust-1',
        name: 'Anil Mehta',
        email: 'anil.mehta@example.com',
        phone: '+91 98765 11223',
        role: 'CUSTOMER',
      };
    }

    setUser(mockUser);
    try {
      localStorage.setItem('nirmansetu_user', JSON.stringify(mockUser));
    } catch {
      // ignore
    }
    setOpenLoginModal(false);
    setOpenSignupModal(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('nirmansetu_user');
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        openLoginModal,
        setOpenLoginModal,
        openSignupModal,
        setOpenSignupModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
