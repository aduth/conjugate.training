import { type Activity } from '#db';

const NCSA_LOAD_COEFFICIENTS: number[] = [1.0, 0.95, 0.93, 0.9, 0.87, 0.85, 0.83, 0.8, 0.77, 0.75];

function getBrzyckiEstimate(weight: number, reps: number): number {
  return weight * (36.0 / (37 - reps));
}

function getEpleyEstimate(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

function getNCSALoadEstimate(weight: number, reps: number): number | null {
  if (reps <= 0 || reps > NCSA_LOAD_COEFFICIENTS.length) {
    return null;
  }

  return weight * NCSA_LOAD_COEFFICIENTS[reps - 1];
}

export function getOneRepMax(best: Activity, formula: 'brzycki' | 'epley' = 'brzycki'): number {
  let { weight, reps, chainWeight } = best;

  if (chainWeight) weight += chainWeight / 2;
  if (reps === 1) return weight;

  switch (formula) {
    case 'brzycki':
      return getBrzyckiEstimate(weight, reps);

    case 'epley':
      return getEpleyEstimate(weight, reps);
  }
}

export function getEstimatedWeight(
  reps: number,
  best: Activity,
  formula: 'brzycki' | 'epley' = 'brzycki',
): number | null {
  if (best.bandType) return null;
  const oneRepMax = getOneRepMax(best, formula);
  const estimatedWeight = getNCSALoadEstimate(oneRepMax, reps);
  return estimatedWeight === null ? null : Math.round(estimatedWeight * 10) / 10;
}
