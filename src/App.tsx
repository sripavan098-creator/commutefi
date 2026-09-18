import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TabBar } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ImpactScreen } from './screens/ImpactScreen';
import { ProfileScreen } from './screens/ProfileScreen';

function App() {
  const [activeTab, setActiveTab] = useState('home');

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
      {/* Phone frame container - centered on desktop, full screen on mobile */}
      <div className="relative w-full h-full max-w-md mx-auto bg-obsidian flex flex-col overflow-hidden">
        {/* Status bar mock */}
        <div className="flex-shrink-0 h-11 bg-obsidian flex items-center justify-between px-6 pt-1">
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
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
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
