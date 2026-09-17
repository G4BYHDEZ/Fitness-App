export function calculateCalories(steps) {
  const caloriesPerStep = 0.04;

  return Math.round(steps * caloriesPerStep);
}