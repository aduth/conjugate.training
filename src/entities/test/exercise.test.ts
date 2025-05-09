import { describe, it, expect, vi, afterEach } from 'vitest';
import { addCustomExercise, getExerciseSlug } from '../exercise';
import { db } from '#db';

describe('getExerciseSlug', () => {
  it('should convert a name to kebab-case', () => {
    expect(getExerciseSlug('Test Exercise ')).toBe('test-exercise');
  });
});

describe('addCustomExercise', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should add a custom exercise and return the slug', async () => {
    const name = 'Test Exercise';
    const slug = 'test-exercise';

    const result = await addCustomExercise(name);

    expect(result).to.equal(slug);
    const exercise = await db.exercises.get(name);
    expect(exercise).toMatchObject({ slug, name });
  });

  it('should not throw an error if adding duplicate', async () => {
    const name = 'Test Exercise';
    await addCustomExercise(name);

    const slug = 'test-exercise';
    const result = await addCustomExercise(name);

    expect(result).to.equal(slug);
  });
});
