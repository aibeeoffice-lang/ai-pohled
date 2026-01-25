import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  isPremiumActive: boolean;
  premiumPlan: 'monthly' | 'annual' | null;
  premiumSince: string | null;
  premiumCancelAtPeriodEnd?: boolean;
}

interface StoredUser {
  email: string;
  password: string;
  isPremiumActive?: boolean;
  premiumPlan?: 'monthly' | 'annual' | null;
  premiumSince?: string | null;
  premiumCancelAtPeriodEnd?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  activatePremium: (plan: 'monthly' | 'annual') => void;
  cancelPremium: () => void;
  updatePremiumPlan: (plan: 'monthly' | 'annual') => void;
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

const updateStoredUser = (email: string, updates: Partial<StoredUser>) => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    saveStoredUsers(users);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Ensure premium fields exist
      setUser({
        email: parsed.email,
        isPremiumActive: parsed.isPremiumActive || false,
        premiumPlan: parsed.premiumPlan || null,
        premiumSince: parsed.premiumSince || null,
        premiumCancelAtPeriodEnd: parsed.premiumCancelAtPeriodEnd || false,
      });
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
    const newStoredUser: StoredUser = { 
      email, 
      password,
      isPremiumActive: false,
      premiumPlan: null,
      premiumSince: null,
    };
    users.push(newStoredUser);
    saveStoredUsers(users);

    // Log user in
    const newUser: User = { 
      email,
      isPremiumActive: false,
      premiumPlan: null,
      premiumSince: null,
    };
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
      const newUser: User = { 
        email: existingUser.email,
        isPremiumActive: existingUser.isPremiumActive || false,
        premiumPlan: existingUser.premiumPlan || null,
        premiumSince: existingUser.premiumSince || null,
        premiumCancelAtPeriodEnd: existingUser.premiumCancelAtPeriodEnd || false,
      };
      setUser(newUser);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    }

    // Fallback: if no users registered yet, allow any valid email with password >= 3 chars (demo mode)
    if (users.length === 0 && password.length >= 3) {
      const newUser: User = { 
        email,
        isPremiumActive: false,
        premiumPlan: null,
        premiumSince: null,
      };
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

  const activatePremium = (plan: 'monthly' | 'annual') => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      isPremiumActive: true,
      premiumPlan: plan,
      premiumSince: new Date().toISOString(),
      premiumCancelAtPeriodEnd: false,
    };
    
    setUser(updatedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    updateStoredUser(user.email, {
      isPremiumActive: true,
      premiumPlan: plan,
      premiumSince: updatedUser.premiumSince,
      premiumCancelAtPeriodEnd: false,
    });
  };

  const cancelPremium = () => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      premiumCancelAtPeriodEnd: true,
    };
    
    setUser(updatedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    updateStoredUser(user.email, {
      premiumCancelAtPeriodEnd: true,
    });
  };

  const updatePremiumPlan = (plan: 'monthly' | 'annual') => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      premiumPlan: plan,
    };
    
    setUser(updatedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    updateStoredUser(user.email, {
      premiumPlan: plan,
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      activatePremium, 
      cancelPremium,
      updatePremiumPlan 
    }}>
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
