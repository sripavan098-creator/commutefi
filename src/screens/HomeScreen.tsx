import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, TrendingUp, Flame, AlertTriangle, MapPin } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useGeolocation } from '../hooks/useGeolocation';
import { LiveMap } from '../components/LiveMap';

export function HomeScreen() {
  const {
    ecoCredits,
    co2Saved,
    isCommuting,
    streak,
    liveCredits,
    liveCO2,
    liveDistance,
    startCommute,
    stopCommute,
    updateLiveTracking,
  } = useUserStore();

  const {
    currentPosition,
    route,
    totalDistance,
    isTracking,
    permissionState,
    error,
    isSimulated,
    startTracking,
    stopTracking,
    clearRoute,
  } = useGeolocation();

  const [elapsed, setElapsed] = useState(0);
  const [commuteStartTime, setCommuteStartTime] = useState<number | null>(null);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);

  // Timer for elapsed time
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCommuting && commuteStartTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - commuteStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCommuting, commuteStartTime]);

  // Sync geolocation data to store
  useEffect(() => {
    if (isCommuting && isTracking) {
      updateLiveTracking(totalDistance, route);
    }
  }, [totalDistance, route, isCommuting, isTracking, updateLiveTracking]);

  // Watch for permission errors
  useEffect(() => {
    if (error && permissionState === 'denied') {
      setShowPermissionAlert(true);
    }
  }, [error, permissionState]);

  const handleToggleCommute = async () => {
    if (isCommuting) {
      // Stop commute
      stopTracking();
      stopCommute();
      setElapsed(0);
      setCommuteStartTime(null);
      clearRoute();
    } else {
      // Start commute
      startCommute();
      setCommuteStartTime(Date.now());
      await startTracking();
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
        className="flex items-center justify-between mb-5"
      >
        <div>
          <p className="text-sm text-muted">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-white mt-0.5">Arjun ✨</h1>
        </div>
        <motion.div
          className="flex items-center gap-1.5 bg-charcoal border border-border rounded-full px-3 py-1.5"
          whileHover={{ scale: 1.02 }}
        >
          <Flame size={14} className="text-orange-400" />
          <span className="text-xs font-semibold text-white">{streak} day streak</span>
        </motion.div>
      </motion.div>

      {/* Eco-Credit Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-4"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal to-charcoal-light border border-border p-5">
          {/* Glow effects */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-volt/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-volt/3 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
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
            
            <div className="flex items-baseline gap-2">
              <motion.span
                key={ecoCredits}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-black text-gradient-volt tracking-tight"
              >
                {ecoCredits.toLocaleString()}
              </motion.span>
              <span className="text-base text-muted font-medium">pts</span>
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-volt-dim" />
                <span className="text-xs text-muted">{co2Saved} kg CO₂ saved</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 min-h-[220px] mb-4"
      >
        <LiveMap
          route={route}
          currentPosition={currentPosition}
          isTracking={isTracking}
          isSimulated={isSimulated}
          totalDistance={totalDistance}
          elapsedSeconds={elapsed}
        />
      </motion.div>

      {/* Live Earnings Bar (when commuting) */}
      <AnimatePresence>
        {isCommuting && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-charcoal border border-volt/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-volt"
                  />
                  <span className="text-sm font-semibold text-white">Commute Active</span>
                </div>
                <span className="text-lg font-mono font-bold text-volt">{formatTime(elapsed)}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-obsidian rounded-xl p-2 text-center">
                  <p className="text-xs font-bold text-white">{liveDistance.toFixed(2)} km</p>
                  <p className="text-[9px] text-muted">Distance</p>
                </div>
                <div className="bg-obsidian rounded-xl p-2 text-center">
                  <p className="text-xs font-bold text-volt">+{liveCredits}</p>
                  <p className="text-[9px] text-muted">Credits</p>
                </div>
                <div className="bg-obsidian rounded-xl p-2 text-center">
                  <p className="text-xs font-bold text-emerald-400">{liveCO2.toFixed(2)} kg</p>
                  <p className="text-[9px] text-muted">CO₂ Saved</p>
                </div>
              </div>
              
              {isSimulated && (
                <p className="text-[9px] text-amber-400/70 mt-2 text-center">
                  ⚡ Demo mode — GPS simulated for preview
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permission Alert */}
      <AnimatePresence>
        {showPermissionAlert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2"
          >
            <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-medium text-amber-200">Location access needed</p>
              <p className="text-[10px] text-amber-400/70 mt-0.5">
                Enable location in browser settings for real GPS tracking. Demo mode active.
              </p>
            </div>
            <button
              onClick={() => setShowPermissionAlert(false)}
              className="text-amber-400 text-xs font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start/Stop Commute Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-3"
      >
        <motion.button
          onClick={handleToggleCommute}
          className={`w-full py-4.5 rounded-2xl font-bold text-base transition-all duration-300 ${
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
              {isCommuting ? '⏹ Stop Commute' : '▶  Start Commute'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        
        <p className="text-center text-[10px] text-muted-dark mt-2">
          {isCommuting
            ? 'Tracking your green journey • Credits earned in real-time'
            : '1 km = 10 Eco-Credits • 1 km = 0.21 kg CO₂ saved'}
        </p>
      </motion.div>
    </div>
  );
}
