import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
}

interface StoredUser {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'ai-mag-users';
const SESSION_STORAGE_KEY = 'ai-mag-user';

const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validation
    if (!email) {
      return { success: false, error: 'Zadej prosím e-mail.' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Zadej prosím platný e-mail.' };
    }

    if (!password) {
      return { success: false, error: 'Zadej prosím heslo.' };
    }

    if (password.length < 3) {
      return { success: false, error: 'Heslo musí mít alespoň 3 znaky.' };
    }

    // Check if email already exists
    const users = getStoredUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return { success: false, error: 'Tento e-mail už je registrovaný. Přihlas se.' };
    }

    // Create new user
    const newStoredUser: StoredUser = { email, password };
    users.push(newStoredUser);
    saveStoredUsers(users);

    // Log user in
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    
    return { success: true };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple validation
    if (!email) {
      return { success: false, error: 'Zadej prosím e-mail.' };
    }
    if (!password) {
      return { success: false, error: 'Zadej prosím heslo.' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'E-mail nebo heslo nesedí. Zkus to znovu.' };
    }

    // Check against registered users
    const users = getStoredUsers();
    const existingUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (existingUser) {
      const newUser = { email: existingUser.email };
      setUser(newUser);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    }

    // Fallback: if no users registered yet, allow any valid email with password >= 3 chars (demo mode)
    if (users.length === 0 && password.length >= 3) {
      const newUser = { email };
      setUser(newUser);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    }

    return { success: false, error: 'E-mail nebo heslo nesedí. Zkus to znovu.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
