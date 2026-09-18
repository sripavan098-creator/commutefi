import { motion } from 'framer-motion';
import { Leaf, TrendingUp, Zap, MapPin, Calendar, Target, ArrowUpRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export function ImpactScreen() {
  const { co2Saved, greenTrips, ecoCredits, streak, transactions } = useUserStore();

  const weeklyData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 30 },
    { day: 'Sun', value: 55 },
  ];

  const equivalences = [
    { icon: '🌳', label: 'Trees equivalent', value: '9' },
    { icon: '🚗', label: 'Car trips avoided', value: '23' },
    { icon: '💡', label: 'kWh energy saved', value: '142' },
  ];

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white">Your Impact</h1>
        <p className="text-sm text-muted mt-1">Every commute counts towards a greener planet</p>
      </motion.div>

      {/* Hero stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/30 to-charcoal border border-emerald-500/20 p-6 mb-5"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
            <Leaf size={28} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-3xl font-black text-white">{co2Saved} kg</p>
            <p className="text-sm text-muted">Total CO₂ saved</p>
          </div>
        </div>
        <div className="relative z-10 mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-emerald-500/10 rounded-full px-2 py-0.5">
            <ArrowUpRight size={12} className="text-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400">18% vs last month</span>
          </div>
        </div>
      </motion.div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-charcoal border border-border rounded-2xl p-4 mb-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Weekly Activity</h3>
          <span className="text-[10px] text-muted bg-obsidian px-2 py-0.5 rounded-full">This Week</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-24">
          {weeklyData.map((d, i) => (
            <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1">
              <motion.div
                className="w-full max-w-[24px] rounded-lg bg-gradient-to-t from-volt/30 to-volt/80"
                initial={{ height: 0 }}
                animate={{ height: `${d.value}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
              />
              <span className="text-[9px] text-muted-dark">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Equivalences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-5"
      >
        <h3 className="text-sm font-semibold text-white mb-3">Your Impact Equals</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {equivalences.map((eq, i) => (
            <motion.div
              key={eq.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="bg-charcoal border border-border rounded-xl p-3 text-center"
            >
              <span className="text-2xl">{eq.icon}</span>
              <p className="text-lg font-bold text-white mt-1">{eq.value}</p>
              <p className="text-[9px] text-muted mt-0.5">{eq.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-white mb-3">Milestones</h3>
        <div className="space-y-2">
          <div className="bg-charcoal border border-volt/20 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-volt/10 flex items-center justify-center">
              <Target size={14} className="text-volt" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">200 kg CO₂ Challenge</p>
              <div className="h-1.5 bg-obsidian rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-volt rounded-full" style={{ width: '93%' }} />
              </div>
            </div>
            <span className="text-xs font-bold text-volt">93%</span>
          </div>
          <div className="bg-charcoal border border-border rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center">
              <Calendar size={14} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">30-Day Green Streak</p>
              <div className="h-1.5 bg-obsidian rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '23%' }} />
              </div>
            </div>
            <span className="text-xs font-bold text-blue-400">7/30</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
