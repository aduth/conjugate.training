import { beforeAll, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ExerciseInfo from '../exercise-info';
import { db } from '#db';

describe('ExerciseInfo', () => {
  beforeAll(async () => {
    await db.activities.add({
      exercise: 'Barbell Bench Press',
      reps: 1,
      weight: 225,
      chainWeight: 0,
      bandType: null,
      createdAt: new Date(2025, 0, 1),
    });

    await db.activities.add({
      exercise: 'Barbell Bench Press',
      reps: 1,
      weight: 200,
      chainWeight: 0,
      bandType: null,
      createdAt: new Date(2025, 0, 2),
    });
  });

  it('renders best and latest recorded activity', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" />);

    const term = await findByText('Best');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal(['Best', '225lbs (1/1/25)', 'Latest', '200lbs (1/2/25)']);
  });
});
