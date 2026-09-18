import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Leaf, MapPin, TrendingUp, Crown } from 'lucide-react';
import { getLeaderboard, UserProfile } from '../lib/storage';
import { useAuth } from '../context/AuthContext';

function getMedalEmoji(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
}

function getRankColor(rank: number): string {
  if (rank === 1) return 'text-volt';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-muted-dark';
}

export function LeaderboardScreen() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const leaders = getLeaderboard(10);
    setLeaderboard(leaders);
    
    if (user) {
      const rank = leaders.findIndex(l => l.id === user.id) + 1;
      setUserRank(rank > 0 ? rank : null);
    }
  }, [user]);

  return (
    <div className="flex flex-col h-full px-5 pt-4 pb-4 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-volt" />
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        </div>
        <p className="text-sm text-muted mt-1">Top eco-warriors this month</p>
      </motion.div>

      {/* Your Position */}
      {userRank && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-volt/10 to-volt/5 border border-volt/20 rounded-xl p-4 mb-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold">Your Position</p>
              <p className="text-2xl font-black text-volt mt-1">#{userRank}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-dark uppercase tracking-wider font-semibold">Eco-Credits</p>
              <p className="text-2xl font-black text-white mt-1">{user?.eco_credits.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 mb-5"
        >
          {/* 2nd Place */}
          <div className="bg-charcoal border border-border rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">🥈</div>
            <p className="text-xs font-semibold text-white truncate">{leaderboard[1].full_name.split(' ')[0]}</p>
            <p className="text-[10px] text-muted mt-0.5">{leaderboard[1].eco_credits.toLocaleString()}</p>
          </div>
          
          {/* 1st Place */}
          <div className="bg-gradient-to-b from-volt/10 to-charcoal border border-volt/30 rounded-xl p-3 text-center glow-volt-subtle">
            <div className="text-3xl mb-1">🥇</div>
            <p className="text-xs font-bold text-volt truncate">{leaderboard[0].full_name.split(' ')[0]}</p>
            <p className="text-[10px] text-white mt-0.5">{leaderboard[0].eco_credits.toLocaleString()}</p>
          </div>
          
          {/* 3rd Place */}
          <div className="bg-charcoal border border-border rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">🥉</div>
            <p className="text-xs font-semibold text-white truncate">{leaderboard[2].full_name.split(' ')[0]}</p>
            <p className="text-[10px] text-muted mt-0.5">{leaderboard[2].eco_credits.toLocaleString()}</p>
          </div>
        </motion.div>
      )}

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-sm font-semibold text-white mb-3">Top 10 Eco-Warriors</h2>
        
        <div className="space-y-2">
          {leaderboard.map((leader, i) => {
            const rank = i + 1;
            const isCurrentUser = user?.id === leader.id;
            const medal = getMedalEmoji(rank);
            const rankColor = getRankColor(rank);
            
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className={`rounded-xl p-3 flex items-center gap-3 ${
                  isCurrentUser
                    ? 'bg-volt/10 border border-volt/20'
                    : 'bg-charcoal border border-border'
                }`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  rank <= 3 ? 'bg-obsidian' : 'bg-obsidian'
                }`}>
                  {medal ? (
                    <span className="text-lg">{medal}</span>
                  ) : (
                    <span className={`text-sm font-bold ${rankColor}`}>#{rank}</span>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-volt' : 'text-white'}`}>
                      {leader.full_name}
                    </p>
                    {isCurrentUser && (
                      <span className="text-[9px] font-semibold text-volt bg-volt/10 px-1.5 py-0.5 rounded">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={9} className="text-muted-dark" />
                    <span className="text-[10px] text-muted">{leader.city}</span>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${isCurrentUser ? 'text-volt' : 'text-white'}`}>
                    {leader.eco_credits.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-muted">credits</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center"
      >
        <p className="text-[10px] text-muted-dark">
          Rankings update daily • Earn more credits to climb the leaderboard
        </p>
      </motion.div>
    </div>
  );
}
