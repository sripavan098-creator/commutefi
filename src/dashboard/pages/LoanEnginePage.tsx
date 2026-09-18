import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Zap,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Award,
  Lock,
  Unlock,
  ChevronDown,
  Banknote,
  Target,
} from 'lucide-react';
import { topCommuters, loanApplications } from '../data/mockData';
import confetti from 'canvas-confetti';

function getScoreLabel(score: number): { text: string; color: string } {
  if (score >= 850) return { text: 'Excellent', color: 'text-volt' };
  if (score >= 750) return { text: 'Very Good', color: 'text-emerald-400' };
  if (score >= 650) return { text: 'Good', color: 'text-blue-400' };
  if (score >= 500) return { text: 'Fair', color: 'text-amber-400' };
  return { text: 'Poor', color: 'text-red-400' };
}

function getScoreRingColor(score: number): string {
  if (score >= 850) return '#CCFF00';
  if (score >= 750) return '#00D68F';
  if (score >= 650) return '#4A9EFF';
  if (score >= 500) return '#FFA500';
  return '#FF4444';
}

export function LoanEnginePage() {
  const [selectedUserIdx, setSelectedUserIdx] = useState(0);
  const [showApproval, setShowApproval] = useState(false);
  const [disbursed, setDisbursed] = useState(false);

  const user = topCommuters[selectedUserIdx];
  const scoreInfo = getScoreLabel(user.ecoScore);
  const ringColor = getScoreRingColor(user.ecoScore);

  // Loan calculation logic
  const baseLoanAmount = Math.min(user.totalKm * 350, 80000);
  const ecoReward = user.ecoScore >= 800 ? 10000 : user.ecoScore >= 700 ? 5000 : user.ecoScore >= 600 ? 2000 : 0;
  const totalApproved = baseLoanAmount + ecoReward;
  const isEligible = user.ecoScore >= 600;
  const riskTier = user.ecoScore >= 800 ? 'Low' : user.ecoScore >= 650 ? 'Medium' : 'High';

  const handleApprove = () => {
    setShowApproval(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#CCFF00', '#99CC00', '#FFFFFF', '#00D68F'],
    });
  };

  const handleDisburse = () => {
    setDisbursed(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#CCFF00', '#99CC00', '#FFFFFF'],
    });
  };

  // SVG circle for score ring
  const circumference = 2 * Math.PI * 45;
  const scorePercent = user.ecoScore / 950;
  const strokeDashoffset = circumference * (1 - scorePercent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Loan Underwriting Engine</h2>
          <p className="text-xs text-muted mt-0.5">AI-powered credit decisions based on Eco-Credit Scores</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted bg-obsidian border border-border px-2 py-1 rounded-md">
            {loanApplications.length} applications
          </span>
          <span className="text-[10px] text-volt bg-volt/10 border border-volt/20 px-2 py-1 rounded-md">
            99.2% approval accuracy
          </span>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: User Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-charcoal border border-border rounded-xl overflow-hidden"
        >
          {/* User selector */}
          <div className="px-5 py-3 border-b border-border bg-obsidian/30">
            <p className="text-[10px] font-semibold text-muted-dark uppercase tracking-wider mb-2">Select Commuter</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {topCommuters.slice(0, 5).map((u, i) => (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUserIdx(i); setShowApproval(false); setDisbursed(false); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedUserIdx === i
                      ? 'bg-volt/10 text-volt border border-volt/20'
                      : 'bg-obsidian text-muted border border-border hover:border-border-light'
                  }`}
                >
                  <span>{u.avatar}</span>
                  <span>{u.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Profile content */}
          <div className="p-5">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-volt/10 to-volt/5 border border-volt/20 flex items-center justify-center text-2xl flex-shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin size={11} className="text-muted-dark" />
                    <span className="text-xs text-muted">{user.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={11} className="text-muted-dark" />
                    <span className="text-xs text-muted">{user.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco Score Ring */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    stroke="#262626"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="50" cy="50" r="45"
                    stroke={ringColor}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ filter: `drop-shadow(0 0 6px ${ringColor}40)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={user.ecoScore}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-black text-white"
                  >
                    {user.ecoScore}
                  </motion.span>
                  <span className={`text-[10px] font-semibold ${scoreInfo.color}`}>
                    {scoreInfo.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-obsidian rounded-lg p-3 border border-border text-center">
                <Leaf size={14} className="text-volt mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{user.greenTrips}</p>
                <p className="text-[9px] text-muted">Green Trips</p>
              </div>
              <div className="bg-obsidian rounded-lg p-3 border border-border text-center">
                <Target size={14} className="text-blue-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{user.totalKm}</p>
                <p className="text-[9px] text-muted">km Tracked</p>
              </div>
              <div className="bg-obsidian rounded-lg p-3 border border-border text-center">
                <Zap size={14} className="text-amber-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{user.ecoCredits.toLocaleString()}</p>
                <p className="text-[9px] text-muted">Credits</p>
              </div>
            </div>

            {/* CO2 Impact */}
            <div className="mt-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-400">{user.co2Saved} kg CO₂ saved</p>
                <p className="text-[10px] text-muted">Equivalent to planting {Math.round(user.co2Saved / 21)} trees</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Loan Decision Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-charcoal border border-border rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-border bg-obsidian/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote size={14} className="text-volt" />
              <span className="text-xs font-semibold text-white">Satin Finserv EV Loan</span>
            </div>
            <span className="text-[10px] text-muted bg-obsidian px-2 py-0.5 rounded-full">Pre-Approval</span>
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {!showApproval ? (
                <motion.div
                  key="calculation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-base font-bold text-white mb-4">Underwriting Decision</h3>
                  
                  {/* Loan Breakdown */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-xs text-muted">Base Loan Amount</span>
                      <span className="text-sm font-semibold text-white">
                        ₹{baseLoanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted">Eco-Reward Bonus</span>
                        {ecoReward > 0 && (
                          <span className="text-[9px] font-semibold text-volt bg-volt/10 px-1.5 py-0.5 rounded">
                            Score {'>'} 800
                          </span>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${ecoReward > 0 ? 'text-volt' : 'text-muted-dark'}`}>
                        + ₹{ecoReward.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-xs text-muted">Risk Assessment</span>
                      <span className={`text-xs font-semibold ${
                        riskTier === 'Low' ? 'text-emerald-400' : riskTier === 'Medium' ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {riskTier} Risk
                      </span>
                    </div>
                  </div>

                  {/* Total Approved */}
                  <div className="bg-obsidian border border-border rounded-xl p-4 mb-5">
                    <p className="text-[10px] text-muted-dark uppercase tracking-wider mb-1">Total Approved Amount</p>
                    <motion.p
                      key={totalApproved}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-black text-white"
                    >
                      ₹{totalApproved.toLocaleString('en-IN')}
                    </motion.p>
                    <p className="text-[10px] text-muted mt-1">
                      EMI: ₹{Math.round(totalApproved / 12).toLocaleString('en-IN')}/mo × 12 months
                    </p>
                  </div>

                  {/* Eligibility check */}
                  <div className={`mb-5 p-3 rounded-xl border ${
                    isEligible
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isEligible ? (
                        <>
                          <Shield size={14} className="text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">
                            Eligible — Eco-Credit Score meets threshold
                          </span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} className="text-red-400" />
                          <span className="text-xs font-medium text-red-400">
                            Not eligible — Minimum score of 600 required
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Approve Button */}
                  <motion.button
                    onClick={handleApprove}
                    disabled={!isEligible}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isEligible
                        ? 'bg-volt text-obsidian glow-volt-subtle hover:glow-volt'
                        : 'bg-muted-dark/20 text-muted-dark cursor-not-allowed'
                    }`}
                    whileTap={isEligible ? { scale: 0.97 } : {}}
                  >
                    {isEligible ? (
                      <>
                        <CheckCircle size={16} />
                        Approve Loan — ₹{totalApproved.toLocaleString('en-IN')}
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        Not Eligible for Approval
                      </>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="approved"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  {/* Approved Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-volt flex items-center justify-center mx-auto mb-4 glow-volt"
                  >
                    <CheckCircle size={36} className="text-obsidian" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black text-volt mb-1"
                  >
                    APPROVED
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted mb-6"
                  >
                    Loan of ₹{totalApproved.toLocaleString('en-IN')} approved for {user.name}
                  </motion.p>

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-obsidian border border-border rounded-xl p-4 mb-5 text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Borrower</span>
                        <span className="text-xs font-medium text-white">{user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Loan ID</span>
                        <span className="text-xs font-mono text-white">SF-{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Amount</span>
                        <span className="text-xs font-bold text-volt">₹{totalApproved.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Interest Rate</span>
                        <span className="text-xs font-medium text-white">8.5% p.a. (preferential)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted">Tenure</span>
                        <span className="text-xs font-medium text-white">12 months</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Disburse Button */}
                  {!disbursed ? (
                    <motion.button
                      onClick={handleDisburse}
                      className="w-full py-3.5 rounded-xl bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors"
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Banknote size={16} />
                      Disburse Funds to User Wallet
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-400">
                          ₹{totalApproved.toLocaleString('en-IN')} disbursed successfully!
                        </span>
                      </div>
                      <p className="text-[10px] text-muted mt-1">Funds transferred to user's CommuteFi wallet</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Recent Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-charcoal border border-border rounded-xl overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Recent Loan Applications</h3>
          <span className="text-[10px] text-muted">Last 7 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-obsidian/30">
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Applicant</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Score</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.map((loan, i) => (
                <tr key={loan.id} className="border-b border-border last:border-0 hover:bg-white/[0.01]">
                  <td className="px-5 py-3">
                    <span className="text-xs font-medium text-white">{loan.userName}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-muted">{loan.loanType}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold ${getScoreLabel(loan.ecoScore).color}`}>
                      {loan.ecoScore}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-semibold text-white">₹{loan.totalApproved.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      loan.status === 'approved' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' :
                      loan.status === 'disbursed' ? 'bg-volt/10 text-volt border-volt/20' :
                      loan.status === 'pending' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                      'bg-amber-400/10 text-amber-400 border-amber-400/20'
                    }`}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
