import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, MapPin, Clock, Zap, TrendingUp, Bus, Train, Bike, Footprints } from 'lucide-react';
import { getUserTrips, getProfile, TripRecord, UserProfile } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

function getModeIcon(mode: string) {
  switch (mode) {
    case 'bus': return Bus;
    case 'train': case 'metro': return Train;
    case 'cycling': case 'cycle': return Bike;
    case 'walking': case 'walk': return Footprints;
    default: return Bus;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export function HistoryScreen() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<TripRecord[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      setTrips(getUserTrips(user.id));
      setProfile(getProfile(user.id));
    }
  }, [user]);

  const totalTrips = profile?.green_trips_count || 0;
  const totalDistance = profile?.total_distance_km || 0;
  const totalCredits = profile?.eco_credits || 0;

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <h1 className="text-2xl font-bold text-white">Trip History</h1>
        <p className="text-sm text-muted mt-1">Your green commute ledger</p>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-5"
      >
        <div className="bg-charcoal border border-border rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-white">{totalTrips}</p>
          <p className="text-[10px] text-muted">Total Trips</p>
        </div>
        <div className="bg-charcoal border border-border rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-white">{totalDistance.toFixed(1)}</p>
          <p className="text-[10px] text-muted">km Tracked</p>
        </div>
        <div className="bg-charcoal border border-border rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-volt">{totalCredits.toLocaleString()}</p>
          <p className="text-[10px] text-muted">Credits Earned</p>
        </div>
      </motion.div>

      {/* Trip List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-sm font-semibold text-white mb-3">Recent Commutes</h2>
        
        {trips.length === 0 ? (
          <div className="bg-charcoal border border-border rounded-xl p-8 text-center">
            <Leaf size={32} className="text-muted-dark mx-auto mb-3" />
            <p className="text-sm text-muted">No trips recorded yet</p>
            <p className="text-xs text-muted-dark mt-1">Start your first commute to see it here</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {trips.map((trip, i) => {
              const ModeIcon = getModeIcon(trip.transport_mode);
              return (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="bg-charcoal border border-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-volt/10 flex items-center justify-center flex-shrink-0">
                      <ModeIcon size={18} className="text-volt" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white capitalize">
                          {trip.transport_mode} commute
                        </p>
                        <p className="text-xs font-bold text-volt">+{trip.eco_credits_earned}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin size={10} className="text-muted-dark" />
                          <span className="text-[10px] text-muted">{trip.distance_km.toFixed(1)} km</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={10} className="text-muted-dark" />
                          <span className="text-[10px] text-muted">{trip.duration_minutes} min</span>
                        </div>
                        <span className="text-[10px] text-muted-dark">{formatDate(trip.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
