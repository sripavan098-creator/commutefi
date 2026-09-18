import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Landmark,
  Settings,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Smartphone,
  Home,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/ledger', icon: Users, label: 'User Ledger', end: false },
  { to: '/dashboard/loan-engine', icon: Landmark, label: 'Loan Engine', end: false },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings', end: false },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname === '/dashboard') return 'Overview';
    if (location.pathname.includes('ledger')) return 'User Ledger';
    if (location.pathname.includes('loan-engine')) return 'Loan Engine';
    if (location.pathname.includes('settings')) return 'Settings';
    return 'Dashboard';
  };

  return (
    <div className="flex h-screen w-screen bg-obsidian overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2 }}
        className="h-full bg-charcoal border-r border-border flex flex-col flex-shrink-0"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-volt/10 border border-volt/20 flex items-center justify-center flex-shrink-0">
              <Leaf size={16} className="text-volt" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <h1 className="text-sm font-bold text-white truncate">
                  Commute<span className="text-volt">Fi</span>
                </h1>
                <p className="text-[9px] text-muted-dark truncate">Partner Dashboard</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                    isActive
                      ? 'bg-volt/10 text-volt border border-volt/20'
                      : 'text-muted hover:text-white hover:bg-white/[0.03]'
                  }`
                }
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-muted hover:text-white hover:bg-white/[0.03] transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>

        {/* Partner badge */}
        {!collapsed && (
          <div className="mx-3 mb-3 p-3 rounded-xl bg-obsidian border border-border">
            <p className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold">Partner</p>
            <p className="text-xs font-semibold text-white mt-1">Satin Finserv</p>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400">Connected</span>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-charcoal/50 backdrop-blur-sm flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">{getPageTitle()}</h2>
            <p className="text-[11px] text-muted-dark">Satin Finserv • Partner Portal</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-obsidian border border-border rounded-lg px-3 py-1.5">
              <Search size={14} className="text-muted-dark" />
              <input
                type="text"
                placeholder="Search users..."
                className="bg-transparent text-xs text-white placeholder:text-muted-dark outline-none w-40"
              />
            </div>
            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-lg bg-obsidian border border-border flex items-center justify-center hover:bg-white/[0.03] transition-colors">
              <Bell size={14} className="text-muted" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-volt rounded-full border border-charcoal" />
            </button>
            {/* Mobile App Link */}
            <Link
              to="/app"
              className="hidden sm:flex items-center gap-1.5 bg-obsidian border border-border rounded-lg px-2.5 py-1.5 hover:border-volt/30 transition-colors"
            >
              <Smartphone size={12} className="text-muted" />
              <span className="text-[10px] text-muted font-medium">Mobile App</span>
            </Link>
            {/* Home Link */}
            <Link
              to="/"
              className="w-8 h-8 rounded-lg bg-obsidian border border-border flex items-center justify-center hover:border-volt/30 transition-colors"
            >
              <Home size={12} className="text-muted" />
            </Link>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-volt/20 to-volt/5 border border-volt/20 flex items-center justify-center">
              <span className="text-xs">SF</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
