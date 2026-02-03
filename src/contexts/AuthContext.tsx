import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  premiumStatus: 'none' | 'trialing' | 'active';
  premiumPlan: 'monthly' | 'annual' | null;
  premiumSince: string | null;
  trialEndsAt: string | null;
  premiumCancelAtPeriodEnd?: boolean;
}

interface StoredUser {
  email: string;
  password: string;
  premiumStatus?: 'none' | 'trialing' | 'active';
  premiumPlan?: 'monthly' | 'annual' | null;
  premiumSince?: string | null;
  trialEndsAt?: string | null;
  premiumCancelAtPeriodEnd?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  startTrial: (plan: 'monthly' | 'annual') => void;
  activatePremium: (plan: 'monthly' | 'annual') => void;
  cancelPremium: () => void;
  updatePremiumPlan: (plan: 'monthly' | 'annual') => void;
  hasPremiumAccess: boolean;
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

// Helper to migrate old user format to new format
const migrateUser = (parsed: any): User => {
  // Handle old isPremiumActive field
  let premiumStatus: 'none' | 'trialing' | 'active' = 'none';
  if (parsed.premiumStatus) {
    premiumStatus = parsed.premiumStatus;
  } else if (parsed.isPremiumActive) {
    premiumStatus = 'active';
  }
  
  return {
    email: parsed.email,
    premiumStatus,
    premiumPlan: parsed.premiumPlan || null,
    premiumSince: parsed.premiumSince || null,
    trialEndsAt: parsed.trialEndsAt || null,
    premiumCancelAtPeriodEnd: parsed.premiumCancelAtPeriodEnd || false,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if trial has expired
  const checkTrialExpiration = (userData: User): User => {
    if (userData.premiumStatus === 'trialing' && userData.trialEndsAt) {
      const trialEnd = new Date(userData.trialEndsAt);
      if (new Date() > trialEnd) {
        // Trial expired - in prototype, auto-activate for demo purposes
        return {
          ...userData,
          premiumStatus: 'active',
          premiumSince: userData.trialEndsAt,
        };
      }
    }
    return userData;
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      let userData = migrateUser(parsed);
      userData = checkTrialExpiration(userData);
      setUser(userData);
      // Update storage with migrated data
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
    }
    setIsLoading(false);
  }, []);

  // Derived value: does user have premium access (trialing or active)?
  const hasPremiumAccess = user?.premiumStatus === 'trialing' || user?.premiumStatus === 'active';

  const register = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

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

    const users = getStoredUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return { success: false, error: 'Tento e-mail už je registrovaný. Přihlas se.' };
    }

    const newStoredUser: StoredUser = { 
      email, 
      password,
      premiumStatus: 'none',
      premiumPlan: null,
      premiumSince: null,
      trialEndsAt: null,
    };
    users.push(newStoredUser);
    saveStoredUsers(users);

    const newUser: User = { 
      email,
      premiumStatus: 'none',
      premiumPlan: null,
      premiumSince: null,
      trialEndsAt: null,
    };
    setUser(newUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    
    return { success: true };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

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

    const users = getStoredUsers();
    const existingUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (existingUser) {
      let userData = migrateUser(existingUser);
      userData = checkTrialExpiration(userData);
      setUser(userData);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(userData));
      return { success: true };
    }

    // Demo mode fallback
    if (users.length === 0 && password.length >= 3) {
      const newUser: User = { 
        email,
        premiumStatus: 'none',
        premiumPlan: null,
        premiumSince: null,
        trialEndsAt: null,
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

  const startTrial = (plan: 'monthly' | 'annual') => {
    if (!user) return;
    
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);
    
    const updatedUser: User = {
      ...user,
      premiumStatus: 'trialing',
      premiumPlan: plan,
      trialEndsAt: trialEnd.toISOString(),
      premiumCancelAtPeriodEnd: false,
    };
    
    setUser(updatedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    updateStoredUser(user.email, {
      premiumStatus: 'trialing',
      premiumPlan: plan,
      trialEndsAt: updatedUser.trialEndsAt,
      premiumCancelAtPeriodEnd: false,
    });
  };

  const activatePremium = (plan: 'monthly' | 'annual') => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      premiumStatus: 'active',
      premiumPlan: plan,
      premiumSince: new Date().toISOString(),
      trialEndsAt: null,
      premiumCancelAtPeriodEnd: false,
    };
    
    setUser(updatedUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
    updateStoredUser(user.email, {
      premiumStatus: 'active',
      premiumPlan: plan,
      premiumSince: updatedUser.premiumSince,
      trialEndsAt: null,
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
      startTrial,
      activatePremium, 
      cancelPremium,
      updatePremiumPlan,
      hasPremiumAccess,
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
