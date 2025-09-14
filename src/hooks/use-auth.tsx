import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  name: string;
  role: 'client' | 'professional' | 'admin';
  email?: string;
  avatar_url?: string | null;
  phone?: string | null;
  location?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string, role?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resendConfirmation: (email: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  isRole: (role: string) => boolean;
  isClient: boolean;
  isProfessional: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer Supabase calls to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user!.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
        }
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully.",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // Not found error
          console.error('Error fetching profile:', JSON.stringify({ code: error.code, message: error.message }));
        }
        return;
      }

      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', JSON.stringify({ message: error?.message || 'Unknown error' }));
    }
  };

  const signUp = async (email: string, password: string, name?: string, role: string = 'client') => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { 
            name: name || email.split('@')[0],
            role
          },
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link. Please check your email and click the link to verify your account.",
        });
      } else {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });
      }

      return { error, data };
    } catch (err: any) {
      console.error('Signup exception:', err);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error: err };
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: redirectUrl }
      });

      if (error) {
        toast({
          title: "Resend failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email sent",
          description: "We've resent the confirmation link.",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Resend failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    }
  };

  const isRole = (role: string) => profile?.role === role;
  const isClient = profile?.role === 'client';
  const isProfessional = profile?.role === 'professional';
  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        resendConfirmation,
        signInWithGoogle,
        isRole,
        isClient,
        isProfessional,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}