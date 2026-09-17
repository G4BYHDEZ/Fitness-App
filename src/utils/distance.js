export function calculateDistance(steps) {
  // Longitud de paso aproximada: 0.75 metros
  const stepLength = 0.75;

  const meters = steps * stepLength;

  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }

  return `${meters.toFixed(0)} m`;
}