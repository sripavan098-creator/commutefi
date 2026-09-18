import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Home, Gift, BarChart3, User } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'impact', label: 'Impact', icon: BarChart3 },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'profile', label: 'Profile', icon: User },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="mx-3 mb-3 rounded-2xl border border-border bg-charcoal/95 backdrop-blur-xl px-2 py-2">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative flex flex-col items-center justify-center py-2 px-4 rounded-xl"
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-volt/10 border border-volt/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-volt' : 'text-muted-dark'
                    }`}
                  />
                  <span
                    className={`relative z-10 mt-1 text-[10px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-volt' : 'text-muted-dark'
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
