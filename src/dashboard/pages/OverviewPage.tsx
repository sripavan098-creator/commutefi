import { motion } from 'framer-motion';
import {
  Users,
  Leaf,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { platformStats, dailyActivity, monthlyMetrics } from '../data/mockData';

const stats = [
  {
    label: 'Active Commuters',
    value: platformStats.totalCommuters.toLocaleString('en-IN'),
    change: '+12.4%',
    positive: true,
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    label: 'CO₂ Saved',
    value: `${platformStats.totalCO2Saved} T`,
    change: '+23.8%',
    positive: true,
    icon: Leaf,
    color: 'text-volt',
    bg: 'bg-volt/10',
  },
  {
    label: 'Eco-Credits Minted',
    value: '8.4M',
    change: '+18.2%',
    positive: true,
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    label: 'Loans Pre-Approved',
    value: '₹1.2 Cr',
    change: '+31.5%',
    positive: true,
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-charcoal border border-border rounded-lg px-3 py-2 shadow-xl">
        <p className="text-[10px] text-muted mb-1">{label}</p>
        <p className="text-sm font-bold text-white">
          {payload[0].value.toLocaleString('en-IN')} commutes
        </p>
      </div>
    );
  }
  return null;
};

export function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-charcoal border border-border rounded-xl p-5 hover:border-border-light transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.positive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-charcoal border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Daily Green Commutes</h3>
              <p className="text-[11px] text-muted">Last 30 days activity</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted bg-obsidian px-2 py-1 rounded-md">30D</span>
              <span className="text-[10px] text-muted hover:text-white px-2 py-1 rounded-md cursor-pointer">90D</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="voltGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CCFF00" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#CCFF00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#737373"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={4}
                />
                <YAxis
                  stroke="#737373"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="commutes"
                  stroke="#CCFF00"
                  strokeWidth={2}
                  fill="url(#voltGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: '#CCFF00', stroke: '#0A0A0A', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Growth Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-charcoal border border-border rounded-xl p-5"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">User Growth</h3>
            <p className="text-[11px] text-muted">Monthly active commuters</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyMetrics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#737373"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#737373"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar
                  dataKey="users"
                  fill="#CCFF00"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Risk Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-charcoal border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Portfolio Risk Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-obsidian rounded-lg p-3 border border-border">
              <p className="text-[10px] text-muted-dark uppercase tracking-wider">Default Rate</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">0.8%</p>
              <p className="text-[10px] text-muted mt-0.5">vs industry avg 4.2%</p>
            </div>
            <div className="bg-obsidian rounded-lg p-3 border border-border">
              <p className="text-[10px] text-muted-dark uppercase tracking-wider">Recovery Rate</p>
              <p className="text-xl font-bold text-volt mt-1">99.1%</p>
              <p className="text-[10px] text-muted mt-0.5">Top decile performance</p>
            </div>
            <div className="bg-obsidian rounded-lg p-3 border border-border">
              <p className="text-[10px] text-muted-dark uppercase tracking-wider">Avg Repayment</p>
              <p className="text-xl font-bold text-white mt-1">94.2%</p>
              <p className="text-[10px] text-muted mt-0.5">On-time score</p>
            </div>
            <div className="bg-obsidian rounded-lg p-3 border border-border">
              <p className="text-[10px] text-muted-dark uppercase tracking-wider">Total Disbursed</p>
              <p className="text-xl font-bold text-white mt-1">₹48L</p>
              <p className="text-[10px] text-muted mt-0.5">247 active loans</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-charcoal border border-border rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-white mb-4">Recent Loan Activity</h3>
          <div className="space-y-3">
            {[
              { name: 'Priya Patel', action: 'Disbursed', amount: '₹60,000', time: '2h ago', status: 'disbursed' },
              { name: 'Rahul Sharma', action: 'Approved', amount: '₹50,000', time: '5h ago', status: 'approved' },
              { name: 'Karthik Nair', action: 'Under Review', amount: '₹1,00,000', time: '1d ago', status: 'review' },
              { name: 'Vikram Singh', action: 'Approved', amount: '₹38,000', time: '2d ago', status: 'approved' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'disbursed' ? 'bg-volt' :
                  item.status === 'approved' ? 'bg-emerald-400' :
                  'bg-amber-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{item.name}</p>
                  <p className="text-[10px] text-muted">{item.action} • {item.time}</p>
                </div>
                <span className="text-xs font-semibold text-white">{item.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
