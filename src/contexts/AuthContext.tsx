import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ai-mag-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

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
    
    // Mock authentication - accept any valid email format with any password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'E-mail nebo heslo nesedí. Zkus to znovu.' };
    }

    // For demo, reject specific test credentials to show error
    if (password.length < 3) {
      return { success: false, error: 'E-mail nebo heslo nesedí. Zkus to znovu.' };
    }

    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('ai-mag-user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai-mag-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
