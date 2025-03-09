import { type Activity } from '#db';

const NCSA_LOAD_COEFFICIENTS: number[] = [1.0, 0.95, 0.93, 0.9, 0.87, 0.85, 0.83, 0.8, 0.77, 0.75];

function getBrzyckiEstimate(weight: number, reps: number): number {
  return weight * (36.0 / (37 - reps));
}

function getNCSALoadEstimate(weight: number, reps: number): number | null {
  if (reps <= 0 || reps > NCSA_LOAD_COEFFICIENTS.length) {
    return null;
  }

  return weight * NCSA_LOAD_COEFFICIENTS[reps - 1];
}

export function getEstimatedWeight(reps: number, best: Activity): number | null {
  if (best.bandType || best.chainWeight) return null;
  const oneRepMax = getBrzyckiEstimate(best.weight, best.reps);
  const estimatedWeight = getNCSALoadEstimate(oneRepMax, reps);
  return estimatedWeight === null ? null : Math.round(estimatedWeight * 10) / 10;
}
