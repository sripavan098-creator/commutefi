import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, TrendingUp, Zap, Bus, Train, Bike, Award, CreditCard, Lock, Unlock, CheckCircle } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import confetti from 'canvas-confetti';

function getModeIcon(mode: string) {
  switch (mode) {
    case 'bus': return Bus;
    case 'metro': return Train;
    case 'cycle': return Bike;
    default: return Bus;
  }
}

const EV_UNLOCK_THRESHOLD = 500;

export function RewardsScreen() {
  const { ecoCredits, co2Saved, greenTrips, transactions } = useUserStore();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  // Watch ecoCredits and trigger unlock logic
  useEffect(() => {
    if (ecoCredits >= EV_UNLOCK_THRESHOLD && !isUnlocked) {
      setIsUnlocked(true);
      
      // Fire confetti once when first unlocked
      if (!hasShownConfetti) {
        setHasShownConfetti(true);
        setShowConfetti(true);
        
        // Multi-burst confetti
        const duration = 2000;
        const end = Date.now() + duration;
        
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ['#CCFF00', '#99CC00', '#FFFFFF'],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ['#CCFF00', '#99CC00', '#FFFFFF'],
          });
          
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        
        setTimeout(() => setShowConfetti(false), 2500);
      }
    }
  }, [ecoCredits, isUnlocked, hasShownConfetti]);

  const handleUnlock = () => {
    // Big confetti burst on button press
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#CCFF00', '#99CC00', '#FFFFFF', '#00D68F'],
    });
  };

  const progressPercent = Math.min((ecoCredits / EV_UNLOCK_THRESHOLD) * 100, 100);

  const stats = [
    {
      icon: Leaf,
      label: 'CO₂ Saved',
      value: `${co2Saved} kg`,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      icon: TrendingUp,
      label: 'Green Trips',
      value: greenTrips.toString(),
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      icon: Zap,
      label: 'Eco-Credits',
      value: ecoCredits.toLocaleString(),
      color: 'text-volt',
      bg: 'bg-volt/10',
    },
  ];

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <h1 className="text-2xl font-bold text-white">Rewards & Impact</h1>
        <p className="text-sm text-muted mt-1">Your green journey, quantified</p>
      </motion.div>

      {/* Impact Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-5"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-charcoal border border-border rounded-2xl p-3 text-center"
            >
              <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} className={stat.color} />
              </div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-muted mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Green Commute Ledger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-white">Green Commute Ledger</h2>
          <span className="text-xs text-volt font-medium">View All →</span>
        </div>
        
        <div className="space-y-2.5">
          {transactions.slice(0, 3).map((tx, i) => {
            const ModeIcon = getModeIcon(tx.mode);
            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="bg-charcoal border border-border rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-volt/10 flex items-center justify-center flex-shrink-0">
                  <ModeIcon size={18} className="text-volt" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{tx.title}</p>
                  <p className="text-xs text-muted mt-0.5">{tx.date} • {tx.distance.toFixed(1)} km</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-volt">+{tx.credits}</p>
                  <p className="text-[10px] text-muted">credits</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Satin Finserv EV Loan Pre-Approval Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`relative overflow-hidden rounded-3xl border p-5 transition-all duration-500 ${
          isUnlocked
            ? 'border-volt/40 bg-gradient-to-br from-charcoal via-charcoal to-[#1a1f0a]'
            : 'border-border bg-gradient-to-br from-charcoal to-charcoal-light'
        }`}
      >
        {/* Background glow */}
        {isUnlocked && (
          <>
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-volt/8 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-volt/5 rounded-full blur-2xl" />
          </>
        )}
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isUnlocked ? 'bg-volt/15' : 'bg-muted-dark/20'
            }`}>
              <Award size={14} className={isUnlocked ? 'text-volt' : 'text-muted-dark'} />
            </div>
            <div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                isUnlocked ? 'text-volt' : 'text-muted-dark'
              }`}>
                Satin Finserv × CommuteFi
              </span>
            </div>
            {isUnlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <CheckCircle size={16} className="text-volt" />
              </motion.div>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">EV Loan Pre-Approval</h3>
          <p className="text-xs text-muted mb-4">
            {isUnlocked
              ? '🎉 Congratulations! You\'ve qualified for a ₹2,00,000 electric vehicle loan!'
              : `Earn ${EV_UNLOCK_THRESHOLD} Eco-Credits to unlock preferential EV loan rates`
            }
          </p>
          
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-white">Eligibility Score</span>
              <span className={`text-xs font-bold ${isUnlocked ? 'text-volt' : 'text-muted'}`}>
                {progressPercent.toFixed(0)}%
              </span>
            </div>
            <div className="h-2.5 bg-obsidian rounded-full overflow-hidden border border-border">
              <motion.div
                className={`h-full rounded-full relative ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-volt-dim to-volt'
                    : 'bg-gradient-to-r from-muted-dark to-muted'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                {isUnlocked && <div className="absolute inset-0 shimmer rounded-full" />}
              </motion.div>
            </div>
            {!isUnlocked && (
              <p className="text-[10px] text-muted-dark mt-1.5">
                {ecoCredits} / {EV_UNLOCK_THRESHOLD} credits • {(EV_UNLOCK_THRESHOLD - ecoCredits)} more to unlock
              </p>
            )}
          </div>
          
          {/* CTA Button */}
          <motion.button
            onClick={isUnlocked ? handleUnlock : undefined}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isUnlocked
                ? 'bg-volt text-obsidian glow-volt-subtle'
                : 'bg-muted-dark/20 text-muted-dark border border-border cursor-not-allowed'
            }`}
            whileTap={isUnlocked ? { scale: 0.97 } : {}}
            whileHover={isUnlocked ? { scale: 1.01 } : {}}
            disabled={!isUnlocked}
          >
            {isUnlocked ? (
              <>
                <Unlock size={16} />
                Unlock ₹5,000 Down-Payment Credit
              </>
            ) : (
              <>
                <Lock size={14} />
                Locked — Earn {EV_UNLOCK_THRESHOLD - ecoCredits} more credits
              </>
            )}
          </motion.button>
          
          <p className="text-[10px] text-muted-dark text-center mt-2">
            Powered by Satin Finserv • No impact on credit score
          </p>
        </div>
      </motion.div>

      {/* Unlock celebration overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-charcoal border border-volt/30 rounded-2xl p-6 text-center glow-volt-subtle"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-lg font-bold text-volt">EV Loan Unlocked!</p>
              <p className="text-xs text-muted mt-1">₹5,000 down-payment credit available</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
