import { describe, it, expect, vi } from 'vitest';
import { createActivity } from '../activity';
import { db } from '#db';

vi.mock('#db', () => ({
  db: {
    activities: {
      add: vi.fn(),
    },
  },
}));

describe('createActivity', () => {
  it('should create an activity with default values', async () => {
    await createActivity({ exercise: 'Barbell Bench Press' });

    expect(db.activities.add).toHaveBeenCalledWith({
      exercise: 'Barbell Bench Press',
      reps: 1,
      bandType: null,
      chainWeight: 0,
      weight: 0,
      createdAt: expect.any(Date),
    });
  });

  it('should create an activity with provided values', async () => {
    const activity = {
      exercise: 'Barbell Bench Press',
      reps: 5,
      bandType: 'Light',
      chainWeight: 80,
      weight: 185,
      createdAt: new Date('2023-01-01'),
    };

    await createActivity(activity);

    expect(db.activities.add).toHaveBeenCalledWith(activity);
  });
});
