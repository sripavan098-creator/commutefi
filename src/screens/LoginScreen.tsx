import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
  onSwitchToSignup: () => void;
}

export function LoginScreen({ onSwitchToSignup }: LoginScreenProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setEmail('arjun@example.com');
    setPassword('demo123');
    setIsLoading(true);
    const result = await signIn('arjun@example.com', 'demo123');
    if (result.error) setError(result.error);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-obsidian flex flex-col items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-volt/3 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-volt/20 to-volt/5 border border-volt/30 flex items-center justify-center mb-4 glow-volt-subtle"
          >
            <Leaf size={24} className="text-volt" />
          </motion.div>
          <h1 className="text-2xl font-black text-white">
            Commute<span className="text-gradient-volt">Fi</span>
          </h1>
          <p className="text-xs text-muted mt-1">Welcome back</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5"
            >
              <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-300">{error}</span>
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold mb-1.5 block">
              Email
            </label>
            <div className="flex items-center gap-2 bg-charcoal border border-border rounded-xl px-3 py-3 focus-within:border-volt/40 transition-colors">
              <Mail size={15} className="text-muted-dark" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent text-sm text-white placeholder:text-muted-dark outline-none w-full"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold mb-1.5 block">
              Password
            </label>
            <div className="flex items-center gap-2 bg-charcoal border border-border rounded-xl px-3 py-3 focus-within:border-volt/40 transition-colors">
              <Lock size={15} className="text-muted-dark" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-sm text-white placeholder:text-muted-dark outline-none w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-dark hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-bold text-sm glow-volt-subtle flex items-center justify-center gap-2 disabled:opacity-50"
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
              />
            ) : (
              <>
                Sign In <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>

        {/* Demo login */}
        <div className="mt-4">
          <button
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-xl bg-charcoal border border-border text-sm text-muted font-medium hover:border-volt/30 hover:text-white transition-all"
          >
            Try Demo Account →
          </button>
          <p className="text-[10px] text-muted-dark text-center mt-2">
            arjun@example.com / demo123
          </p>
        </div>

        {/* Switch to signup */}
        <p className="text-center text-xs text-muted mt-6">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-volt font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>

        {/* Footer */}
        <p className="text-center text-[10px] text-muted-dark mt-8">
          SANKALP by Satin Finserv • Climate-Fintech
        </p>
      </motion.div>
    </div>
  );
}
