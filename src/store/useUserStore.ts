import { create } from 'zustand';

interface Transaction {
  id: string;
  title: string;
  mode: string;
  credits: number;
  co2Kg: number;
  date: string;
  distance: string;
}

interface UserState {
  ecoCredits: number;
  co2Saved: number;
  isCommuting: boolean;
  greenTrips: number;
  streak: number;
  transactions: Transaction[];
  commuteStartTime: number | null;
  currentDistance: number;
  
  // Actions
  startCommute: () => void;
  stopCommute: () => void;
  addCredits: (amount: number) => void;
  addCO2Saved: (kg: number) => void;
  incrementTrips: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  ecoCredits: 1247,
  co2Saved: 186.4,
  isCommuting: false,
  greenTrips: 42,
  streak: 7,
  commuteStartTime: null,
  currentDistance: 0,
  
  transactions: [
    {
      id: '1',
      title: 'Bus to College',
      mode: 'bus',
      credits: 15,
      co2Kg: 2.3,
      date: 'Today, 8:30 AM',
      distance: '4.2 km',
    },
    {
      id: '2',
      title: 'Metro to Internship',
      mode: 'metro',
      credits: 25,
      co2Kg: 4.1,
      date: 'Yesterday, 9:15 AM',
      distance: '8.7 km',
    },
    {
      id: '3',
      title: 'Cycle to Library',
      mode: 'cycle',
      credits: 30,
      co2Kg: 0,
      date: '2 days ago, 10:00 AM',
      distance: '3.1 km',
    },
  ],

  startCommute: () => set({ 
    isCommuting: true, 
    commuteStartTime: Date.now(),
    currentDistance: 0,
  }),
  
  stopCommute: () => {
    const state = get();
    const elapsed = state.commuteStartTime 
      ? Math.floor((Date.now() - state.commuteStartTime) / 60000) 
      : 0;
    const creditsEarned = Math.max(5, Math.floor(elapsed / 2));
    
    set({
      isCommuting: false,
      ecoCredits: state.ecoCredits + creditsEarned,
      co2Saved: +(state.co2Saved + (elapsed * 0.08)).toFixed(1),
      greenTrips: state.greenTrips + 1,
      commuteStartTime: null,
      currentDistance: 0,
      transactions: [
        {
          id: Date.now().toString(),
          title: 'Green Commute',
          mode: 'bus',
          credits: creditsEarned,
          co2Kg: +(elapsed * 0.08).toFixed(1),
          date: 'Just now',
          distance: `${(elapsed * 0.4).toFixed(1)} km`,
        },
        ...state.transactions,
      ],
    });
  },
  
  addCredits: (amount) => set((state) => ({ 
    ecoCredits: state.ecoCredits + amount 
  })),
  
  addCO2Saved: (kg) => set((state) => ({ 
    co2Saved: +(state.co2Saved + kg).toFixed(1) 
  })),
  
  incrementTrips: () => set((state) => ({ 
    greenTrips: state.greenTrips + 1 
  })),
}));
