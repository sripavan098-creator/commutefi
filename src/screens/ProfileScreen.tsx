import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Award, MapPin, CreditCard } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export function ProfileScreen() {
  const { ecoCredits, greenTrips, co2Saved, streak } = useUserStore();

  const menuItems = [
    { icon: MapPin, label: 'Saved Routes', badge: '3 routes' },
    { icon: CreditCard, label: 'Payment Methods', badge: null },
    { icon: Award, label: 'Achievements', badge: '12 badges' },
    { icon: Bell, label: 'Notifications', badge: null },
    { icon: Shield, label: 'Privacy & Security', badge: null },
    { icon: HelpCircle, label: 'Help & Support', badge: null },
  ];

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <motion.button whileTap={{ scale: 0.9 }}>
          <Settings size={20} className="text-muted" />
        </motion.button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-charcoal border border-border rounded-3xl p-5 mb-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-volt/20 to-volt/5 border border-volt/20 flex items-center justify-center">
            <span className="text-2xl">🧑‍💻</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">Arjun Mehta</h2>
            <p className="text-xs text-muted">College Student • Pune</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-semibold text-volt bg-volt/10 px-2 py-0.5 rounded-full">
                🌱 Eco Champion
              </span>
              <span className="text-[10px] font-medium text-muted bg-obsidian px-2 py-0.5 rounded-full">
                Level 7
              </span>
            </div>
          </div>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-bold text-white">{ecoCredits.toLocaleString()}</p>
            <p className="text-[10px] text-muted">Credits</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{greenTrips}</p>
            <p className="text-[10px] text-muted">Trips</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">{streak}🔥</p>
            <p className="text-[10px] text-muted">Streak</p>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-charcoal border border-border rounded-2xl overflow-hidden"
      >
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${
                i !== menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
              whileTap={{ scale: 0.98, backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <div className="w-8 h-8 rounded-lg bg-obsidian flex items-center justify-center">
                <Icon size={15} className="text-muted" />
              </div>
              <span className="flex-1 text-sm font-medium text-white text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] text-muted bg-obsidian px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight size={14} className="text-muted-dark" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5 flex items-center justify-center gap-2 py-3 text-danger/80 text-sm font-medium"
        whileTap={{ scale: 0.97 }}
      >
        <LogOut size={16} />
        Sign Out
      </motion.button>

      {/* App version */}
      <p className="text-center text-[10px] text-muted-dark mt-3">
        CommuteFi v1.0.0 • SANKALP Hackathon
      </p>
    </div>
  );
}
