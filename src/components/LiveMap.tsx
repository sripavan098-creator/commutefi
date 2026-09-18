import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Wifi, WifiOff } from 'lucide-react';
import type { GeoPoint } from '../hooks/useGeolocation';

interface LiveMapProps {
  route: GeoPoint[];
  currentPosition: GeoPoint | null;
  isTracking: boolean;
  isSimulated: boolean;
  totalDistance: number;
  elapsedSeconds: number;
}

export function LiveMap({ route, currentPosition, isTracking, isSimulated, totalDistance, elapsedSeconds }: LiveMapProps) {
  const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 400, height: 300 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate viewBox to fit all route points with padding
  useEffect(() => {
    if (route.length < 2) return;
    
    const lats = route.map(p => p.lat);
    const lngs = route.map(p => p.lng);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const padding = 0.0005;
    const width = (maxLng - minLng) + padding * 2;
    const height = (maxLat - minLat) + padding * 2;
    
    setViewBox({
      minX: minLng - padding,
      minY: maxLat + padding, // SVG Y is inverted
      width: Math.max(width, 0.001),
      height: Math.max(height, 0.001),
    });
  }, [route]);

  // Convert lat/lng to SVG coordinates
  const toSvgCoord = (point: GeoPoint) => {
    if (route.length < 2) return { x: 200, y: 150 };
    
    const lats = route.map(p => p.lat);
    const lngs = route.map(p => p.lng);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const rangeLng = maxLng - minLng || 0.001;
    const rangeLat = maxLat - minLat || 0.001;
    
    const x = ((point.lng - minLng) / rangeLng) * 380 + 10;
    const y = ((maxLat - point.lat) / rangeLat) * 280 + 10;
    
    return { x, y };
  };

  // Build SVG path string from route points
  const buildPathString = () => {
    if (route.length < 2) return '';
    
    const points = route.map(toSvgCoord);
    let d = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      // Use smooth curves for a nicer look
      if (i < points.length - 1) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        d += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
      } else {
        d += ` L ${points[i].x} ${points[i].y}`;
      }
    }
    
    return d;
  };

  const pathD = buildPathString();
  const currentPos = currentPosition ? toSvgCoord(currentPosition) : null;
  const startPos = route.length > 0 ? toSvgCoord(route[0]) : null;

  // Format stats
  const formatDistance = (km: number) => {
    if (km < 1) return `${(km * 1000).toFixed(0)} m`;
    return `${km.toFixed(2)} km`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const avgSpeed = elapsedSeconds > 0 ? (totalDistance / (elapsedSeconds / 3600)) : 0;

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0D0D0D] border border-border">
      {/* Background grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
        </svg>
        
        {/* Simulated road network when no route */}
        {route.length < 2 && (
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M 0 150 Q 100 130, 200 160 T 400 140" stroke="#262626" strokeWidth="6" fill="none" />
            <path d="M 50 0 Q 80 100, 120 200 T 150 300" stroke="#262626" strokeWidth="4" fill="none" />
            <path d="M 250 0 Q 270 80, 300 150 T 320 300" stroke="#262626" strokeWidth="4" fill="none" />
            <path d="M 0 80 L 400 100" stroke="#1E1E1E" strokeWidth="3" fill="none" />
            <path d="M 0 220 L 400 200" stroke="#1E1E1E" strokeWidth="3" fill="none" />
            <rect x="30" y="40" width="45" height="30" fill="#1A1A1A" rx="2" />
            <rect x="220" y="60" width="55" height="35" fill="#1A1A1A" rx="2" />
            <rect x="80" y="180" width="35" height="45" fill="#1A1A1A" rx="2" />
            <rect x="280" y="200" width="50" height="30" fill="#1A1A1A" rx="2" />
            <rect x="150" y="100" width="40" height="25" fill="#1A1A1A" rx="2" />
          </svg>
        )}
      </div>

      {/* Live route SVG */}
      {route.length >= 2 && (
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 400 300`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Glow filter */}
          <defs>
            <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#99CC00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#CCFF00" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Route glow (wider, more transparent) */}
          <motion.path
            d={pathD}
            stroke="#CCFF00"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.15}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Main route line */}
          <motion.path
            d={pathD}
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#routeGlow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Start point */}
          {startPos && (
            <g>
              <circle cx={startPos.x} cy={startPos.y} r="6" fill="#CCFF00" opacity="0.3" />
              <circle cx={startPos.x} cy={startPos.y} r="4" fill="#CCFF00" />
              <circle cx={startPos.x} cy={startPos.y} r="2" fill="#0A0A0A" />
            </g>
          )}
          
          {/* Current position (pulsing) */}
          {currentPos && (
            <g>
              <motion.circle
                cx={currentPos.x}
                cy={currentPos.y}
                r="12"
                fill="#CCFF00"
                opacity={0.15}
                animate={{ r: [12, 18, 12], opacity: [0.15, 0.05, 0.15] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx={currentPos.x}
                cy={currentPos.y}
                r="6"
                fill="#CCFF00"
                opacity={0.3}
                animate={{ r: [6, 9, 6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle cx={currentPos.x} cy={currentPos.y} r="4" fill="#CCFF00" />
              <circle cx={currentPos.x} cy={currentPos.y} r="2" fill="#0A0A0A" />
            </g>
          )}
        </svg>
      )}

      {/* Top overlay: Status badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-charcoal/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
          {isTracking ? (
            <>
              <motion.div
                className="w-2 h-2 rounded-full bg-volt"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[11px] font-medium text-white">Live Tracking</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-muted-dark" />
              <span className="text-[11px] font-medium text-muted">Ready</span>
            </>
          )}
        </div>
        
        {isSimulated && isTracking && (
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-1">
            <Wifi size={10} className="text-amber-400" />
            <span className="text-[9px] font-medium text-amber-400">Demo Mode</span>
          </div>
        )}
      </div>

      {/* Bottom stats overlay */}
      {isTracking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
        >
          <div className="bg-charcoal/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2">
            <div className="flex items-center gap-1.5">
              <Navigation size={11} className="text-volt" />
              <span className="text-xs font-bold text-white">{avgSpeed.toFixed(1)}</span>
              <span className="text-[9px] text-muted">km/h</span>
            </div>
          </div>
          
          <div className="bg-charcoal/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2">
            <div className="text-center">
              <span className="text-xs font-bold text-volt">{formatDistance(totalDistance)}</span>
            </div>
          </div>
          
          <div className="bg-charcoal/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-muted">ETA</span>
              <span className="text-xs font-bold text-white">{formatTime(elapsedSeconds)}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Idle state message */}
      {!isTracking && route.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-volt/10 flex items-center justify-center mb-3">
            <MapPin size={20} className="text-volt" />
          </div>
          <p className="text-sm font-medium text-muted">Tap "Start Commute" to begin tracking</p>
          <p className="text-[10px] text-muted-dark mt-1">GPS will activate automatically</p>
        </div>
      )}
    </div>
  );
}
