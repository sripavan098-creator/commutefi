/**
 * LocalStorage Persistence Layer (Demo Mode)
 * 
 * This provides the same interface as Supabase would, but stores everything
 * in localStorage. When real Supabase is configured, this module is bypassed.
 */

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  eco_credits: number;
  total_distance_km: number;
  co2_saved_kg: number;
  green_trips_count: number;
  current_streak: number;
  city: string;
  created_at: string;
}

export interface TripRecord {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  distance_km: number;
  duration_minutes: number;
  eco_credits_earned: number;
  co2_saved_kg: number;
  transport_mode: string;
  route_data: Array<{ lat: number; lng: number; timestamp: number }>;
  created_at: string;
}

const PROFILES_KEY = 'commutefi_profiles';
const TRIPS_KEY = 'commutefi_trips';
const SESSION_KEY = 'commutefi_session';
const PASSWORDS_KEY = 'commutefi_passwords'; // Demo only - never do this in production!

// --- Profile Operations ---

export function getAllProfiles(): UserProfile[] {
  const data = localStorage.getItem(PROFILES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getProfile(userId: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find(p => p.id === userId) || null;
}

export function updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
  const profiles = getAllProfiles();
  const index = profiles.findIndex(p => p.id === userId);
  if (index === -1) return null;
  
  profiles[index] = { ...profiles[index], ...updates };
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  return profiles[index];
}

export function createProfile(profile: UserProfile): UserProfile {
  const profiles = getAllProfiles();
  profiles.push(profile);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  return profile;
}

// --- Trip Operations ---

export function getAllTrips(): TripRecord[] {
  const data = localStorage.getItem(TRIPS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getUserTrips(userId: string): TripRecord[] {
  return getAllTrips()
    .filter(t => t.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function createTrip(trip: TripRecord): TripRecord {
  const trips = getAllTrips();
  trips.push(trip);
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  return trip;
}

export function updateTrip(tripId: string, updates: Partial<TripRecord>): TripRecord | null {
  const trips = getAllTrips();
  const index = trips.findIndex(t => t.id === tripId);
  if (index === -1) return null;
  
  trips[index] = { ...trips[index], ...updates };
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  return trips[index];
}

// --- Session Operations ---

export function getSession(): { user_id: string; email: string } | null {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function setSession(session: { user_id: string; email: string } | null): void {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// --- Demo Auth (simulates Supabase Auth) ---

export function demoSignUp(email: string, password: string, fullName: string): { user: UserProfile; error?: string } {
  const profiles = getAllProfiles();
  
  // Check if email already exists
  if (profiles.find(p => p.email === email)) {
    return { user: null as any, error: 'An account with this email already exists' };
  }
  
  const userId = crypto.randomUUID();
  const profile: UserProfile = {
    id: userId,
    email,
    full_name: fullName,
    eco_credits: 0,
    total_distance_km: 0,
    co2_saved_kg: 0,
    green_trips_count: 0,
    current_streak: 0,
    city: 'Pune',
    created_at: new Date().toISOString(),
  };
  
  createProfile(profile);
  
  // Store password (demo only!)
  const passwords = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}');
  passwords[email] = password;
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
  
  setSession({ user_id: userId, email });
  
  return { user: profile };
}

export function demoSignIn(email: string, password: string): { user: UserProfile | null; error?: string } {
  const profiles = getAllProfiles();
  const profile = profiles.find(p => p.email === email);
  
  if (!profile) {
    return { user: null, error: 'Invalid email or password' };
  }
  
  const passwords = JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}');
  if (passwords[email] !== password) {
    return { user: null, error: 'Invalid email or password' };
  }
  
  setSession({ user_id: profile.id, email });
  return { user: profile };
}

export function demoSignOut(): void {
  setSession(null);
}

// --- Leaderboard ---

export function getLeaderboard(limit: number = 10): UserProfile[] {
  return getAllProfiles()
    .sort((a, b) => b.eco_credits - a.eco_credits)
    .slice(0, limit);
}

// --- Seed Demo Data ---

export function seedDemoData(): void {
  const existingProfiles = getAllProfiles();
  if (existingProfiles.length > 0) return; // Already seeded
  
  const demoUsers: UserProfile[] = [
    {
      id: 'demo-user-1',
      email: 'rahul@example.com',
      full_name: 'Rahul Sharma',
      eco_credits: 4500,
      total_distance_km: 120,
      co2_saved_kg: 25.2,
      green_trips_count: 45,
      current_streak: 12,
      city: 'Pune',
      created_at: '2024-01-15T10:00:00Z',
    },
    {
      id: 'demo-user-2',
      email: 'priya@example.com',
      full_name: 'Priya Patel',
      eco_credits: 6200,
      total_distance_km: 185,
      co2_saved_kg: 38.8,
      green_trips_count: 62,
      current_streak: 18,
      city: 'Mumbai',
      created_at: '2023-12-20T10:00:00Z',
    },
    {
      id: 'demo-user-3',
      email: 'arjun@example.com',
      full_name: 'Arjun Mehta',
      eco_credits: 3200,
      total_distance_km: 98,
      co2_saved_kg: 20.6,
      green_trips_count: 42,
      current_streak: 7,
      city: 'Pune',
      created_at: '2024-02-01T10:00:00Z',
    },
    {
      id: 'demo-user-4',
      email: 'sneha@example.com',
      full_name: 'Sneha Reddy',
      eco_credits: 2800,
      total_distance_km: 76,
      co2_saved_kg: 16.0,
      green_trips_count: 38,
      current_streak: 5,
      city: 'Hyderabad',
      created_at: '2024-03-10T10:00:00Z',
    },
    {
      id: 'demo-user-5',
      email: 'vikram@example.com',
      full_name: 'Vikram Singh',
      eco_credits: 5100,
      total_distance_km: 142,
      co2_saved_kg: 29.8,
      green_trips_count: 55,
      current_streak: 14,
      city: 'Delhi',
      created_at: '2024-01-05T10:00:00Z',
    },
    {
      id: 'demo-user-6',
      email: 'ananya@example.com',
      full_name: 'Ananya Gupta',
      eco_credits: 1800,
      total_distance_km: 52,
      co2_saved_kg: 10.9,
      green_trips_count: 28,
      current_streak: 3,
      city: 'Bangalore',
      created_at: '2024-04-01T10:00:00Z',
    },
    {
      id: 'demo-user-7',
      email: 'karthik@example.com',
      full_name: 'Karthik Nair',
      eco_credits: 7500,
      total_distance_km: 210,
      co2_saved_kg: 44.1,
      green_trips_count: 71,
      current_streak: 22,
      city: 'Chennai',
      created_at: '2023-11-15T10:00:00Z',
    },
    {
      id: 'demo-user-8',
      email: 'meera@example.com',
      full_name: 'Meera Joshi',
      eco_credits: 2200,
      total_distance_km: 64,
      co2_saved_kg: 13.4,
      green_trips_count: 33,
      current_streak: 6,
      city: 'Pune',
      created_at: '2024-03-20T10:00:00Z',
    },
  ];
  
  localStorage.setItem(PROFILES_KEY, JSON.stringify(demoUsers));
  
  // Store demo passwords
  const passwords: Record<string, string> = {};
  demoUsers.forEach(u => { passwords[u.email] = 'demo123'; });
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
  
  // Seed some demo trips
  const demoTrips: TripRecord[] = [
    {
      id: 'trip-1',
      user_id: 'demo-user-1',
      start_time: new Date(Date.now() - 86400000).toISOString(),
      end_time: new Date(Date.now() - 86400000 + 1320000).toISOString(),
      distance_km: 4.2,
      duration_minutes: 22,
      eco_credits_earned: 42,
      co2_saved_kg: 0.88,
      transport_mode: 'bus',
      route_data: [],
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'trip-2',
      user_id: 'demo-user-2',
      start_time: new Date(Date.now() - 172800000).toISOString(),
      end_time: new Date(Date.now() - 172800000 + 2100000).toISOString(),
      distance_km: 8.7,
      duration_minutes: 35,
      eco_credits_earned: 87,
      co2_saved_kg: 1.83,
      transport_mode: 'train',
      route_data: [],
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 'trip-3',
      user_id: 'demo-user-7',
      start_time: new Date(Date.now() - 259200000).toISOString(),
      end_time: new Date(Date.now() - 259200000 + 1080000).toISOString(),
      distance_km: 3.1,
      duration_minutes: 18,
      eco_credits_earned: 31,
      co2_saved_kg: 0.65,
      transport_mode: 'cycling',
      route_data: [],
      created_at: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
  
  localStorage.setItem(TRIPS_KEY, JSON.stringify(demoTrips));
}
