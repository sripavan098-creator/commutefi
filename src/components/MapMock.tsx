import { motion } from 'framer-motion';
import { Navigation, MapPin } from 'lucide-react';

export function MapMock() {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-charcoal border border-border">
      {/* Dark map background with grid pattern */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        {/* Grid lines to simulate map */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Simulated roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {/* Main roads */}
          <path d="M 0 150 Q 100 130, 200 160 T 400 140" stroke="#262626" strokeWidth="8" fill="none" />
          <path d="M 50 0 Q 80 100, 120 200 T 150 300" stroke="#262626" strokeWidth="6" fill="none" />
          <path d="M 250 0 Q 270 80, 300 150 T 320 300" stroke="#262626" strokeWidth="6" fill="none" />
          <path d="M 0 80 L 400 100" stroke="#1E1E1E" strokeWidth="4" fill="none" />
          <path d="M 0 220 L 400 200" stroke="#1E1E1E" strokeWidth="4" fill="none" />
          
          {/* Route path - animated */}
          <motion.path
            d="M 60 250 Q 100 200, 150 180 T 250 120 Q 300 90, 340 60"
            stroke="#CCFF00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          />
          
          {/* Route glow */}
          <motion.path
            d="M 60 250 Q 100 200, 150 180 T 250 120 Q 300 90, 340 60"
            stroke="#CCFF00"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity={0.2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
          />
        </svg>
        
        {/* Simulated buildings/blocks */}
        <div className="absolute top-[15%] left-[10%] w-12 h-8 bg-[#1A1A1A] rounded-sm border border-[#222]" />
        <div className="absolute top-[25%] left-[55%] w-16 h-10 bg-[#1A1A1A] rounded-sm border border-[#222]" />
        <div className="absolute top-[60%] left-[20%] w-10 h-14 bg-[#1A1A1A] rounded-sm border border-[#222]" />
        <div className="absolute top-[40%] left-[70%] w-14 h-8 bg-[#1A1A1A] rounded-sm border border-[#222]" />
        <div className="absolute top-[70%] left-[60%] w-8 h-12 bg-[#1A1A1A] rounded-sm border border-[#222]" />
        
        {/* Start point */}
        <motion.div
          className="absolute bottom-[16%] left-[12%]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-4 h-4 rounded-full bg-volt glow-volt-subtle" />
        </motion.div>
        
        {/* End point */}
        <div className="absolute top-[15%] right-[12%]">
          <MapPin size={16} className="text-volt" fill="#CCFF00" />
        </div>
        
        {/* Current location pulse */}
        <motion.div
          className="absolute top-[45%] left-[45%]"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500 opacity-30 scale-150" />
        </motion.div>
      </div>
      
      {/* Overlay: Live Route Tracking badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-charcoal/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
        <motion.div
          className="w-2 h-2 rounded-full bg-volt"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs font-medium text-white">Live Route Tracking</span>
      </div>
      
      {/* Speed indicator */}
      <div className="absolute bottom-4 right-4 bg-charcoal/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2">
        <div className="flex items-center gap-1.5">
          <Navigation size={12} className="text-volt" />
          <span className="text-sm font-bold text-white">24</span>
          <span className="text-[10px] text-muted">km/h</span>
        </div>
      </div>
      
      {/* ETA */}
      <div className="absolute bottom-4 left-4 bg-charcoal/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted">ETA</span>
          <span className="text-sm font-bold text-white">12 min</span>
        </div>
      </div>
    </div>
  );
}
