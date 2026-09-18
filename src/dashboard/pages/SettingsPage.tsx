import { motion } from 'framer-motion';
import { Shield, Bell, Key, Database, Globe, Webhook, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white">Settings</h2>
        <p className="text-xs text-muted mt-0.5">Manage your partner integration and preferences</p>
      </div>

      {/* Partner Connection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-charcoal border border-border rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-volt/10 flex items-center justify-center">
            <Webhook size={16} className="text-volt" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">API Integration</h3>
            <p className="text-[11px] text-muted">CommuteFi ↔ Satin Finserv connection</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <CheckCircle size={11} className="text-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400">Active</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-xs text-muted">API Endpoint</span>
            <span className="text-xs font-mono text-white bg-obsidian px-2 py-0.5 rounded">api.commuteFi.io/v2</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-xs text-muted">Webhook URL</span>
            <span className="text-xs font-mono text-white bg-obsidian px-2 py-0.5 rounded">satin.finserv.in/hooks</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-muted">Last Sync</span>
            <span className="text-xs text-white">2 minutes ago</span>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-charcoal border border-border rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4">Preferences</h3>
        <div className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium text-white">Push Notifications</p>
                <p className="text-[10px] text-muted-dark">Get alerts for new applications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                notifications ? 'bg-volt' : 'bg-muted-dark/30'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Auto-approve */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium text-white">Auto-Approve (Score {'>'} 850)</p>
                <p className="text-[10px] text-muted-dark">Automatically approve high-score applications</p>
              </div>
            </div>
            <button
              onClick={() => setAutoApprove(!autoApprove)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                autoApprove ? 'bg-volt' : 'bg-muted-dark/30'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                autoApprove ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={14} className="text-muted" />
              <div>
                <p className="text-xs font-medium text-white">Two-Factor Authentication</p>
                <p className="text-[10px] text-muted-dark">Extra security for disbursements</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                twoFactor ? 'bg-volt' : 'bg-muted-dark/30'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                twoFactor ? 'translate-x-5' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Loan Parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-charcoal border border-border rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-white mb-4">Loan Parameters</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider block mb-1.5">
              Min Eco-Credit Score
            </label>
            <input
              type="number"
              defaultValue={600}
              className="w-full bg-obsidian border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-volt/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider block mb-1.5">
              Max Loan Amount (₹)
            </label>
            <input
              type="number"
              defaultValue={100000}
              className="w-full bg-obsidian border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-volt/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider block mb-1.5">
              Eco-Reward Bonus (Score {'>'} 800)
            </label>
            <input
              type="number"
              defaultValue={10000}
              className="w-full bg-obsidian border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-volt/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted-dark uppercase tracking-wider block mb-1.5">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              defaultValue={8.5}
              step={0.1}
              className="w-full bg-obsidian border border-border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-volt/50 transition-colors"
            />
          </div>
        </div>
        
        <motion.button
          className="mt-5 px-5 py-2.5 rounded-lg bg-volt text-obsidian font-bold text-xs glow-volt-subtle"
          whileTap={{ scale: 0.97 }}
        >
          Save Changes
        </motion.button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-charcoal border border-red-500/20 rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-xs text-muted mb-4">
          Disconnecting will revoke API access and pause all loan processing.
        </p>
        <button className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/5 transition-colors">
          Disconnect Partner Integration
        </button>
      </motion.div>
    </div>
  );
}
