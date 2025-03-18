import { describe, it, expect } from 'vitest';
import { getEstimateLabel } from '../exercise-detail-chart';
import { type Activity } from '#db';

describe('getEstimateLabel', () => {
  it('should return label for multiple reps without chain weight', () => {
    const activity: Activity = {
      id: '',
      weight: 185,
      reps: 3,
      chainWeight: 0,
      bandType: null,
      createdAt: new Date(),
      exercise: 'Squat',
    };

    const label = getEstimateLabel(activity);
    expect(label).toBe('Estimated from 185lbs 3RM');
  });

  it('should return label for a single rep with chain weight', () => {
    const activity: Activity = {
      id: '',
      weight: 225,
      reps: 1,
      chainWeight: 50,
      bandType: null,
      createdAt: new Date(),
      exercise: 'Deadlift',
    };

    const label = getEstimateLabel(activity);
    expect(label).toBe('Estimated from 225lbs + 50lbs chain');
  });

  it('should return label for multiple reps with chain weight', () => {
    const activity: Activity = {
      id: '',
      weight: 185,
      reps: 5,
      chainWeight: 20,
      bandType: null,
      createdAt: new Date(),
      exercise: 'Overhead Press',
    };

    const label = getEstimateLabel(activity);
    expect(label).toBe('Estimated from 185lbs 5RM + 20lbs chain');
  });
});
