import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TabBar } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ImpactScreen } from './screens/ImpactScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-obsidian flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Logo icon */}
        <motion.div
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-volt/20 to-volt/5 border border-volt/30 flex items-center justify-center mb-5 glow-volt-subtle"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(204, 255, 0, 0.1)',
              '0 0 40px rgba(204, 255, 0, 0.3)',
              '0 0 20px rgba(204, 255, 0, 0.1)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-4xl">🌱</span>
        </motion.div>
        
        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-black text-white tracking-tight"
        >
          Commute<span className="text-gradient-volt">Fi</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted mt-2"
        >
          Turn your commute into climate credits
        </motion.p>
        
        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-32 h-1 bg-charcoal rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-volt rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] text-muted-dark mt-3"
        >
          SANKALP by Satin Finserv
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'impact':
        return <ImpactScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="h-screen w-screen bg-obsidian flex items-center justify-center overflow-hidden">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Phone frame container */}
      <div className="relative w-full h-full max-w-md mx-auto bg-obsidian flex flex-col overflow-hidden">
        {/* Subtle top gradient for depth */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-volt/[0.02] to-transparent pointer-events-none z-10" />
        
        {/* Status bar mock */}
        <div className="flex-shrink-0 h-11 bg-obsidian flex items-center justify-between px-6 pt-1 z-20">
          <span className="text-xs font-semibold text-white">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <div className="w-1 h-1.5 bg-white rounded-full" />
              <div className="w-1 h-2 bg-white rounded-full" />
              <div className="w-1 h-2.5 bg-white rounded-full" />
              <div className="w-1 h-3 bg-white rounded-full" />
            </div>
            <span className="text-[10px] text-white font-medium ml-1">5G</span>
            <div className="w-6 h-3 border border-white/50 rounded-sm ml-1 relative">
              <div className="absolute inset-0.5 bg-white rounded-[1px]" style={{ width: '70%' }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab Bar */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
