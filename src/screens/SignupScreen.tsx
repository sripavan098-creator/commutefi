import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignupScreenProps {
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onSwitchToLogin }: SignupScreenProps) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    const result = await signUp(email, password, fullName);
    if (result.error) {
      setError(result.error);
    }
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
            Join <span className="text-gradient-volt">CommuteFi</span>
          </h1>
          <p className="text-xs text-muted mt-1">Start earning Eco-Credits today</p>
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

          {/* Full Name */}
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold mb-1.5 block">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-charcoal border border-border rounded-xl px-3 py-3 focus-within:border-volt/40 transition-colors">
              <User size={15} className="text-muted-dark" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Arjun Mehta"
                className="bg-transparent text-sm text-white placeholder:text-muted-dark outline-none w-full"
                required
              />
            </div>
          </div>

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
                placeholder="Min 6 characters"
                className="bg-transparent text-sm text-white placeholder:text-muted-dark outline-none w-full"
                required
                minLength={6}
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
                Create Account <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </form>

        {/* Benefits */}
        <div className="mt-6 bg-charcoal border border-border rounded-xl p-4">
          <p className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold mb-2">What you get</p>
          <div className="space-y-1.5">
            <p className="text-xs text-muted flex items-center gap-2">
              <span className="text-volt">✓</span> Track green commutes with GPS
            </p>
            <p className="text-xs text-muted flex items-center gap-2">
              <span className="text-volt">✓</span> Earn Eco-Credits for every km
            </p>
            <p className="text-xs text-muted flex items-center gap-2">
              <span className="text-volt">✓</span> Unlock EV loans via Satin Finserv
            </p>
          </div>
        </div>

        {/* Switch to login */}
        <p className="text-center text-xs text-muted mt-6">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-volt font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </motion.div>
    </div>
  );
}
