import { describe, it, expect } from 'vitest';
import { type Activity } from '#db';
import { getEstimatedWeight } from '../estimator';

describe('getEstimatedWeight', () => {
  it('should return null if bandType or chainWeight is present', () => {
    const activity: Activity = {
      id: 'id',
      exercise: 'Barbell Bench Press',
      weight: 100,
      reps: 5,
      bandType: 'someBand',
      chainWeight: 0,
      createdAt: new Date(),
    };

    expect(getEstimatedWeight(5, activity)).toBeNull();
  });

  it('should return null if reps is out of range for NCSA coefficients', () => {
    const activity: Activity = {
      id: 'id',
      exercise: 'Barbell Bench Press',
      weight: 100,
      reps: 1,
      bandType: null,
      chainWeight: 0,
      createdAt: new Date(),
    };

    expect(getEstimatedWeight(11, activity)).toBeNull();
  });

  it('should return the correct estimated weight for valid inputs', () => {
    const activity: Activity = {
      id: 'id',
      exercise: 'Barbell Bench Press',
      weight: 100,
      reps: 4,
      bandType: null,
      chainWeight: 0,
      createdAt: new Date(),
    };

    expect(getEstimatedWeight(5, activity)).toBeCloseTo(94.9, 1);
  });

  it('should return null if reps is zero or negative', () => {
    const activity: Activity = {
      id: 'id',
      exercise: 'Barbell Bench Press',
      weight: 100,
      reps: 5,
      bandType: null,
      chainWeight: 0,
      createdAt: new Date(),
    };

    expect(getEstimatedWeight(0, activity)).toBeNull();
    expect(getEstimatedWeight(-1, activity)).toBeNull();
  });

  it('should return estimate with chainWeight', () => {
    const activity: Activity = {
      id: 'id',
      exercise: 'Barbell Bench Press',
      weight: 100,
      reps: 1,
      bandType: null,
      chainWeight: 50,
      createdAt: new Date(),
    };

    expect(getEstimatedWeight(1, activity)).toBe(125);
  });
});
