import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf, Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { TabBar } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ImpactScreen } from './screens/ImpactScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DashboardLayout } from './dashboard/DashboardLayout';
import { OverviewPage } from './dashboard/pages/OverviewPage';
import { UserLedgerPage } from './dashboard/pages/UserLedgerPage';
import { LoanEnginePage } from './dashboard/pages/LoanEnginePage';
import { SettingsPage } from './dashboard/pages/SettingsPage';

// ============================================
// Splash Screen
// ============================================
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
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
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

// ============================================
// Mobile App View
// ============================================
function MobileAppView() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'impact': return <ImpactScreen />;
      case 'rewards': return <RewardsScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="relative w-full h-full max-w-md mx-auto bg-obsidian flex flex-col overflow-hidden">
      {/* Quick nav to dashboard */}
      <Link
        to="/dashboard"
        className="absolute top-12 right-4 z-30 flex items-center gap-1 bg-charcoal/90 backdrop-blur-sm border border-border rounded-full px-2.5 py-1 hover:border-volt/30 transition-colors"
      >
        <Monitor size={10} className="text-muted" />
        <span className="text-[9px] text-muted font-medium">Dashboard</span>
      </Link>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-volt/[0.02] to-transparent pointer-events-none z-10" />
      
      {/* Status bar */}
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

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

// ============================================
// Landing / Entry Page
// ============================================
function LandingPage() {
  return (
    <div className="h-screen w-screen bg-obsidian flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-volt/3 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-volt/20 to-volt/5 border border-volt/30 flex items-center justify-center mx-auto mb-6 glow-volt-subtle"
        >
          <span className="text-3xl">🌱</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3"
        >
          Commute<span className="text-gradient-volt">Fi</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base text-muted mb-2"
        >
          Climate-Fintech for the SANKALP Hackathon
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-dark mb-8"
        >
          Turn sustainable commutes into verifiable financial assets.
          <br />Partner with Satin Finserv to underwrite green behavior.
        </motion.p>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <Link
            to="/app"
            className="group bg-charcoal border border-border rounded-2xl p-5 text-left hover:border-volt/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-volt/10 flex items-center justify-center">
                <Smartphone size={18} className="text-volt" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Mobile App</h3>
                <p className="text-[10px] text-muted">Consumer experience</p>
              </div>
            </div>
            <p className="text-xs text-muted-dark mb-3">
              GPS-tracked green commutes, real-time Eco-Credit earning, and Satin Finserv EV loan unlock.
            </p>
            <div className="flex items-center gap-1 text-volt text-xs font-medium group-hover:gap-2 transition-all">
              Open App <ArrowRight size={12} />
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="group bg-charcoal border border-border rounded-2xl p-5 text-left hover:border-volt/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <Monitor size={18} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Partner Dashboard</h3>
                <p className="text-[10px] text-muted">Satin Finserv portal</p>
              </div>
            </div>
            <p className="text-xs text-muted-dark mb-3">
              B2B underwriting engine, user ledger, loan approvals, and portfolio risk analytics.
            </p>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium group-hover:gap-2 transition-all">
              Open Dashboard <ArrowRight size={12} />
            </div>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-[10px] text-muted-dark mt-8"
        >
          Built for SANKALP by Satin Finserv • Climate-Fintech Track
        </motion.p>
      </motion.div>
    </div>
  );
}

// ============================================
// Main App with Router
// ============================================
function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  // Show splash only on initial load
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('commuteFi_splash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('commuteFi_splash', 'true');
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={
          <div className="h-screen w-screen bg-obsidian flex items-center justify-center overflow-hidden">
            <MobileAppView />
          </div>
        } />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="ledger" element={<UserLedgerPage />} />
          <Route path="loan-engine" element={<LoanEnginePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
