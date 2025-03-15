import { db } from '#db';
import { toKebabCase } from 'remeda';

export const getExerciseSlug = (name: string): string => toKebabCase(name);

export async function addCustomExercise(name: string): Promise<string> {
  const slug = getExerciseSlug(name);

  try {
    await db.exercises.add({ slug, name }, name);
  } catch (error: any) {
    if (error.name !== 'ConstraintError') throw error;
  }

  return slug;
}
