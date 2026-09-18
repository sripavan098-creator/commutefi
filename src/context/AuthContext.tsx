import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  UserProfile,
  getSession,
  setSession,
  getProfile,
  demoSignIn,
  demoSignUp,
  demoSignOut,
  seedDemoData,
} from '../lib/storage';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      if (isSupabaseConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = getProfile(session.user.id);
          setUser(profile);
        }
      } else {
        // Demo mode - check localStorage
        const session = getSession();
        if (session) {
          const profile = getProfile(session.user_id);
          setUser(profile);
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        
        if (data.user) {
          const profile = getProfile(data.user.id);
          setUser(profile);
        }
      } else {
        // Demo mode
        const result = demoSignIn(email, password);
        if (result.error) return { error: result.error };
        setUser(result.user);
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error?: string }> => {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) return { error: error.message };
        
        if (data.user) {
          const profile = getProfile(data.user.id);
          setUser(profile);
        }
      } else {
        // Demo mode
        const result = demoSignUp(email, password, fullName);
        if (result.error) return { error: result.error };
        setUser(result.user);
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      } else {
        demoSignOut();
      }
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const refreshProfile = () => {
    if (user) {
      const updated = getProfile(user.id);
      if (updated) setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
