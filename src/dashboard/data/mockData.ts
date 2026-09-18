// ============================================
// CommuteFi Partner Dashboard — Mock Data Layer
// ============================================

export interface CommuterProfile {
  id: string;
  name: string;
  avatar: string;
  city: string;
  greenTrips: number;
  totalKm: number;
  ecoScore: number;
  ecoCredits: number;
  co2Saved: number;
  memberSince: string;
  status: 'active' | 'inactive';
  loanEligibility: 'excellent' | 'good' | 'fair' | 'ineligible';
}

export interface LoanApplication {
  id: string;
  userId: string;
  userName: string;
  loanType: string;
  baseAmount: number;
  ecoReward: number;
  totalApproved: number;
  ecoScore: number;
  status: 'approved' | 'pending' | 'review' | 'disbursed';
  appliedDate: string;
  riskTier: 'low' | 'medium' | 'high';
}

export interface DailyActivity {
  date: string;
  commutes: number;
  credits: number;
  co2: number;
}

export interface MonthlyMetric {
  month: string;
  users: number;
  loans: number;
  credits: number;
}

// --- Platform Stats ---
export const platformStats = {
  totalCommuters: 14502,
  totalCO2Saved: 412.7, // tons
  ecoCreditsMinted: 8400000,
  loansPreApproved: 12000000, // ₹1.2 Cr
  weeklyGrowth: 12.4,
  monthlyGrowth: 23.8,
  avgEcoScore: 687,
  defaultRate: 0.8, // percent
};

// --- Daily Activity (30 days) ---
export const dailyActivity: DailyActivity[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const base = 800 + Math.sin(i * 0.3) * 200 + Math.random() * 300;
  return {
    date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    commutes: Math.round(base),
    credits: Math.round(base * 12),
    co2: +(base * 0.21 / 1000).toFixed(2),
  };
});

// --- Monthly Metrics ---
export const monthlyMetrics: MonthlyMetric[] = [
  { month: 'Apr', users: 4200, loans: 45, credits: 1200000 },
  { month: 'May', users: 5800, loans: 72, credits: 1800000 },
  { month: 'Jun', users: 7400, loans: 98, credits: 2600000 },
  { month: 'Jul', users: 9100, loans: 134, credits: 3400000 },
  { month: 'Aug', users: 11200, loans: 189, credits: 4800000 },
  { month: 'Sep', users: 14502, loans: 247, credits: 8400000 },
];

// --- Top Commuters ---
export const topCommuters: CommuterProfile[] = [
  {
    id: 'U001',
    name: 'Rahul Sharma',
    avatar: '👨‍💻',
    city: 'Pune',
    greenTrips: 45,
    totalKm: 120,
    ecoScore: 820,
    ecoCredits: 4500,
    co2Saved: 25.2,
    memberSince: 'Jan 2024',
    status: 'active',
    loanEligibility: 'excellent',
  },
  {
    id: 'U002',
    name: 'Priya Patel',
    avatar: '👩‍🎓',
    city: 'Mumbai',
    greenTrips: 62,
    totalKm: 185,
    ecoScore: 890,
    ecoCredits: 6200,
    co2Saved: 38.8,
    memberSince: 'Dec 2023',
    status: 'active',
    loanEligibility: 'excellent',
  },
  {
    id: 'U003',
    name: 'Arjun Mehta',
    avatar: '🧑‍💻',
    city: 'Pune',
    greenTrips: 42,
    totalKm: 98,
    ecoScore: 780,
    ecoCredits: 3200,
    co2Saved: 20.6,
    memberSince: 'Feb 2024',
    status: 'active',
    loanEligibility: 'good',
  },
  {
    id: 'U004',
    name: 'Sneha Reddy',
    avatar: '👩‍💼',
    city: 'Hyderabad',
    greenTrips: 38,
    totalKm: 76,
    ecoScore: 720,
    ecoCredits: 2800,
    co2Saved: 16.0,
    memberSince: 'Mar 2024',
    status: 'active',
    loanEligibility: 'good',
  },
  {
    id: 'U005',
    name: 'Vikram Singh',
    avatar: '👨‍🔧',
    city: 'Delhi',
    greenTrips: 55,
    totalKm: 142,
    ecoScore: 850,
    ecoCredits: 5100,
    co2Saved: 29.8,
    memberSince: 'Jan 2024',
    status: 'active',
    loanEligibility: 'excellent',
  },
  {
    id: 'U006',
    name: 'Ananya Gupta',
    avatar: '👩‍🏫',
    city: 'Bangalore',
    greenTrips: 28,
    totalKm: 52,
    ecoScore: 610,
    ecoCredits: 1800,
    co2Saved: 10.9,
    memberSince: 'Apr 2024',
    status: 'active',
    loanEligibility: 'fair',
  },
  {
    id: 'U007',
    name: 'Karthik Nair',
    avatar: '👨‍🎓',
    city: 'Chennai',
    greenTrips: 71,
    totalKm: 210,
    ecoScore: 910,
    ecoCredits: 7500,
    co2Saved: 44.1,
    memberSince: 'Nov 2023',
    status: 'active',
    loanEligibility: 'excellent',
  },
  {
    id: 'U008',
    name: 'Meera Joshi',
    avatar: '👩‍💻',
    city: 'Pune',
    greenTrips: 33,
    totalKm: 64,
    ecoScore: 680,
    ecoCredits: 2200,
    co2Saved: 13.4,
    memberSince: 'Mar 2024',
    status: 'active',
    loanEligibility: 'good',
  },
];

// --- Loan Applications ---
export const loanApplications: LoanApplication[] = [
  {
    id: 'L001',
    userId: 'U001',
    userName: 'Rahul Sharma',
    loanType: 'EV Two-Wheeler',
    baseAmount: 40000,
    ecoReward: 10000,
    totalApproved: 50000,
    ecoScore: 820,
    status: 'approved',
    appliedDate: 'Sep 15, 2024',
    riskTier: 'low',
  },
  {
    id: 'L002',
    userId: 'U002',
    userName: 'Priya Patel',
    loanType: 'EV Two-Wheeler',
    baseAmount: 45000,
    ecoReward: 15000,
    totalApproved: 60000,
    ecoScore: 890,
    status: 'disbursed',
    appliedDate: 'Sep 12, 2024',
    riskTier: 'low',
  },
  {
    id: 'L003',
    userId: 'U005',
    userName: 'Vikram Singh',
    loanType: 'E-Bike Financing',
    baseAmount: 30000,
    ecoReward: 8000,
    totalApproved: 38000,
    ecoScore: 850,
    status: 'approved',
    appliedDate: 'Sep 14, 2024',
    riskTier: 'low',
  },
  {
    id: 'L004',
    userId: 'U007',
    userName: 'Karthik Nair',
    loanType: 'EV Three-Wheeler',
    baseAmount: 80000,
    ecoReward: 20000,
    totalApproved: 100000,
    ecoScore: 910,
    status: 'pending',
    appliedDate: 'Sep 17, 2024',
    riskTier: 'low',
  },
  {
    id: 'L005',
    userId: 'U003',
    userName: 'Arjun Mehta',
    loanType: 'EV Two-Wheeler',
    baseAmount: 35000,
    ecoReward: 5000,
    totalApproved: 40000,
    ecoScore: 780,
    status: 'review',
    appliedDate: 'Sep 16, 2024',
    riskTier: 'medium',
  },
  {
    id: 'L006',
    userId: 'U004',
    userName: 'Sneha Reddy',
    loanType: 'E-Bike Financing',
    baseAmount: 25000,
    ecoReward: 3000,
    totalApproved: 28000,
    ecoScore: 720,
    status: 'approved',
    appliedDate: 'Sep 13, 2024',
    riskTier: 'medium',
  },
];

// --- Score Distribution ---
export const scoreDistribution = [
  { range: '300-500', count: 1200, label: 'Poor' },
  { range: '500-650', count: 3400, label: 'Fair' },
  { range: '650-750', count: 4800, label: 'Good' },
  { range: '750-850', count: 3600, label: 'Very Good' },
  { range: '850-950', count: 1502, label: 'Excellent' },
];

// --- Risk Analysis ---
export const riskMetrics = {
  totalDisbursed: 4800000,
  defaultRate: 0.8,
  avgRepaymentScore: 94.2,
  recoveryRate: 99.1,
  activeLoans: 247,
  avgLoanSize: 45000,
};
