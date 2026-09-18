import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, TrendingUp, Flame } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { MapMock } from '../components/MapMock';

export function HomeScreen() {
  const { ecoCredits, co2Saved, isCommuting, streak, startCommute, stopCommute } = useUserStore();
  const [elapsed, setElapsed] = useState(0);
  const [commuteStartTime, setCommuteStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCommuting && commuteStartTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - commuteStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCommuting, commuteStartTime]);

  const handleToggleCommute = () => {
    if (isCommuting) {
      stopCommute();
      setElapsed(0);
      setCommuteStartTime(null);
    } else {
      startCommute();
      setCommuteStartTime(Date.now());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-2 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-sm text-muted">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-white mt-0.5">Arjun ✨</h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-1.5 bg-charcoal border border-border rounded-full px-3 py-1.5"
            whileHover={{ scale: 1.02 }}
          >
            <Flame size={14} className="text-orange-400" />
            <span className="text-xs font-semibold text-white">{streak} day streak</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Eco-Credit Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-5"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal to-charcoal-light border border-border p-6">
          {/* Glow effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-volt/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-volt/3 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-volt/10 flex items-center justify-center">
                  <Leaf size={16} className="text-volt" />
                </div>
                <span className="text-sm font-medium text-muted">Eco-Credits</span>
              </div>
              <div className="flex items-center gap-1 bg-volt/10 rounded-full px-2 py-0.5">
                <TrendingUp size={12} className="text-volt" />
                <span className="text-[10px] font-semibold text-volt">+12% this week</span>
              </div>
            </div>
            
            <motion.div
              key={ecoCredits}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-5xl font-black text-gradient-volt tracking-tight">
                {ecoCredits.toLocaleString()}
              </span>
              <span className="text-lg text-muted font-medium">pts</span>
            </motion.div>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-volt-dim" />
                <span className="text-xs text-muted">
                  {co2Saved} kg CO₂ saved
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 min-h-[240px] mb-5"
      >
        <MapMock />
      </motion.div>

      {/* Commute Timer (when active) */}
      <AnimatePresence>
        {isCommuting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="bg-charcoal border border-volt/20 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-volt"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Commute Active</p>
                  <p className="text-xs text-muted">Tracking your green journey</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-mono font-bold text-volt">{formatTime(elapsed)}</p>
                <p className="text-[10px] text-muted">earning credits...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start/Stop Commute Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-4"
      >
        <motion.button
          onClick={handleToggleCommute}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
            isCommuting
              ? 'bg-danger/10 border-2 border-danger text-danger glow-danger'
              : 'bg-volt text-obsidian glow-volt'
          }`}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.01 }}
          layout
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isCommuting ? 'stop' : 'start'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2"
            >
              {isCommuting ? '⏹ Stop Commute' : '▶ Start Commute'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </div>
  );
}
