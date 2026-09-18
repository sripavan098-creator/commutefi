import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Zap, Bus, Train, Bike, Award, Gift, CreditCard } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

function getModeIcon(mode: string) {
  switch (mode) {
    case 'bus': return Bus;
    case 'metro': return Train;
    case 'cycle': return Bike;
    default: return Bus;
  }
}

export function RewardsScreen() {
  const { ecoCredits, co2Saved, greenTrips, transactions } = useUserStore();

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
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white">Rewards & Impact</h1>
        <p className="text-sm text-muted mt-1">Your green journey, quantified</p>
      </motion.div>

      {/* Impact Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-6"
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
        className="mb-6"
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
                  <p className="text-xs text-muted mt-0.5">{tx.date} • {tx.distance}</p>
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
        className="relative overflow-hidden rounded-3xl border border-volt/30 bg-gradient-to-br from-charcoal via-charcoal to-[#1a1f0a] p-5"
      >
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-volt/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-volt/3 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-volt/15 flex items-center justify-center">
              <Award size={14} className="text-volt" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-volt uppercase tracking-wider">Satin Finserv × CommuteFi</span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">EV Loan Pre-Approval</h3>
          <p className="text-xs text-muted mb-4">
            You've qualified for a ₹2,00,000 electric vehicle loan with preferential rates
          </p>
          
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-white">Eligibility Score</span>
              <span className="text-xs font-bold text-volt">100%</span>
            </div>
            <div className="h-2.5 bg-obsidian rounded-full overflow-hidden border border-border">
              <motion.div
                className="h-full bg-gradient-to-r from-volt-dim to-volt rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 shimmer rounded-full" />
              </motion.div>
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.button
            className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-bold text-sm glow-volt-subtle flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
          >
            <CreditCard size={16} />
            Unlock ₹5,000 Down-Payment Credit
          </motion.button>
          
          <p className="text-[10px] text-muted-dark text-center mt-2">
            Powered by Satin Finserv • No impact on credit score
          </p>
        </div>
      </motion.div>
    </div>
  );
}
