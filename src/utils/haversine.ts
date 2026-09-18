/**
 * Haversine formula to calculate distance between two GPS coordinates.
 * Returns distance in kilometers.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Credit calculation rules:
 * - 1 km = 10 Eco-Credits
 * - 1 km = 0.21 kg CO2 saved (compared to car)
 */
export const CREDITS_PER_KM = 10;
export const CO2_SAVED_PER_KM = 0.21;

export function calculateCredits(distanceKm: number): number {
  return Math.round(distanceKm * CREDITS_PER_KM);
}

export function calculateCO2Saved(distanceKm: number): number {
  return +(distanceKm * CO2_SAVED_PER_KM).toFixed(2);
}

/**
 * Detect transport mode based on speed (km/h)
 */
export function detectMode(speedMs: number): 'walk' | 'cycle' | 'transit' | 'car' {
  const speedKmh = speedMs * 3.6;
  if (speedKmh < 6) return 'walk';
  if (speedKmh < 20) return 'cycle';
  if (speedKmh < 60) return 'transit';
  return 'car';
}
