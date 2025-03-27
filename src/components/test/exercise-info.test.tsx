import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import ExerciseInfo from '../exercise-info';
import { db } from '#db';

vi.mock(import('#db'), async (importOriginal) => {
  const original = await importOriginal();
  original.db.settings.toArray = vi.fn().mockImplementation(() => []);
  return original;
});

describe('ExerciseInfo', () => {
  beforeEach(async () => {
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

    await db.activities.add({
      exercise: 'Barbell Bench Press',
      reps: 2,
      weight: 185,
      chainWeight: 0,
      bandType: null,
      createdAt: new Date(2025, 0, 3),
    });

    await db.activities.add({
      exercise: 'Barbell Bench Press',
      reps: 1,
      weight: 185,
      chainWeight: 0,
      bandType: 'Mini Band',
      createdAt: new Date(2025, 0, 4),
    });

    await db.activities.add({
      exercise: 'Barbell Bench Press',
      reps: 1,
      weight: 185,
      chainWeight: 80,
      bandType: null,
      createdAt: new Date(2025, 0, 5),
    });
  });

  it('renders best and latest recorded activity', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" />);

    await findByText('Latest');
    const term = await findByText('Best');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal(['Best', '225lbs (1/1/25)', 'Latest', '200lbs (1/2/25)']);
  });

  it('filters to given reps', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" reps={2} />);

    await findByText('Latest');
    const term = await findByText('Best');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal(['Best', '185lbs (1/3/25)', 'Latest', '185lbs (1/3/25)']);
  });

  it('filters to given bandType', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" bandType="Mini Band" />);

    await findByText('Latest');
    const term = await findByText('Best');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal(['Best', '185lbs (1/4/25)', 'Latest', '185lbs (1/4/25)']);
  });

  it('filters to given chainWeight', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" chainWeight={80} />);

    await findByText('Latest');
    const term = await findByText('Best');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal(['Best', '185lbs (1/5/25)', 'Latest', '185lbs (1/5/25)']);
  });

  it('renders estimated weight when reps do not match', async () => {
    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" reps={3} />);

    await findByText('Latest (2RM)');
    const term = await findByText('Estimated');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal([
      'Best (1RM)',
      '225lbs (1/1/25)',
      'Latest (2RM)',
      '185lbs (1/3/25)',
      'Estimated',
      '209.3lbs',
    ]);
  });

  it('renders estimated weight when settings is configured to estimate from latest', async () => {
    (db.settings.toArray as Mock).mockImplementation(() => [{ estimateFrom: 'latest' }]);

    const { findByText } = render(<ExerciseInfo name="Barbell Bench Press" reps={3} />);

    await findByText('Latest (2RM)');
    const term = await findByText('Estimated');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal([
      'Best (1RM)',
      '225lbs (1/1/25)',
      'Latest (2RM)',
      '185lbs (1/3/25)',
      'Estimated',
      '177lbs',
    ]);
  });

  it('renders best and latest but not estimate with band type', async () => {
    const { findByText } = render(
      <ExerciseInfo name="Barbell Bench Press" reps={3} bandType="Mini Band" />,
    );

    await findByText('Latest (1RM)');
    const term = await findByText('Best (1RM)');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal([
      'Best (1RM)',
      '185lbs (1/4/25)',
      'Latest (1RM)',
      '185lbs (1/4/25)',
    ]);
  });

  it('renders best but not estimate with chain weight', async () => {
    const { findByText } = render(
      <ExerciseInfo name="Barbell Bench Press" reps={3} chainWeight={80} />,
    );

    await findByText('Latest (1RM)');
    const term = await findByText('Best (1RM)');
    const list = term.closest('dl')!;
    const terms = Array.from(list.querySelectorAll('dt,dd')).map((el) => el.textContent);

    expect(terms).to.deep.equal([
      'Best (1RM)',
      '185lbs (1/5/25)',
      'Latest (1RM)',
      '185lbs (1/5/25)',
    ]);
  });
});
