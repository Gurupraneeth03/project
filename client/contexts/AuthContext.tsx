import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'investor' | 'farmer';

interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  phone?: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Omit<User, 'isAuthenticated'>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({ ...userData, isAuthenticated: true });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: Omit<User, 'isAuthenticated'>) => {
    const userWithAuth = { ...userData, isAuthenticated: true };
    setUser(userWithAuth);
    localStorage.setItem('user', JSON.stringify(userWithAuth));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateAadhaar = (aadhaar: string): boolean => {
  const aadhaarRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
  return aadhaarRegex.test(aadhaar);
};

export const validatePAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};
