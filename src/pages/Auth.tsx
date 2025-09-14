import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, User, Chrome, Users, Briefcase, Shield } from "lucide-react";

export default function Auth() {
  const { user, loading, signIn, signUp, signInWithGoogle, resendConfirmation } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const result = await signUp(formData.email, formData.password, formData.name, formData.role);
        if (!result.error) {
          // Clear form on successful signup
          setFormData({ email: "", password: "", name: "", role: "client" });
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        if (!result.error) {
          // Clear form on successful signin
          setFormData({ email: "", password: "", name: "", role: "client" });
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!formData.email) return;
    setIsResending(true);
    try {
      await resendConfirmation(formData.email);
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const roleOptions = [
    { value: "client", label: "Client", icon: Users, description: "Looking for design services" },
    { value: "professional", label: "Professional", icon: Briefcase, description: "Designer, architect, or contractor" },
    { value: "admin", label: "Admin", icon: Shield, description: "Platform administrator" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? "Join India's premier design platform" 
              : "Sign in to your account to continue"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Auth */}
          <Button
            type="button"
            variant="outline"
            className="w-full hover-lift"
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
          >
            <Chrome className="h-4 w-4 mr-2" />
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <option.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-elegant hover-lift" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
          </form>

          {!isSignUp && (
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-primary hover:underline text-sm"
                onClick={handleResend}
                disabled={isResending || !formData.email}
              >
                {isResending ? "Resending..." : "Resend confirmation email"}
              </button>
            </div>
          )}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
            </span>
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          {isSignUp && (
            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}