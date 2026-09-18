import { create } from 'zustand';
import { calculateCredits, calculateCO2Saved } from '../utils/haversine';

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: number;
  speed: number | null;
}

export interface TripRecord {
  id: string;
  title: string;
  mode: string;
  credits: number;
  co2Kg: number;
  distance: number;
  date: string;
  duration: number; // in minutes
  route: GeoPoint[];
}

interface UserState {
  // Core stats
  ecoCredits: number;
  co2Saved: number;
  greenTrips: number;
  streak: number;
  
  // Live tracking
  isCommuting: boolean;
  commuteStartTime: number | null;
  liveDistance: number; // km tracked in current session
  liveRoute: GeoPoint[];
  liveCredits: number;
  liveCO2: number;
  
  // History
  transactions: TripRecord[];
  
  // Actions - Commute
  startCommute: () => void;
  stopCommute: () => void;
  updateLiveTracking: (distance: number, route: GeoPoint[]) => void;
  
  // Actions - Manual
  addCredits: (amount: number) => void;
  addCO2Saved: (kg: number) => void;
  incrementTrips: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  // Initial state with realistic mock data
  ecoCredits: 1247,
  co2Saved: 186.4,
  greenTrips: 42,
  streak: 7,
  
  // Live tracking
  isCommuting: false,
  commuteStartTime: null,
  liveDistance: 0,
  liveRoute: [],
  liveCredits: 0,
  liveCO2: 0,
  
  // Transaction history
  transactions: [
    {
      id: '1',
      title: 'Bus to College',
      mode: 'bus',
      credits: 15,
      co2Kg: 2.3,
      distance: 4.2,
      date: 'Today, 8:30 AM',
      duration: 22,
      route: [],
    },
    {
      id: '2',
      title: 'Metro to Internship',
      mode: 'metro',
      credits: 25,
      co2Kg: 4.1,
      distance: 8.7,
      date: 'Yesterday, 9:15 AM',
      duration: 35,
      route: [],
    },
    {
      id: '3',
      title: 'Cycle to Library',
      mode: 'cycle',
      credits: 30,
      co2Kg: 0,
      distance: 3.1,
      date: '2 days ago, 10:00 AM',
      duration: 18,
      route: [],
    },
  ],

  startCommute: () => set({
    isCommuting: true,
    commuteStartTime: Date.now(),
    liveDistance: 0,
    liveRoute: [],
    liveCredits: 0,
    liveCO2: 0,
  }),
  
  stopCommute: () => {
    const state = get();
    const elapsed = state.commuteStartTime
      ? Math.floor((Date.now() - state.commuteStartTime) / 60000)
      : 0;
    
    // Calculate credits from actual distance tracked
    const creditsEarned = Math.max(
      calculateCredits(state.liveDistance),
      Math.max(5, Math.floor(elapsed / 2))
    );
    const co2Earned = calculateCO2Saved(state.liveDistance) || +(elapsed * 0.08).toFixed(2);
    
    const newTrip: TripRecord = {
      id: Date.now().toString(),
      title: 'Green Commute',
      mode: 'bus',
      credits: creditsEarned,
      co2Kg: +co2Earned.toFixed(2),
      distance: +state.liveDistance.toFixed(2),
      date: 'Just now',
      duration: elapsed,
      route: state.liveRoute,
    };

    set({
      isCommuting: false,
      ecoCredits: state.ecoCredits + creditsEarned,
      co2Saved: +(state.co2Saved + co2Earned).toFixed(1),
      greenTrips: state.greenTrips + 1,
      commuteStartTime: null,
      liveDistance: 0,
      liveRoute: [],
      liveCredits: 0,
      liveCO2: 0,
      transactions: [newTrip, ...state.transactions],
    });
  },
  
  updateLiveTracking: (distance: number, route: GeoPoint[]) => {
    set({
      liveDistance: distance,
      liveRoute: route,
      liveCredits: calculateCredits(distance),
      liveCO2: calculateCO2Saved(distance),
    });
  },
  
  addCredits: (amount) => set((state) => ({
    ecoCredits: state.ecoCredits + amount,
  })),
  
  addCO2Saved: (kg) => set((state) => ({
    co2Saved: +(state.co2Saved + kg).toFixed(1),
  })),
  
  incrementTrips: () => set((state) => ({
    greenTrips: state.greenTrips + 1,
  })),
}));
