import { useState, useEffect, useRef, useCallback } from 'react';

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: number;
  speed: number | null;
}

export interface UseGeolocationResult {
  currentPosition: GeoPoint | null;
  route: GeoPoint[];
  totalDistance: number; // in km
  isTracking: boolean;
  permissionState: 'granted' | 'denied' | 'prompt' | 'unknown';
  error: string | null;
  isSimulated: boolean;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  clearRoute: () => void;
}

// Simulated route points around a central location (Pune, India - college area)
const SIMULATED_CENTER = { lat: 18.5204, lng: 73.8567 };
const SIMULATED_ROUTE: GeoPoint[] = generateSimulatedRoute();

function generateSimulatedRoute(): GeoPoint[] {
  const points: GeoPoint[] = [];
  const numPoints = 60;
  let lat = SIMULATED_CENTER.lat;
  let lng = SIMULATED_CENTER.lng;
  
  for (let i = 0; i < numPoints; i++) {
    // Create a realistic walking/cycling route with some randomness
    const angle = (i / numPoints) * Math.PI * 2 + Math.sin(i * 0.3) * 0.5;
    const radius = 0.002 + Math.sin(i * 0.15) * 0.001;
    
    lat = SIMULATED_CENTER.lat + Math.cos(angle) * radius * (1 + i * 0.01);
    lng = SIMULATED_CENTER.lng + Math.sin(angle) * radius * 1.3 * (1 + i * 0.008);
    
    points.push({
      lat,
      lng,
      timestamp: Date.now() + i * 5000,
      speed: 1.5 + Math.sin(i * 0.2) * 0.8, // ~5 km/h walking speed
    });
  }
  
  return points;
}

export function useGeolocation(): UseGeolocationResult {
  const [currentPosition, setCurrentPosition] = useState<GeoPoint | null>(null);
  const [route, setRoute] = useState<GeoPoint[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [permissionState, setPermissionState] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [error, setError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  
  const watchIdRef = useRef<number | null>(null);
  const simulationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simulationIndexRef = useRef(0);
  const lastPointRef = useRef<GeoPoint | null>(null);

  const haversineDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const handlePositionUpdate = useCallback((position: GeolocationPosition) => {
    const newPoint: GeoPoint = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      timestamp: position.timestamp,
      speed: position.coords.speed,
    };

    setCurrentPosition(newPoint);
    
    setRoute(prev => {
      const updated = [...prev, newPoint];
      
      // Calculate distance from last point
      if (lastPointRef.current) {
        const dist = haversineDistance(
          lastPointRef.current.lat,
          lastPointRef.current.lng,
          newPoint.lat,
          newPoint.lng
        );
        
        // Only add if movement is reasonable (filter GPS noise)
        if (dist > 0.005 && dist < 0.5) {
          setTotalDistance(d => +(d + dist).toFixed(3));
        }
      }
      
      lastPointRef.current = newPoint;
      return updated;
    });
  }, [haversineDistance]);

  const handleError = useCallback((err: GeolocationPositionError) => {
    if (err.code === err.PERMISSION_DENIED) {
      setPermissionState('denied');
      setError('Location permission denied. Please enable location access in your browser settings.');
    } else if (err.code === err.POSITION_UNAVAILABLE) {
      setError('Location unavailable. Using simulated route for demo.');
    } else if (err.code === err.TIMEOUT) {
      setError('Location request timed out. Using simulated route for demo.');
    }
  }, []);

  const startTracking = useCallback(async () => {
    setError(null);
    
    // Check if geolocation is available
    if (!navigator.geolocation) {
      setIsSimulated(true);
      startSimulation();
      return;
    }

    // Check permissions
    if (navigator.permissions) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionState(result.state as 'granted' | 'denied' | 'prompt');
        
        if (result.state === 'denied') {
          // Fall back to simulation
          setIsSimulated(true);
          startSimulation();
          return;
        }
      } catch {
        // Permissions API not fully supported, continue
      }
    }

    // Start real GPS tracking
    try {
      const id = navigator.geolocation.watchPosition(
        handlePositionUpdate,
        (err) => {
          // If real GPS fails, fall back to simulation
          setIsSimulated(true);
          startSimulation();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        }
      );
      
      watchIdRef.current = id;
      setIsTracking(true);
      setPermissionState('granted');
    } catch {
      setIsSimulated(true);
      startSimulation();
    }
  }, [handlePositionUpdate]);

  const startSimulation = useCallback(() => {
    simulationIndexRef.current = 0;
    setIsTracking(true);
    setIsSimulated(true);
    
    // Add first point immediately
    const firstPoint = SIMULATED_ROUTE[0];
    setCurrentPosition(firstPoint);
    setRoute([firstPoint]);
    lastPointRef.current = firstPoint;
    
    // Simulate movement every 2 seconds
    simulationIntervalRef.current = setInterval(() => {
      simulationIndexRef.current += 1;
      
      if (simulationIndexRef.current >= SIMULATED_ROUTE.length) {
        // Loop the route
        simulationIndexRef.current = 0;
      }
      
      const point = {
        ...SIMULATED_ROUTE[simulationIndexRef.current],
        timestamp: Date.now(),
      };
      
      setCurrentPosition(point);
      
      setRoute(prev => {
        const updated = [...prev, point];
        
        if (lastPointRef.current) {
          const dist = haversineDistance(
            lastPointRef.current.lat,
            lastPointRef.current.lng,
            point.lat,
            point.lng
          );
          
          if (dist > 0.001 && dist < 1) {
            setTotalDistance(d => +(d + dist).toFixed(3));
          }
        }
        
        lastPointRef.current = point;
        return updated;
      });
    }, 2000);
  }, [haversineDistance]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    
    if (simulationIntervalRef.current !== null) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }
    
    setIsTracking(false);
  }, []);

  const clearRoute = useCallback(() => {
    setRoute([]);
    setTotalDistance(0);
    setCurrentPosition(null);
    lastPointRef.current = null;
    simulationIndexRef.current = 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (simulationIntervalRef.current !== null) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  return {
    currentPosition,
    route,
    totalDistance,
    isTracking,
    permissionState,
    error,
    isSimulated,
    startTracking,
    stopTracking,
    clearRoute,
  };
}
