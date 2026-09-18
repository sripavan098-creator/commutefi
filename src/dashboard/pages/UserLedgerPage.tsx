import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown, MapPin, Leaf, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { topCommuters, scoreDistribution } from '../data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

function getScoreColor(score: number): string {
  if (score >= 850) return 'text-volt';
  if (score >= 750) return 'text-emerald-400';
  if (score >= 650) return 'text-blue-400';
  if (score >= 500) return 'text-amber-400';
  return 'text-red-400';
}

function getScoreBg(score: number): string {
  if (score >= 850) return 'bg-volt/10 border-volt/20';
  if (score >= 750) return 'bg-emerald-400/10 border-emerald-400/20';
  if (score >= 650) return 'bg-blue-400/10 border-blue-400/20';
  if (score >= 500) return 'bg-amber-400/10 border-amber-400/20';
  return 'bg-red-400/10 border-red-400/20';
}

function getEligibilityBadge(eligibility: string): { text: string; className: string } {
  switch (eligibility) {
    case 'excellent':
      return { text: 'Excellent', className: 'bg-volt/10 text-volt border-volt/20' };
    case 'good':
      return { text: 'Good', className: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' };
    case 'fair':
      return { text: 'Fair', className: 'bg-amber-400/10 text-amber-400 border-amber-400/20' };
    default:
      return { text: 'Ineligible', className: 'bg-red-400/10 text-red-400 border-red-400/20' };
  }
}

const CHART_COLORS = ['#FF4444', '#FFA500', '#4A9EFF', '#00D68F', '#CCFF00'];

export function UserLedgerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'trips' | 'credits'>('score');

  const filteredUsers = topCommuters
    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score') return b.ecoScore - a.ecoScore;
      if (sortBy === 'trips') return b.greenTrips - a.greenTrips;
      return b.ecoCredits - a.ecoCredits;
    });

  return (
    <div className="space-y-6">
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Green Commute Ledger</h2>
          <p className="text-xs text-muted mt-0.5">{topCommuters.length} verified commuters • Real-time scores</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-charcoal border border-border rounded-lg px-3 py-2 flex-1 sm:flex-initial">
            <Search size={14} className="text-muted-dark" />
            <input
              type="text"
              placeholder="Search commuters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder:text-muted-dark outline-none w-full sm:w-40"
            />
          </div>
          <button className="flex items-center gap-1.5 bg-charcoal border border-border rounded-lg px-3 py-2 text-xs text-muted hover:text-white transition-colors">
            <Filter size={12} />
            Filter
          </button>
        </div>
      </div>

      {/* Score Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-charcoal border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Eco-Credit Score Distribution</h3>
            <p className="text-[11px] text-muted">All platform users by credit tier</p>
          </div>
          <div className="flex items-center gap-3">
            {scoreDistribution.map((d, i) => (
              <div key={d.range} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-[9px] text-muted">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="range" stroke="#737373" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length && payload[0]?.value != null) {
                    return (
                      <div className="bg-charcoal border border-border rounded-lg px-3 py-2 shadow-xl">
                        <p className="text-xs font-bold text-white">{Number(payload[0].value).toLocaleString()} users</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {scoreDistribution.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} opacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-charcoal border border-border rounded-xl overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-obsidian/50">
          <div className="col-span-3">
            <span className="text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Commuter</span>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => setSortBy('trips')}
              className="flex items-center gap-1 text-[10px] font-semibold text-muted-dark uppercase tracking-wider hover:text-white transition-colors"
            >
              Green Trips <ArrowUpDown size={10} />
            </button>
          </div>
          <div className="col-span-2 hidden sm:block">
            <span className="text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Distance</span>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => setSortBy('score')}
              className="flex items-center gap-1 text-[10px] font-semibold text-muted-dark uppercase tracking-wider hover:text-white transition-colors"
            >
              Eco Score <ArrowUpDown size={10} />
            </button>
          </div>
          <div className="col-span-3">
            <span className="text-[10px] font-semibold text-muted-dark uppercase tracking-wider">Loan Eligibility</span>
          </div>
        </div>

        {/* Table Rows */}
        {filteredUsers.map((user, i) => {
          const badge = getEligibilityBadge(user.loanEligibility);
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-white/[0.01] transition-colors cursor-pointer"
            >
              {/* User info */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-obsidian border border-border flex items-center justify-center text-lg flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <MapPin size={9} className="text-muted-dark" />
                    <span className="text-[10px] text-muted-dark">{user.city}</span>
                  </div>
                </div>
              </div>

              {/* Green trips */}
              <div className="col-span-2 flex items-center">
                <div className="flex items-center gap-1.5">
                  <Leaf size={12} className="text-volt" />
                  <span className="text-sm font-semibold text-white">{user.greenTrips}</span>
                </div>
              </div>

              {/* Distance */}
              <div className="col-span-2 items-center hidden sm:flex">
                <span className="text-sm text-muted">{user.totalKm} km</span>
              </div>

              {/* Eco Score */}
              <div className="col-span-2 flex items-center">
                <div className={`px-2.5 py-1 rounded-lg border ${getScoreBg(user.ecoScore)}`}>
                  <span className={`text-sm font-bold ${getScoreColor(user.ecoScore)}`}>
                    {user.ecoScore}
                  </span>
                </div>
              </div>

              {/* Eligibility */}
              <div className="col-span-3 flex items-center">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${badge.className}`}>
                  {badge.text}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
